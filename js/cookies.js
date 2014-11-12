var Cookie = {};

Cookie.setItem = function(key, value){
  var expires = new Date();
  expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
  trace(document.cookie);
};

// key: cart_id
Cookie.getCookie = function(key){
  var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
}

Cookie.getCartId = function(){
  var cartId;
  $.ajax({
    url: 'http://localhost:3000/carts',
    type: 'POST',
    data: { cart:{} }
  }).done(function(response){
    cartId = response.id;
    Cookie.setItem("cart_id",cartId);
    trace(response); //response = cart object
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

