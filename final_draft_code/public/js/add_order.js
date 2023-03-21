// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdSupplier = document.getElementById("input-idSupplier-ajax");
    let inputIdGogurt = document.getElementById("input-idGogurt-ajax");
    let inputOrderDate = document.getElementById("input-orderDate-ajax");
    let inputOrderQty = document.getElementById("input-orderQty-ajax");
    let inputUnitPrice = document.getElementById("input-unitPrice-ajax");
    let inputSubTotal = document.getElementById("input-subTotal-ajax");

    // Get the values from the form fields
    let idSupplierValue = inputIdSupplier.value;
    let idGogurtValue = inputIdGogurt.value;
    let orderDateValue = inputOrderDate.value;
    let orderQtyValue = inputOrderQty.value;
    let unitPriceValue = inputUnitPrice.value;
    let lineTotalValue = inputSubTotal.value;
    let subTotalValue = inputSubTotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        idSupplier: idSupplierValue,
        idGogurt: idGogurtValue,
        orderDate: orderDateValue,
        orderQty: orderQtyValue,
        unitPrice: unitPriceValue,
        lineTotal: lineTotalValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputIdSupplier.value = '';
            inputIdGogurt.value = '';
            inputOrderDate.value = '';
            inputOrderQty.value = '';
            inputUnitPrice.value = '';
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
// orders/ordersDetails
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentOrdersTable = document.getElementById("orders-table");
    //let currentSalesDetailsTable = document.getElementById("salesDetails-table");

    // Get the location where we should insert the new row (end of table)
    let newOrdersRowIndex = currentOrdersTable.rows.length;
    //let newSalesDetailsRowIndex = currentSalesDetailsTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let idSupplierCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let subTotalCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    idSupplierCell.innerText = newRow.idSupplier;
    orderDateCell.innerText = newRow.orderDate;
    subTotalCell.innerText = newRow.subTotal;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(idSupplierCell);
    row.appendChild(orderDateCell);
    row.appendChild(subTotalCell);
    
    // Add the row to the table
    currentSalesTable.appendChild(row);
    location.reload();
}