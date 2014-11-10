menu = {};

menu.load_menu = function(data) {
      data = data.products;
      var item = 0;
      data.forEach(function(data) {
        item = item + 1;
        $('#Front_menu').append($('<div class="wire item id="menu_item_' + item + '">').text(data.title));
        $('#Front_menu').append($('<img src=' + data.image_url + ' class="image">'));

      });
  console.log("Menu Loaded");
};



function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

$(document).ready(function(){
  var selected = 1;
  $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/' + selected,
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

$( ".selected" ).click(function() {
  alert(event.target.id);
});
