var LineItemSubmission = {};

LineItemSubmission.processForm = function(e,form,router){
  if(e.preventDefault) e.preventDefault();
  trace(e,form,router);
  var product_id = $(form).find("input[type='hidden']").val();
  var quantity = $(form).find("input[type='number']").val();
  var cart_id = Cookie.getCookie("cart_id");
  LineItemSubmission.postLineItem(product_id, quantity, cart_id);
};

LineItemSubmission.postLineItem = function(product_id, quantity, cart_id){
  trace(product_id, quantity, cart_id);
  $.ajax({
    url: 'http://localhost:3000/line_items',
    type: 'POST',
    data: {
      line_item: {
        product_id: product_id,
        quantity: quantity,
        cart_id: cart_id
      }
    }
  }).done(function(response){
    trace(response);
    var template = Handlebars.compile($("#lineItemTemplate").html());
    $("#line-items").append(template({
      item: response
    }));

  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

LineItemSubmission.updateItem = function(e){
  if(e.preventDefault) e.preventDefault();
  var id = $(e.currentTarget).find("input").attr("id");
  var quantity = $(e.currentTarget).siblings("p").find("input[type='number']").val();
  $.ajax({
      url: 'http://localhost:3000/line_items/'+id,
      type: 'PATCH',
      data: {
        line_item: {
          quantity: quantity
        }
      },
      success: function (data) {
        trace(data);
      }
    }).done(function(response){
      trace(response);

    }).fail(function(jqXHR, textStatus){
      trace(jqXHR, textStatus);
    });
    Cart.updateTotalCartPrice();
};
