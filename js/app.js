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
    
  var cartId;
  // 
  $.ajax({
    // url: 'http://localhost:3000/carts',
    url: 'https://bobsapi.herokuapp.com/carts',
    type: 'POST',
    data: { cart:{} }
  }).done(function(response){
    cartId = response.id
    addLineItems(response);
    trace(response) //response = cart object
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });


  var addLineItems = function(object){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/line_items',
      type: 'POST',
      data: {
        line_item: {
          product_id: 18,
          quantity: 1,
          cart_id: object.id
        }
      },
    }).done(function(response){
      trace(response);
      addOptionsToLineItems(response);
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
  };

  var addOptionsToLineItems = function(object){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/options',
      type: 'POST',
      data: {
        option: {
          items: "extra cheese",
          price: 1.99,
          line_item_id: object.id
        }
      },
      success: function(data,textStatus,jqXHR){
        // trace(data,textStatus, jqXHR, "successful post request!");
      },
      error: function(jqXHR, error, exception){
        trace(jqXHR, error, exception, "you're so stupid, you're doing it wrong");
      },
      complete: function(jqXHR, textStatus){
        // trace(jqXHR, textStatus, "completed ajax post request");
      }
    }).done(function(response){
      trace(response);
      checkout(cartId)
    }).fail(function(jqXHR, textStatus, errorThrown){

    });
  };


  var checkout = function(cartId){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/orders',
      type: 'POST',
      data: {
        order: {
          name: "Jason Wharff",
          address: "21 Shepard St. #1",
          email: "fishermanswharff@mac.com",
          pay_type: "Credit Card",
          delivery: true,
          cart_id: cartId
        }
      },
    }).done(function(response){
      trace(response, "done ajax!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
    });
  };

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






















