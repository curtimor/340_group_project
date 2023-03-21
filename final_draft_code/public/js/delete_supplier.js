//code for deleteSupplier function using jQuery
function deleteSupplier(idSupplier) {
    let link = '/delete-supplier-ajax/';
    let data = {
      idSupplier: idSupplier
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8", 
      success: function(result) {
        deleteRow(idSupplier);
      }
    });
    location.reload()
  }
  
  function deleteRow(idSupplier){
  
      let table = document.getElementById("suppliers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == idSupplier) {
              table.deleteRow(i);
              deleteDropDownMenu(idSupplier);
              break;
         }
      }
  }
  
  
  function deleteDropDownMenu(idSupplier){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(idSupplier)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }
  
  