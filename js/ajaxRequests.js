
  // POST::CART, SAVE THE CART ID TO A BROWSER SESSION COOKIE
  // ————————————————————————————————————————————————————
  
  $.ajax({
    //url: 'http://localhost:3000/carts',
    //url: 'http://localhost:3000/carts',
    type: 'POST',
    data: { cart:{} }
  }).done(function(response){
    trace(response) //response = cart object
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  

  // POST::Order = {}
  // ————————————————————————————————————————————————————
  
  $.ajax({
    url: 'http://localhost:3000/orders',
    type: 'POST',
    data: {
      order: {
        name: "Jason Wharff",
        address: "21 Shepard St. #1",
        email: "fishermanswharff@mac.com",
        pay_type: "Credit Card",
        delivery: true,
        cart_id: 68
      }
    },
  }).done(function(response){
    trace(response, "done ajax!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
  });
  


  // post to a new line_item
  
  $.ajax({
    url: 'http://localhost:3000/line_items',
    type: 'POST',
    data: {
      line_item: {
        product_id: 1,
        quantity: 1,
        cart_id: 6
      }
    },
  }).done(function(response){
    trace(response);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
  

  // POST options for a line_item.
  
  $.ajax({
    url: 'http://localhost:3000/options',
    type: 'POST',
    data: {
      option: {
        items: "extra cheese",
        price: 1.99,
        line_item_id: 1
      }
    },
    success: function(data,textStatus,jqXHR){
      // trace(data,textStatus, jqXHR, "successful post request!");
    },
    error: function(jqXHR, error, exception){
      trace(jqXHR, error, exception, "you're so stupid, you're doing it wrong");
    },
    complete: function(jqXHR, textStatus){
      // trace(jqXHR, textStatus, "completed ajax post request");
    }
  }).done(function(response){
    trace(response);
  }).fail(function(jqXHR, textStatus, errorThrown){

  });
  
  


  // POST a new cart
  // response contains the id of the cart, which you'll need to save in a cookie
  // so the user can 
  
  $.ajax({
    url: 'http://localhost:3000/carts',
    type: 'POST',
    success: function(data,textStatus,jqXHR){
      // trace(data,textStatus, jqXHR, "successful post request!");
    },
    error: function(jqXHR, error, exception){
      // trace(jqXHR, error, exception, "you're so stupid, you're doing it wrong");
    },
    complete: function(jqXHR, textStatus){
      // trace(jqXHR, textStatus, "completed ajax post request");
    }
  }).done(function(response){
    trace(response.id);
  }).fail(function(jqXHR, textStatus, errorThrown){
    // trace(jqXHR, textStatus, errorThrown);
  });
    
  
  // get all line_items
  
  $.ajax({
    url: 'http://localhost:3000/line_items',
    type: 'GET',
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete get!!");
    },
    success: function(data, textStatus, jqXHR){
      trace(data,textStatus, jqXHR, "successful get!!");
    }, 
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "done ajax!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
  });
  

  
  

  // GET all the carts -> admin only
  
  $.ajax({
    // url: 'http://localhost:3000/carts',
    url: 'http://localhost:3000/carts',
    type: 'GET',
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete get!!");
    },
    success: function(data, textStatus, jqXHR){
      trace(data,textStatus, jqXHR, "successful get!!");
    }, 
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "done ajax!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
  });
  

  // GET all products, can also append '/#{:id}' to the route to get a single product
  // ————————————————————————————————————————————————————
  
  $.ajax({
    url: 'http://localhost:3000/products',
    type: 'GET',
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete get!!");
    },
    success: function(data, textStatus, jqXHR){
      trace(data,textStatus, jqXHR, "successful get!!");
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
   