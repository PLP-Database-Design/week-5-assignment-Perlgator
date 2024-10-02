const express = require("express")
const app = express();
const mysql = require('mysql2');
const dotenv = require("dotenv")

dotenv.config();

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    
})



database.connect((err) => {
 
    if(err) {
        return console.log("Error connecting to database: ", err)
 }

    console.log("successfully connected to mySQL:", database.threadId)
})

// question 1

app.get('', (err, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"
    database.query(getPatients, (err, results) => {

        if(err) {
            return res.status(400).send("Error", err)
        }
        res.status(200).send(results)
    
    })
})

//question 2

app.get('', (err, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    database.query(getProviders, (err, results) => {

        if(err) {
            return res.status(400).send("Error", err)
        }
        res.status(200).send(results)
    
    })
})

//question 3
app.get('',(err, res) => {
    const getPatients = "SELECT first_name FROM patients"
    database.query(getPatients, function(err, results) {
       
        if(err) {
            return res.status(400).send("Error", err)
        }
        res.status(200).send(results)
    })
})

//question 4

app.get('', (err, res) => {
    const getProviders = "SELECT provider_specialty FROM providers"
    database.query(getProviders, function (err, results) {
        if(err) {
            return res.status(400).send("ERROR", err)
        }
        res.status(200).send(results)
    })
})



app.listen(8500, () => {
    console.log("Server is running on port 3300....");
})
