// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 6366;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript
    

// app.js

// GET ROUTES
app.get('/', function(req, res)
{
    // Declare Query 1
  let query1;

  // If there is no query string, we just perform a basic SELECT
  if (req.query.flavor === undefined) {
    query1 = "SELECT * FROM Gogurts;";
  }

  // If there is a query string, we assume this is a search, and return desired results
  else {
    query1 = `SELECT * FROM Gogurts WHERE flavor LIKE "${req.query.flavor}%"`
  }
    db.pool.query(query1, function(error, rows, fields){
        res.render('index', {data: rows});
    })
});

///// ---------------------------------------------------------------------------------------------------- html form

app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Gogurts (flavor, qtyOnHand, price) VALUES ('${data['input-flavor']}', '${data['input-qtyOnHand']}', '${data['input-price']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
});

app.delete('/delete-person-ajax/', function(req,res,next){
  let data = req.body;
  let personID = parseInt(data.idGogurt);
  let deleteGogurt = `DELETE FROM Gogurts WHERE idGogurt = ?`;
//   let deleteSales= `DELETE FROM Sales WHERE idCustomer = ?`;


        // Run the 1st query
        db.pool.query(deleteGogurt, [personID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
})});

app.put('/put-person-ajax', function(req,res,next){                                   
  let data = req.body;

  let qtyOnHand = parseInt(data.qtyOnhand);
  let flavor = parseInt(data.flavor);

  queryUpdateWorld = `UPDATE Gogurts SET qtyOnHand = ? WHERE idGogurt = ?`;
  selectWorld = `SELECT * FROM Gogurts WHERE idGogurt = ?`

        // Run the 1st query
        db.pool.query(queryUpdateWorld, [qtyOnHand, flavor], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectWorld, [qtyOnHand], function(error, rows, fields) {
        
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});

// ------ ROUTE FOR SUPPLIERS
app.get('/suppliers', function(req, res)
{
    // Declare Query 3
 let query3;
 
 if (req.query.supplierName === undefined){
    query3 = "SELECT * FROM Suppliers;";
 }

 else{
    query3 = `SELECT * FROM Suppliers WHERE supplierName LIKE "${req.query.supplierName}%"`;
 }
  
  
 db.pool.query(query3, function(error, rows, fields){
        res.render('suppliers', {data: rows});
    })
});

app.post('/add-supplier-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Suppliers (supplierName, email) VALUES ('${data.supplierName}', '${data.supplierEmail}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/suppliers');
        }
    })
});

app.delete('/delete-supplier-ajax/', function(req,res,next){
  let data = req.body;
  let personID = parseInt(data.idSupplier);
  let deleteSupplier = `DELETE FROM Suppliers WHERE idSupplier = ?`;
//   let deleteSales= `DELETE FROM Sales WHERE idCustomer = ?`;


        // Run the 1st query
        db.pool.query(deleteSupplier, [personID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
})});

// ------------- ROUTE FOR ORDERS--------------------
app.get('/orders', function(req, res)
{
    // Declare Query 3
 let query4;
 
 if (req.query.idOrder === undefined){
    query4 = "SELECT * FROM Orders;";
 }

 else{
    query4 = `SELECT * FROM Orders WHERE idOrder LIKE "${req.query.idOrder}%"`;
 }
  
  
 db.pool.query(query4, function(error, rows, fields){
        res.render('orders', {data: rows});
    })
});

app.post('/add-order-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (idSupplier, orderDate) VALUES ('${data.idSupplier}', '${data.orderDate}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/orders');
        }
    })
});

app.delete('/delete-order-ajax/', function(req,res,next){
  let data = req.body;
  let personID = parseInt(data.idOrder);
  let deleteOrder = `DELETE FROM Orders WHERE idOrder = ?`;
//   let deleteSales= `DELETE FROM Sales WHERE idCustomer = ?`;

        // Run the 1st query
        db.pool.query(deleteOrder, [personID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
})});

// ------------- ROUTE FOR CUSTOMERS--------------------
app.get('/customers', function(req, res)
{  
    let query1 = "SELECT Customers.idCustomer, customerName, email, address FROM Customers";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('customers', {data: rows});                 // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customerName, email, address) VALUES ('${data.customerName}', '${data.email}', '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let idCustomer = parseInt(data.id);
    let deleteCustomer= `DELETE FROM Customers WHERE idCustomer = ?`;
    
    // Run the 1st query
    db.pool.query(deleteCustomer, [idCustomer], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
    })   
});

// ------------- ROUTE FOR SALES--------------------
app.get('/sales', function(req, res)
{  
    let query1 = "SELECT * FROM Sales"                     // Define our query

    let query2 = "SELECT * FROM SalesDetails"

    let query3 = "SELECT * FROM Customers"

    let query4 = "SELECT * FROM Gogurts"

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        // Save the sales
        let sales = rows

        // run the second query
        db.pool.query(query2, (error, rows, fields) => {
            // save salesDetails
            let salesDetails = rows

            // run the third query
            db.pool.query(query3, (error, rows, fields) => {
                // Save the customers
                let customers = rows
            
                // run the fourth query
                db.pool.query(query4, (error, rows, fields) => {
            
                    // save the gogurts
                    let gogurts = rows
                    return res.render('sales', {data: sales, data2: salesDetails, customers: customers, gogurts: gogurts});                 // Render the index.hbs file, and also send the renderer
                })
            })
        })
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.post('/add-sale-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let idCustomer = parseInt(data.idCustomer)
    let orderQty = parseInt(data.orderQty)
    let subTotal = parseFloat(data.subTotal)
    let idGogurt = parseInt(data.idGogurt)
    let unitPrice = parseFloat(data.unitPrice)
    let lineTotal = parseFloat(data.lineTotal)

    // Capture NULL values

    // Create the query and run it on the database
    let query2 = `INSERT INTO Sales (idCustomer, shipDate, subTotal) VALUES (${idCustomer}, '${data.shipDate}', ${subTotal})`;
    db.pool.query(query2, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query3 = `SELECT * FROM Sales;`;
            db.pool.query(query3, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    //save sales rows
                    let sales = rows

                    // get latest sale id for salesDetails
                    salesLength = sales.length
                    idSale = sales[salesLength-1].idSale
                    
                    // query salesDetails now
                    let query4 = `INSERT INTO SalesDetails (sid, gid, salesDate, orderQty, unitPrice, lineTotal) VALUES (${idSale}, ${idGogurt}, '${data.shipDate}', ${orderQty}, ${unitPrice}, ${lineTotal})`
                    db.pool.query(query4, function(error, rows, fields) {
                        if (error) {
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            let query5 = `SELECT * FROM SalesDetails;`;
                            db.pool.query(query5, function(error, rows, fields){
                                if (error) {
                                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                                    console.log(error);
                                    res.sendStatus(400);
                                }
                                else {
                                    res.send(sales)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

app.delete('/delete-sale-ajax/', function(req,res,next){
    let data = req.body;
    let idSale = parseInt(data.id);
    let deleteSale= `DELETE FROM Sales WHERE idSale = ?`;  
    // Run the 1st query
    db.pool.query(deleteSale, [idSale], function(error, rows, fields){
        if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
           console.log(error);
        res.sendStatus(400);
        }
    })   
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
