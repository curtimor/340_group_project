//Citation for the following page:
//Date: 3-20-2022
//This page is adapted from the Node JS starter code app.js file
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addSaleForm = document.getElementById('add-sale-form-ajax');

// Modify the objects we need
addSaleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdCustomer = document.getElementById("input-idCustomer-ajax");
    let inputIdGogurt = document.getElementById("input-idGogurt-ajax");
    let inputShipDate = document.getElementById("input-shipDate-ajax");
    let inputOrderQty = document.getElementById("input-orderQty-ajax");
    let inputUnitPrice = document.getElementById("input-unitPrice-ajax");
    let inputSubTotal = document.getElementById("input-subTotal-ajax");

    // Get the values from the form fields
    let idCustomerValue = inputIdCustomer.value;
    let idGogurtValue = inputIdGogurt.value;
    let shipDateValue = inputShipDate.value;
    let orderQtyValue = inputOrderQty.value;
    let unitPriceValue = inputUnitPrice.value;
    let lineTotalValue = inputSubTotal.value;
    let subTotalValue = inputSubTotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        idCustomer: idCustomerValue,
        idGogurt: idGogurtValue,
        shipDate: shipDateValue,
        orderQty: orderQtyValue,
        unitPrice: unitPriceValue,
        lineTotal: lineTotalValue,
        subTotal: subTotalValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputIdCustomer.value = '';
            inputIdGogurt.value = '';
            inputShipDate.value = '';
            inputOrderQty.value = '';
            inputUnitPrice.value = '';
            inputSubTotal.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


// Creates a single row from an Object representing a single record from 
// sales/salesDetails
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentSalesTable = document.getElementById("sales-table");

    // Get the location where we should insert the new row (end of table)
    let newSalesRowIndex = currentSalesTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let idCustomerCell = document.createElement("TD");
    let shipDateCell = document.createElement("TD");
    let subTotalCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    idCustomerCell.innerText = newRow.idCustomer;
    shipDateCell.innerText = newRow.shipDate;
    subTotalCell.innerText = newRow.subTotal;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(idCustomerCell);
    row.appendChild(shipDateCell);
    row.appendChild(subTotalCell);
    
    // Add the row to the table
    currentSalesTable.appendChild(row);
    location.reload();
}
