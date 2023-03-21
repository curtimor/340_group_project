//Citation for the following page:
//Date: 3-20-2022
//This page is adapted from the Node JS starter code app.js file
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//code for deleteOrder function using jQuery
function deleteOrder(idOrder) {
    let link = '/delete-order-ajax/';
    let data = {
      idOrder: idOrder
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(idOrder);
      }
    });
    location.reload() 
  }
  
  function deleteRow(idOrder){
  
      let table = document.getElementById("orders-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == idOrder) {
              table.deleteRow(i);
              deleteDropDownMenu(idOrder);
              break;
         }
      }
  }
  
  
  function deleteDropDownMenu(idOrder){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(idOrder)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }
