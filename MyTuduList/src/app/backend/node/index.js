const express = require('express');
const router = require('./routes');
const routes = require('./routes');
var cors = require('cors')

const app = express();

app.use(cors())

const port = 3000;
//TODO: Redirect to main page
app.get('/',(req,res) => {
    res.send("ok");
})

app.use('/api',routes)

app.listen(port, ()=>{
    console.log("Listening on port: " + port);
});

