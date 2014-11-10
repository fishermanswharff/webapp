function trace(){ for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}}

menu = {};

menu.load_menu = function(data) {
      trace(data);
      data = data[menu.selected].products;
      var item = 0;
      data.forEach(function(data) {
        item = item + 1;
        $('#Front_menu').append($('<div class="wire item id="menu_item_' + item + '">').text(data.title + " - " + data.description + " - $" + data.price));
        $('#Front_menu').append($('<img src=' + data.image_url + ' class="image">'));

      });
  console.log("Menu Loaded");
};

menu.clear = function() {
  $("#Front_menu").html("");
  menu.load_menu(menu.data);
};

menu.get_request = function() {
  $.ajax({
      url: 'https://bobsapi.herokuapp.com/categories/',
      type: 'GET',
      complete: function(jqXHR,textStatus){
        // trace(jqXHR, textStatus, "complete get!!");
      },
      success: function(data, textStatus, jqXHR){
        // trace(data,textStatus, jqXHR, "successful get!!");
        menu.data = (data);
        menu.load_menu(data);
      },
      error: function(jqXHR,error,exception){
        // trace(jqXHR,error,exception);
      },
    }).done(function(response){
      trace(response, "done ajax!!");
    }).fail(function(jqXHR, textStatus, thrownError){
      trace(jqXHR, textStatus, thrownError);
      router.navigate("home",{trigger: true});
    });
};

// --------------------------------------------------------------

$(document).ready(function(){
  menu.selected = 0;
  menu.get_request();
});

$( ".selected" ).click(function() {
  menu.selected = event.target.id;
  menu.clear();
});
