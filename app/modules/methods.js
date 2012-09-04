define([
  // Application.
  "app",

  // Libraries.
  "bootstrap"  
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Methods = app.module();  

  var SERVICE_TYPES = ["GET", "POST"],
      GET = 0,
      POST = 1;

  // Defines an API call method.
  Methods.Method = Backbone.Model.extend({
    defaults: {
      "type": SERVICE_TYPES[GET]
    }
  });

  // A set of logically related API call methods.
  Methods.MethodGroup = Backbone.Model.extend({});  

  // Holds methods.
  Methods.MethodCollection = Backbone.Collection.extend({
    model: Methods.Model
  });

  // Holds method groups.
  Methods.MethodGroupCollection = Backbone.Collection.extend({
    model: Methods.MethodGroup
  });

  // Holds method parameter.
  Methods.Parameter = Backbone.Model.extend({});

  // Holds method response parameters.
  Methods.ResponseParameter = Backbone.Model.extend({});  

  // Holds method parameters.
  Methods.MethodParameterCollection = Backbone.Collection.extend({
    model: Methods.Parameter
  });   

  // Holds method response parameters.
  Methods.MethodResponseParameterCollection = Backbone.Collection.extend({
    model: Methods.ResponseParameter
  });     

  Methods.Views.ParameterView = Backbone.View.extend({
    template: "parameter",

    tagName: "tr",

    serialize: function() {
      return {
        parameter: this.model
      };
    }       
  });

  Methods.Views.ResponseParameterView = Backbone.View.extend({
    template: "response-parameter",

    tagName: "tr",

    serialize: function() {
      return {
        parameter: this.model
      };
    }       
  });  

  // View for holding method response parameters
  Methods.Views.ResponseParamsView = Backbone.View.extend({
    template: "response-params",

    beforeRender: function() {
      this.collection.each(function(responseParameter) {
        var view = new Methods.Views.ResponseParameterView({
          model: responseParameter
        });
        this.insertView(".method-parameters", view);
      }, this);
    }
  });

  // View for holding method IO doc style try
  Methods.Views.IOView = Backbone.View.extend({
    template: "io-form",

    serialize: function() {
      return { 
        model: this.model
      };
    },

    events: {
      "change #response-format": "_updateResponseFormat",
      "click #try-api-button": "_handleTryApiClick",
      "click #reset-api-button": "_handleResetApiClick",
      "keyup .right-col": "_handleParamInputChange"
    },

    _handleResetApiClick: function(e) {
      // XXX: implement me
    },

    _insertAmpsInArgs: function() {
      var allSeperators = $(".endpoint-url").find(".param-sep");
      var opened = false;
      for (var i=0; i<allSeperators.length; i++) {
        var previous = $(allSeperators[i]).prev().text();
        var next = $(allSeperators[i]).next().text();
        if (previous !== "" && next !== "") {
          $(allSeperators[i]).text("&");
          continue;
        }
        if (opened && next !== "") {
          $(allSeperators[i]).text("&");
          continue;          
        }
        if (previous !== "") {
          opened = true;
        }
      }       
    },

    _handleParamInputChange: function(e) {        
      var fieldName = $(e.currentTarget).parent().children(".left-col").attr("class").replace("left-col", "").trim();
      var fieldValue = $(e.currentTarget).parent().children(".right-col").children("input").val();

      if (fieldValue === "") {
        return;
      }  

      // update the model with the value set by user in the form
      var model = this.model.get("parameters").get(fieldName);
      model.set("value", fieldValue);

      // XXX: update the view (technically, this should be done via model field change listener) 
      //      here we are just reacting to form input directly, the model has no idea
      
      // if the field being changed is not a param, handle as special case:
      if (fieldName === "service_code" || fieldName === "service_request_id") {
        $(".endpoint-url ." + fieldName).text("/" + fieldValue);
        this._insertAmpsInArgs();

        return;
      }

      // special case for service_code_param - since the official API specifies it
      // in one case as a param and in another as part of the URI itself:
      if (fieldName === "service_code_param") {
        $(".param-sep-start").text('?');
        $(".endpoint-url ." + fieldName).text("service_code" + "=" + fieldValue);
        this._insertAmpsInArgs();

        return;
      }      
      
      // if it's a param, just update the span text in the html for the given field name
      $(".param-sep-start").text('?');
      $(".endpoint-url ." + fieldName).text(fieldName + "=" + fieldValue);      

      // insert & between args as required
      this._insertAmpsInArgs();
    },

    _handleTryApiClick: function(e) {      
      $("#response-body").text("loading...");

      var methodUrl = $(".endpoint-url").text()
                                        .replace("json", "json?callback=?")
                                        .replace("??", "?&");
      //console.log(methodUrl);

      var success = false;
      $.getJSON(methodUrl, function(data) {
        success = true;
        $("#response-body").text(JSON.stringify(data, undefined, 1));
      });
      // Set a 5-second timeout to check for errors
      setTimeout(function() {
        if (!success) {
          $("#response-body").text("call failed; check parameters or try again later");
        }
      }, 5000);
    },

    _updateResponseFormat: function(e) {
      responseFormat = $("#response-format").val();

      if ("xml" === responseFormat) { alert("WARNING: testing with xml responses is not supported yet"); }

      $("#response-format-value").html($("#response-format").val());
      $("#response-format-value").animate({          
        fontSize: "120%"
      }, 100, function() {
        $(this).animate({fontSize: "100%"}, 100);
      });        
    }      
  });  

  // View for method.
  Methods.Views.MethodView = Backbone.View.extend({
    template: "method",

    serialize: function() {
      return { 
        model: this.model
      };
    },    

    events: {
      "click .expand-click": "_expand"
    },

    _expand: function(e) {
      var target = $(e.currentTarget).parent();
      var expandIcon = $(e.currentTarget).find(".icon-plus, .icon-minus");
      expandIcon.toggleClass("icon-minus");

      // the div will hold an id that matches the name of the form we want to insert
      var childViewName = target.children(".expanda").attr("id");
      var expandaViews = this._expandViews;

      // if the icon is a minus, we show the view, otherwise we remove view
      var showView = expandIcon.hasClass("icon-minus");
      if (showView) {
        this.setView("#" + childViewName, expandaViews[childViewName]).render();
        return;
      }
      var view = this.getView(function(view) {
        return view === expandaViews[childViewName];
      }).remove();
    },

    beforeRender: function() {
      // load a utility hash for lookup of expandable views in _expand function, later 
      this._expandViews = {
        "response-params": new Methods.Views.ResponseParamsView({
          collection: this.model.get("responseParameters")
         }),
        "io-form": new Methods.Views.IOView({
          model: this.model
        })
      };

      var parameters = this.model.get("parameters");

      parameters.each(function(parameter) {
        var view = new Methods.Views.ParameterView({
          model: parameter
        });
        this.insertView(".method-parameters", view);
      }, this);      
    },

    afterRender: function() {
      $("#nav-docs").addClass("active");
    }      
  });

  // View for method.
  Methods.Views.MethodRowView = Backbone.View.extend({
    template: "method_row",

    tagName: "tr",

    serialize: function() {
      return { 
        model: this.model
      };
    }
  });  

  // Method group view
  Methods.Views.MethodGroupView = Backbone.View.extend({
    template: "methodgroup",

    serialize: function() {
      return { 
        model: this.model
      };
    },

    beforeRender: function() {
      var groupMethods = this.model.get("methods");
      groupMethods.each(function(method) {
        var view = new Methods.Views.MethodRowView({
          model: method
        });
        this.insertView("tbody", view);
      }, this);
    }     
  });  

  // Open311 API view.
  Methods.Views.Api = Backbone.View.extend({
    template: "api",

    beforeRender: function() {
      this.collection.each(function(methodGroup) {
        var view = new Methods.Views.MethodGroupView({
          model: methodGroup
        });
        this.insertView("#groups", view);
      }, this);
    },

    afterRender: function() {
      $("#nav-docs").addClass("active");
    }    
  });

  // Documentation home view.
  Methods.Views.Docs = Backbone.View.extend({
    template: "docs",

    afterRender: function() {
      $("#nav-docs").addClass("active");
    }        
  });      

  // Return the module for AMD compliance.
  return Methods;

});
