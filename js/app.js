function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

var Router = Backbone.Router.extend({
  routes: {
    '': 'menu',
    'about': 'about',
    'login': 'login',
    'sandwiches': 'sandwiches',
    'catering': 'catering',
    'beverages': 'beverages',
    'cart': 'cart',
    'delivery': 'delivery',
    'checkout': 'checkout'
  },

  sandwiches: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/2',
      type: 'GET',
    }).done(function(response){
      var template = Handlebars.compile($("#sandwichesTemplate").html());
      $("#selected_menu").html(template({
        sandwiches: response
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
      var template = Handlebars.compile($("#cateringTemplate").html());
      $("#selected_menu").html(template({
        catering: response
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
      var template = Handlebars.compile($("#beveragesTemplate").html());
      $("#selected_menu").html(template({
        beverages: response
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

});




// menu = {};

// menu.load_menu = function(data) {
//       trace(data);
//       data = data[menu.selected].products;
//       var item = 0;
//       data.forEach(function(data) {
//         item = item + 1;
//         $('#Front_menu').append($('<div class="wire item id="menu_item_' + item + '">').text(data.title + " - " + data.description + " - $" + data.price));
//         $('#Front_menu').append($('<img src=' + data.image_url + ' class="image">'));

//       });
//   console.log("Menu Loaded");
// };
/*
menu.clear = function() {
  $("#Front_menu").html("");
  menu.load_menu(menu.data);
};
*/

/*
menu.get_request = function() {
  $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/',
      type: 'GET',
      complete: function(jqXHR,textStatus){
        // trace(jqXHR, textStatus, "complete get!!");
      },
      success: function(data, textStatus, jqXHR){
        // trace(data,textStatus, jqXHR, "successful get!!");
        menu.data = (data);
        menu.load_menu(data);
      },
      error: function(jqXHR,error,exception){
        // trace(jqXHR,error,exception);
      },
    }).done(function(response){
      trace(response, "done ajax!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("home",{trigger: true});
    });
};
*/
// --------------------------------------------------------------

var router = new Router();
Backbone.history.start();

$(document).ready(function(){
  // menu.selected = 0;
  // menu.get_request();

  // $('.jumbo').on('click', function(){
  //   $(this).toggleClass('.jumbo');
  // });

});

// $( ".selected" ).click(function() {
//   menu.selected = event.target.id;
//   menu.clear();
// });
