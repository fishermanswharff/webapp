function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

var Router = Backbone.Router.extend({
  routes: {
    '': 'sandwiches',
    'about': 'about',
    'login': 'login',
    'sandwiches': 'sandwiches',
    'catering': 'catering',
    'beverages': 'beverages',
    'cart': 'cart',
    'delivery': 'delivery',
    'checkout': 'checkout'
  },

  menu: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories',
      type: 'GET',
    }).done(function(response){
      trace(response);
      var template = Handlebars.compile($("#menuTemplate").html());
      $("#selected_menu").html(template({
        menu: response
      }));
      var $forms = $(".lineitem_submit");
      $forms.each(function(index,form){
        $(form).on("submit", function(e){
          LineItemSubmission.processForm(e,form,router);
        });
      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  },

  sandwiches: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/2',
      type: 'GET',
    }).done(function(response){
      var template = Handlebars.compile($("#menuTemplate").html());
      $("#selected_menu").html(template({
        menu: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  },

  catering: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/1',
      type: 'GET',
    }).done(function(response){
      var template = Handlebars.compile($("#menuTemplate").html());
      $("#selected_menu").html(template({
        menu: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  },

  beverages: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/3',
      type: 'GET',
    }).done(function(response){
      var template = Handlebars.compile($("#menuTemplate").html());
      $("#selected_menu").html(template({
        menu: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  },

  about: function() {
    var template = Handlebars.compile($("#aboutTemplate").html());
      $('#selected_menu').html(template({
          about: "Robert 'Bob' Bagler was born in Boston in 1951; after years of working in his father's restaurant, 'Arthur's', he struck out on his own in 1979 and started Bob's Bagels right where it sits today, at XYZ Ave in Boston. For the last forty years, Bob's Bagels has strived to proved the best bagels in town, at the best prices, made with love from only the freshest ingredients. Bob still works the counter, just like the old days, so stop in sometime and say hello!"
      }));
  },

  checkout: function() {
    $("#selected_menu").load('partials/checkout.html', function(){
      trace("checkout html loaded!");
    });
  }
});

var router = new Router();
Backbone.history.start();

$(document).ready(function(){
  Cookie.getCookie("cart_id") == "null" ? Cookie.getCartId() : trace(Cookie.getCookie("cart_id"));
});




















