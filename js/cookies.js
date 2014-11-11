Cookie = Cookie || {};

Cookie.setItem = function(){
  docCookies.setItem('cart_cookie', cartId, '/');
  trace(docCookies.getItem('cart_cookie'));
};

Cookie.getCartId = function(){
  var cartId;
  $.ajax({
    url: 'https://bobsapi.herokuapp.com/carts',
    type: 'POST',
    data: { cart:{} }
  }).done(function(response){
    cartId = response.id;
    return cartId;
    trace(response); //response = cart object
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
}

//get the cart ID
Cookie.getItem = function(){
  if(docCookies.hasItem('cart_cookie')){
    return cartId;
  } else (docCookies.getItem('cart_cookie')== null){
    Cookie.getCartId();
  }
}

//method
//check if it exists or not.




//if it exists get data out of cookie
  //card id out of cookie

//if no browser cookies,
  //then send an ajax request to create a new cart.
  //instantiate a new shopping cart
  //then get cookie cart id out of it


