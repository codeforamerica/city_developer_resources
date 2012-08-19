define([
  // Application.
  "app",

  // Modules
  "modules/methods",
  "modules/home",

  // Data
  "models/groups"
],

function(app, Methods, Home) {

  // simple bootstrap of data at app startup (via groups.js)
  var data = bootstrapData(Methods);
  var methodGroupCollection = data.group, 
      methodsDict = data.dict;

  // Defining application router
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "docs": "docs",
      "docs/api": "api",
      "docs/api/:method_name": "methodName",
      "docs/api/:method_name/response": "responseObject",
      "*path": "unknown"
    },

    index: function() {
      // by default, show the Home Main view
      app.layout.setViews({
        ".content": new Home.Views.Main(),
        ".header": new Home.Views.Header(),
        ".bcrumb": new Home.Views.BreadcrumbView({
            model: new Home.BreadcrumbModel({
              crumbs: [{"urlFrom": "/",
                        "titleFrom": "Home"}]
            })
          })        
      }).render();
    },

    docs: function() {
      var view = new Methods.Views.Docs();
      app.layout.setViews({
        ".content": new Methods.Views.Docs(),
        ".header": new Home.Views.Header(),
        ".bcrumb": new Home.Views.BreadcrumbView({
            model: new Home.BreadcrumbModel({
              crumbs: [{"urlFrom": "/",
                        "titleFrom": "Home"},
                       {"urlTo": "docs",
                        "titleTo": "Documentation"}]
            })
          })
      }).render();
    },   

    api: function() {
      var view = new Methods.Views.Api({       
        collection: methodGroupCollection
      });
      app.layout.setViews({
        ".content": view,
        ".header": new Home.Views.Header(),
        ".bcrumb": new Home.Views.BreadcrumbView({
            model: new Home.BreadcrumbModel({
              crumbs: [{"urlFrom": "/",
                        "titleFrom": "Home"},
                       {"urlFrom": "/docs",
                        "titleFrom": "Documentation"},                        
                       {"urlTo": "api",
                        "titleTo": "Open311 Documentation"}]
            })
          })              
      }).render();      
    }, 

    methodName: function(name) {
      var model = methodsDict[name];
      var view;
      if (model) {
        view = new Methods.Views.MethodView({     
          model: model
        });
      } else {
        view = new Home.Views.Default();
      }
      app.layout.setViews({
        ".content": view,
        ".header": new Home.Views.Header(),
        ".bcrumb": new Home.Views.BreadcrumbView({
            model: new Home.BreadcrumbModel({
              crumbs: [{"urlFrom": "/",
                        "titleFrom": "Home"},
                       {"urlFrom": "/docs",
                        "titleFrom": "Documentation"},                        
                       {"urlFrom": "/docs/api",
                        "titleFrom": "Open311 Documentation"},
                       {"urlTo": name,
                        "titleTo": name}]
            })
          })              
      }).render(); 
    },

    responseObject: function(name) {
      view = new Home.Views.Default();
      app.layout.setViews({
        ".content": view,
        ".header": new Home.Views.Header()
        // ".bcrumb": new Home.Views.BreadcrumbView({
        //     model: new Home.BreadcrumbModel({
        //       crumbs: [{"urlFrom": "/",
        //                 "titleFrom": "Home"},
        //                {"urlFrom": "/docs",
        //                 "titleFrom": "Documentation"},                        
        //                {"urlFrom": "/docs/api",
        //                 "titleFrom": "Open311 Documentation"},
        //                {"urlTo": name,
        //                 "titleTo": name}]
        //     })
        //   })              
      }).render(); 
    },

    unknown: function() {
      app.layout.setViews({
        ".content": new Home.Views.Default(),
        ".header": new Home.Views.Header()
      }).render();            
    },

    initialize: function() {
      app.useLayout("main");    
    }
  });

  return Router;

});