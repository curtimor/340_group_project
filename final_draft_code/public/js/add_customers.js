//Citation for the following page:
//Date: 3-20-2022
//This page is adapted from the Node JS starter code app.js file
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerName = document.getElementById("input-customerName");
    let inputEmail = document.getElementById("input-email");
    let inputAddress = document.getElementById("input-address");

    // Get the values from the form fields
    let customerNameValue = inputCustomerName.value;
    let emailValue = inputEmail.value;
    let addressValue = inputAddress.value;

    // Put our data we want to send in a javascript object
    let data = {
        customerName: customerNameValue,
        email: emailValue,
        address: addressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id;
    customerNameCell.innerText = newRow.customerName;
    emailCell.innerText = newRow.email;
    addressCell.innerText = newRow.address;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteCustomer(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerNameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
    location.reload();
}
