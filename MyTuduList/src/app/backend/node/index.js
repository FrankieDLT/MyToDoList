const express = require('express');
const router = require('./routes');
const routes = require('./routes');
var cors = require('cors')

const app = express();

app.use(cors())

const port = 3000;

/**
 * The user is redirected to the main page
 */
app.get('/',(req,res) => {
    res.redirect('http://localhost:4200/');
})

/**
 * All the api operations are handled in the routes index.js
 */
app.use('/api',routes)

app.listen(port, ()=>{
    console.log("Listening on port: " + port);
});

