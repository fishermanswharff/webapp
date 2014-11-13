OrderSubmission = {}

OrderSubmission.processOrder = function(token, form){
  
  trace(token, form);
  debugger;

  $.ajax({
    url: 'https://bobsapi.herokuapp.com/orders',
    type: 'POST',
    data: {
      order: {

      }
    },
  }).done(function(response){
    trace(response);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  
  
};