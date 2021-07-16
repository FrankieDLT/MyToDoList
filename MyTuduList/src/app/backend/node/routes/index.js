const {
  Router
} = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const url = path.join(__dirname, '..', '..', '..', '..', '..', '/src/assets/files/list.txt')
fileArr = fs.readFileSync(url)
arrayfie = eval(fileArr.toString())
var resu = [].concat(...arrayfie).map(({
  title
}) => title);


router.get('/getList', (req, res) => {

  res.send(arrayfie);
})

router.post('/postList', bodyParser.json(), (req, res) => {
    fileArr = fs.readFileSync(url)
    arrayfie = eval(fileArr.toString())
    var resu = [].concat(...arrayfie).map(({
    title
    }) => title);

  if (resu.indexOf(req.body.title) == -1) {

    arrayfie.push(req.body)
    fs.writeFileSync(url, JSON.stringify(arrayfie));

  } else {
    res.sendStatus(302);
  }
  
  res.end();

})

router.delete('/deleteFromList/:id', function (req, res) {
    fileArr = fs.readFileSync(url)
    arrayfie = eval(fileArr.toString())
    var resu = [].concat(...arrayfie).map(({
    title
    }) => title);
    
  arrayfie.splice(resu.indexOf(req.params.id), 1);
  fs.writeFileSync(url, JSON.stringify(arrayfie));
  res.end();
})


/*
POST

    var resu = [].concat(...arrayfie).map(({title})=>title);
    console.log("Index of BuyMilk: " + resu.indexOf('Buy milk'));

*/

module.exports = router;


/*
[
        {
          title: "Call Dad",
          description: "Check on Dad"
        },
        {
          title: "Buy Milk",
          description: "Buy 2 liters of milk from the store"
        },
        {
          title: "Doctors Apointement",
          description: "Doctors apointemenet at 6pm on friday"
        },
	{
          title: "Do The Laundry",
          description: "Do the weekly laundry"
        }
]
*/
