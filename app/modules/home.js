define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Home = app.module();

  // Default model.
  Home.Model = Backbone.Model.extend({});

  // Home view.
  Home.Views.Main = Backbone.View.extend({
    template: "home",

    // This will keep the View from being automatically removed by LayoutManager.
    keep: true,

    afterRender: function() {
      $("#nav-home").addClass("active");
    }
  });

  // Header bar.
  Home.Views.Header = Backbone.View.extend({
    template: "_header",

    keep: true
  });

  Home.Views.Footer = Backbone.View.extend({
    template: "_footer",

    keep: true
  });

  Home.BreadcrumbModel = Backbone.Model.extend({});

  // Breadcrumb.
  Home.Views.BreadcrumbView = Backbone.View.extend({
    template: "_breadcrumb",

    keep: true,

    serialize: function() {
      return {
        crumbs: this.model.get("crumbs")
      };
    }
  });

  Home.Views.Tos = Backbone.View.extend({
    template: "tos",

    keep: true
  });

  // Default view; used when navigation makes no sense.
  Home.Views.Default = Backbone.View.extend({
    template: "default"
  });

  // Return the module for AMD compliance.
  return Home;

});
