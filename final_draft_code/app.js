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

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});