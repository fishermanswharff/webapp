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
    // trace("hello world");

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

// $.ajax({
//     url: 'https://bobsapi.herokuapp.com/products',
//     type: 'GET',
//     complete: function(jqXHR,textStatus){
//       trace(jqXHR, textStatus, "complete get!!");
//     },
//     success: function(data, textStatus, jqXHR){
//       trace(data,textStatus, jqXHR, "successful get!!");
//     },
//     error: function(jqXHR,error,exception){
//       trace(jqXHR,error,exception);
//     },
//   }).done(function(response){
//     trace(response, "done ajax!!");
//   }).fail(function(jqXHR, textStatus, thrownError){
//     trace(jqXHR, textStatus, thrownError);
//     router.navigate("home",{trigger: true});
//   });

// });

  sandwiches: function(){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/2',
      type: 'GET',
    }).done(function(response){
      trace(response);
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

    

  // var cartId;
  // 
  
  /*
  $.ajax({
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
          product_id: 7,
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

  // addLineItem();

  var addOptionsToLineItems = function(object){
    $.ajax({
      url: 'https://bobsapi.herokuapp.com/options',
      type: 'POST',
      data: {
        option: {
          items: "extra meat",
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


  var cartId;


//   $.ajax({
//     // url: 'http://localhost:3000/carts',
//     url: 'https://bobsapi.herokuapp.com/carts',
//     type: 'POST',
//     data: { cart:{} }
//   }).done(function(response){
//     cartId = response.id
//     // addLineItems(response);
//     trace(response) //response = cart object //// need to save this id into a cookie session
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//   });

// // this is the code that runs when we hit add to cart button
//   var addLineItem = function(){
//     $.ajax({
//       // url: 'http://localhost:3000/line_items',
//       url: 'https://bobsapi.herokuapp.com/line_items',
//       type: 'POST',
//       data: {
//         line_item: {
//           product_id: 7,
//           quantity: 1,
//           cart_id: 25
//         }
//       },
//     }).done(function(response){
//       trace(response);
//       // addOptionsToLineItems(response);
//     }).fail(function(jqXHR, textStatus, errorThrown){
//       trace(jqXHR, textStatus, errorThrown);
//     });
//   };

// //   // addLineItem();

//   var addOptionsToLineItems = function(number){
//     $.ajax({
//       url: 'https://bobsapi.herokuapp.com/options',
//       // url: 'https://bobsapi.herokuapp.com/options',
//       type: 'POST',
//       data: {
//         option: {
//           items: "extra cheese",
//           price: 1.99,
//           line_item_id: number
//         }
//       },
//       success: function(data,textStatus,jqXHR){
//         // trace(data,textStatus, jqXHR, "successful post request!");
//       },
//       error: function(jqXHR, error, exception){
//         trace(jqXHR, error, exception, "you're so stupid, you're doing it wrong");
//       },
//       complete: function(jqXHR, textStatus){
//         // trace(jqXHR, textStatus, "completed ajax post request");
//       }
//     }).done(function(response){
//       trace(response);
//       // checkout(cartId)
//     }).fail(function(jqXHR, textStatus, errorThrown){

//     });
//   };

// //   // addOptionsToLineItems(22);

// // checkout gives us an order object
//   var checkout = function(number){
//     $.ajax({
//       // url: 'https://localhost:3000/orders',
//       url: 'https://bobsapi.herokuapp.com/orders',
//       type: 'POST',
//       data: {
//         order: {
//           name: "Shaai Lafollette",
//           address: "29 Cross Street. #1",
//           email: "fishermanswharff@mac.com",
//           pay_type: "Credit Card",
//           delivery: true,
//           cart_id: number
//         }
//       },
//     }).done(function(response){
//       trace(response, "done ajax!!");
//     }).fail(function(jqXHR, textStatus, thrownError){
//       trace(jqXHR, textStatus, thrownError);
//     });
//   };

//   checkout(25);


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
  */



  // menu.selected = 0;
  // menu.get_request();

  // $('.jumbo').on('click', function(){
  //   $(this).toggleClass('.jumbo');
  // });

// $.ajax({
//     url: 'https://bobsapi.herokuapp.com/products',
//     type: 'GET',
//     complete: function(jqXHR,textStatus){
//       trace(jqXHR, textStatus, "complete get!!");
//     },
//     success: function(data, textStatus, jqXHR){
//       trace(data,textStatus, jqXHR, "successful get!!");
//     },
//     error: function(jqXHR,error,exception){
//       trace(jqXHR,error,exception);
//     },
//   }).done(function(response){
//     trace(response, "done ajax!!");
//   }).fail(function(jqXHR, textStatus, thrownError){
//     trace(jqXHR, textStatus, thrownError);
//     router.navigate("home",{trigger: true});
//   });

});

// $( ".selected" ).click(function() {
//   menu.selected = event.target.id;
//   menu.clear();
// });






















