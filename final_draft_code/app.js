// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 6364;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
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

// app.get('/', function(req, res)
// {
//     // Declare Query 1
//     let query1;

//     // If there is no query string, we just perform a basic SELECT
//     if (req.query.lname === undefined)
//     {
//         query1 = "SELECT * FROM Customers;";
//     }

//     // If there is a query string, we assume this is a search, and return desired results
//     else
//     {
//         query1 = `SELECT * FROM bsg_people WHERE lname LIKE "${req.query.lname}%"`
//     }

//     // Query 2 is the same in both cases
//     let query2 = "SELECT * FROM bsg_planets;";

//     // Run the 1st query
//     db.pool.query(query1, function(error, rows, fields){
        
//         // Save the people
//         let people = rows;
        
//         // Run the second query
//         db.pool.query(query2, (error, rows, fields) => {
            
//             // Save the planets
//             let planets = rows;

//             // BEGINNING OF NEW CODE

//             // Construct an object for reference in the table
//             // Array.map is awesome for doing something with each
//             // element of an array.
//             let planetmap = {}
//             planets.map(planet => {
//                 let id = parseInt(planet.id, 10);

//                 planetmap[id] = planet["name"];
//             })

//             // Overwrite the homeworld ID with the name of the planet in the people object
//             people = people.map(person => {
//                 return Object.assign(person, {homeworld: planetmap[person.homeworld]})
//             })

//             // END OF NEW CODE
//             return res.render('index', {data: people, planets: planets});
//         })
//     })
// });

///// ---------------------------------------------------------------------------------------------------- html form

app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let customerName = parseInt(data['input-customerName']);
    // if (isNaN(customerName))
    // {
    //     customerName = 'NULL'
    // }

    // let email = parseInt(data['input-email']);
    // if (isNaN(email))
    // {
    //     email = 'NULL'
    // }

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
})
// app.post('/add-person-form', function(req, res){
//     // Capture the incoming data and parse it back to a JS object
//     let data = req.body;

//     // Capture NULL values
//     let homeworld = parseInt(data['input-homeworld']);
//     if (isNaN(homeworld))
//     {
//         homeworld = 'NULL'
//     }

//     let age = parseInt(data['input-age']);
//     if (isNaN(age))
//     {
//         age = 'NULL'
//     }

//     // Create the query and run it on the database
//     query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
//     db.pool.query(query1, function(error, rows, fields){

//         // Check to see if there was an error
//         if (error) {

//             // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
//             console.log(error)
//             res.sendStatus(400);
//         }

//         // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
//         // presents it on the screen
//         else
//         {
//             res.redirect('/');
//         }
//     })
// });

app.post('/add-person-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data.homeworld);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT bsg_people.id, bsg_people.fname, bsg_people.lname, bsg_people.homeworld, bsg_people.age, bsg_planets.name 
FROM bsg_people 
LEFT JOIN bsg_planets ON bsg_people.homeworld = bsg_planets.id;`;
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

            // else
            // {
            //     // Run the second query
            //     db.pool.query(deleteSales, [personID], function(error, rows, fields) {

            //         if (error) {
            //             console.log(error);
            //             res.sendStatus(400);
            //         } else {
            //             res.sendStatus(204);
            //         }
            //     })
            // }
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



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});