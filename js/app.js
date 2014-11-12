function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

var Router = Backbone.Router.extend({
  routes: {
    '': 'menu',
    'login': 'login',
    'checkout': 'checkout'
  },

  menu: function(){
    $.ajax({ url: 'http://localhost:3000/categories', type: 'GET',})
    .done(function(response){
      var template = Handlebars.compile($("#mainTemplate").html());
      $("#bobs-bagels-menu").html(template({
        menu: response
      }));
      var $forms = $(".lineitem_submit");
      $forms.each(function(index,form){
        $(form).on("submit", function(e){
          LineItemSubmission.processForm(e,form,router);
        });
      });
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });

    
    $("#clear-cart").on("submit",function(e){
      Cart.clearCart(e,router);
    });
  },

  checkout: function() {
    $("#line-items").load('partials/checkout.html', function(){
      trace("checkout html loaded!");
    });
  }
});

var router = new Router();
Backbone.history.start();

var getLineItems = function(object){
  $(object.line_items).each(function(index,item){
    $.ajax({
      url: 'http://localhost:3000/line_items/'+item.id,
      type: 'GET',
    }).done(function(response){
      var template = Handlebars.compile($("#lineItemTemplate").html());
      $("#line-items").append(template({
        item: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    });
    
  });
};

$(document).ready(function(){
  if ((Cookie.getCookie("cart_id") == "null") || (Cookie.getCookie("cart_id") == undefined)) {
    Cookie.getCartId()
  } else {
    var id = Cookie.getCookie("cart_id");
    $.ajax({
      url: "http://localhost:3000/carts/"+id,
      type: 'GET',
    })
    .done(function(response) {
      // trace(response);
      getLineItems(response)
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace(jqXHR, textStatus, errorThrown);
    })
    .always(function() {
      // trace("complete");
    });
  }
});




















