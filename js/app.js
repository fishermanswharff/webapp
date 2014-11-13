function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

var Router = Backbone.Router.extend({
  routes: {
    '': 'menu',
    'login': 'login',
    'checkout': 'checkout'
  },

  menu: function(){
    $.ajax({ url: 'https://bobsapi.herokuapp.com/products', type: 'GET',})
    .done(function(response){
      trace(response);
      var template = Handlebars.compile($("#mainTemplate").html());
      $("#bobs-bagels-menu").html(template({
        products: response
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

    $("#line-items").on("submit","form.update-line-item", function(e){
      LineItemSubmission.updateItem(e);
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
      url: 'https://bobsapi.herokuapp.com/line_items/'+item.id,
      type: 'GET',
      complete: function(){
        $("#price_total_trigger").trigger("click");
      },
    }).done(function(response){
      // trace(response);
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
  if ((Cookie.getCookie("cart_id") === "null") || (Cookie.getCookie("cart_id") === undefined) || (Cookie.getCookie("cart_id") === null)) {
    Cookie.getCartId();
  } else {
    var id = Cookie.getCookie("cart_id");
    $.ajax({
      url: "https://bobsapi.herokuapp.com/carts/"+id,
      type: 'GET',
    })
    .done(function(response) {
      getLineItems(response);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      trace(jqXHR, textStatus, errorThrown);
    })
    .always(function() {
      // trace("complete");
    });

  }
  $("#price_total_trigger").on("click",function(event){
    Cart.updateTotalCartPrice();
  });
  $("#updateCart").on("click",function(event){
    Cart.updateCart();
  });
});




















