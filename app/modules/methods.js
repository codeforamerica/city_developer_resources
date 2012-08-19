define([
  // Application.
  "app"
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

  // Holds method parameters.
  Methods.Parameter = Backbone.Model.extend({});

  // Holds method parameters.
  Methods.MethodParameterCollection = Backbone.Collection.extend({
    model: Methods.Parameter
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

  // View for method.
  Methods.Views.MethodView = Backbone.View.extend({
    template: "method",

    serialize: function() {
      return { 
        model: this.model
      };
    },

    beforeRender: function() {
      var parameters = this.model.get("parameters");
      parameters.each(function(parameter) {
        var view = new Methods.Views.ParameterView({
          model: parameter
        });
        this.insertView(".method-parameters", view);
      }, this);      
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
