var LineItemSubmission = {}

LineItemSubmission.processForm = function(e,form,router){
  if(e.preventDefault) e.preventDefault();
  trace(e,form,router);
  var product_id = $(form).find("input[type='hidden']").val();
  var quantity = $(form).find("input[type='number']").val();
  debugger;
}
