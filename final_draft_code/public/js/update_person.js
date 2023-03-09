
// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-person-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFlavor = document.getElementById("mySelect");
    let inputQtyOnHand = document.getElementById("input-qtyOnHand-update");
    let inputPrice = document.getElementById("input-price-update");

    // Get the values from the form fields
    let flavorValue = inputFlavor.value;
    let qtyOnHandValue = inputQtyOnHand.value;
    let priceValue = inputPrice.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for qtyOnHand

    if (isNaN(qtyOnHandValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        flavor: flavorValue,
        qtyOnHand: qtyOnHandValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-person-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, flavorValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("people-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of qtyOnHand value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign qtyOnHand to our value we updated to
            td.innerHTML = parsedData[0].qtyOnHand; 
       }
    }
}


