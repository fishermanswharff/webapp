var Cart = {};

Cart.clearCart = function(e,router){
  if(e.preventDefault) e.preventDefault();
  var cart_id = Cookie.getCookie("cart_id");
  $.ajax({
    url: 'https://bobsapi.herokuapp.com/carts/'+cart_id,
    type: 'DELETE',
  }).done(function(response){
    $("#line-items").html("");
    $("#price_total").html("");
    router.navigate('', {trigger: true});
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  
};

Cart.totalCart = function() {
  var cartItems = $('.line-item').toArray();
  return cartItems.map(Cart.multiplyPriceByQuantity)
           .reduce(Cart.sum);
};

// This is the one you want attached to that click event
Cart.updateTotalCartPrice = function() {
  var cartTotal = Cart.totalCart();
  $('#price_total').html("Price - " + cartTotal);
  trace(cartTotal);
};

Cart.multiplyPriceByQuantity = function(item) {
  return Cart.itemPriceAsFloat(item) * Cart.itemQuantityAsInt(item);
};

Cart.itemQuantityAsInt = function(item) {
  return parseInt($(item).find('.line-item-quantity').val(), 10); // 10 is the radix
};

Cart.itemPriceAsFloat = function(item) {
  return parseFloat($(item).find('.price').html());
};

Cart.sum = function(a, b) { return a + b; };

