var Cart = {}

Cart.clearCart = function(e,router){
  if(e.preventDefault) e.preventDefault();
  var cart_id = Cookie.getCookie("cart_id");
  trace(e,router, cart_id);
  $.ajax({
    url: 'http://localhost:3000/carts/'+cart_id,
    type: 'DELETE',
  }).done(function(response){
    $("#line-items").html("");
    router.navigate('', {trigger: true})
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};