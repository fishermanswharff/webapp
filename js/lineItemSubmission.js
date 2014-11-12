var LineItemSubmission = {}

LineItemSubmission.processForm = function(e,form,router){
  if(e.preventDefault) e.preventDefault();
  trace(e,form,router);
  var product_id = $(form).find("input[type='hidden']").val();
  var quantity = $(form).find("input[type='number']").val();
  // var cart_id = Cookie.getCookie("cart_id");
  debugger;

  LineItemSubmission(product_id, quantity, cart_id);
}

LineItemSubmission.postLineItem = function(product_id, quantity, cart_id){
  trace(params)
  debugger;

  $.ajax({
    url: 'http://localhost:3000/line_items',
    type: 'POST',
    data: {
      line_item: {
        product_id: product_id,
        ...
      }
    }
  });
};
