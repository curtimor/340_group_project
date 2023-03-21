//Citation for the following page:
//Date: 3-20-2022
//This page is adapted from the Node JS starter code app.js file
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

//code for deletePerson function using jQuery
function deleteGogurt(idGogurt) {
  let link = '/delete-gogurt-ajax/';
  let data = {
    idGogurt: idGogurt
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8", 
    success: function(result) {
      deleteRow(idGogurt);
    }
  });
  location.reload()
}

function deleteRow(idGogurt){

    let table = document.getElementById("gogurt-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == idGogurt) {
            table.deleteRow(i);
            deleteDropDownMenu(idGogurt);
            break;
       }
    }
}


function deleteDropDownMenu(idGogurt){
  let selectMenu = document.getElementById("mySelect");
  for (let i = 0; i < selectMenu.length; i++){
    if (Number(selectMenu.options[i].value) === Number(idGogurt)){
      selectMenu[i].remove();
      break;
    } 

  }
}

