menu = {};

menu.load_menu = function(data) {
      data.forEach(function(data) {
        $('#Front_menu').append($('<div class="wire">').text("Test item"));
      });

  console.log("Menu Loaded");
};

function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

$(document).ready(function(){
  $.ajax({
      url: 'https://bobsapi.herokuapp.com/products',
      type: 'GET',
      complete: function(jqXHR,textStatus){
        trace(jqXHR, textStatus, "complete get!!");
      },
      success: function(data, textStatus, jqXHR){
        trace(data,textStatus, jqXHR, "successful get!!");
        menu.load_menu(data);
      },
      error: function(jqXHR,error,exception){
        trace(jqXHR,error,exception);
      },
    }).done(function(response){
      trace(response, "done ajax!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("home",{trigger: true});
    });




});
