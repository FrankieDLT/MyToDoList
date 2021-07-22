const {
  Router
} = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

//Url where the data file is located
const urli = path.join(__dirname,'../', '../', '../','MyTuduList/otherFile/lisjson.json')
const url = path.join(__dirname,'..', '..', '..','MyTuduList/src/assets/files/lisjson.json')


/**
 * This function retrieves the file that contains the data and sends it 
 * as an array to be displayed in the front end.
 */
router.get('/getList', (req, res) => {
 let resu = readFileJson()
  res.send(arrayJson);
})

/**
 * This functions retrieves the data file and compares its ids to the id of the new entry,
 * if the entry already exists, it is denied, but if its a new entry, the new data its added 
 * to the existing array and saved on the file.
 * @param req.body This object contains the information of the new entry including its tittle and description
 * @returns Status code containing a possibe error
 */
router.post('/postList', bodyParser.json(), (req, res) => {
  
  let resu = readFileJson()

  if (resu.indexOf(req.body.title) == -1) {

    arrayJson.push(req.body)
    fs.writeFileSync(url, JSON.stringify(arrayJson));

  } else {
    res.sendStatus(302);
  }

  res.end();

})

/**
 * This functions retrieves the data file and compares its ids to the id of the new entry,
 * if the entry does not already exists, it is denied, but if its a existing entry, the old data its overwritten 
 * by the new one and the existing array is saved on the file.
 * @param req.param.id This is the id of the entry to be modified
 * @param req.body This object contains the information of the new entry including its tittle and description
 * @returns Status code containing a possibe error
 */
router.put('/changeList/:id', bodyParser.json(), function (req, res) {
 
  let resu = readFileJson()

  if (resu.indexOf(req.params.id) != -1) {
    arrayJson[resu.indexOf(req.params.id)] = {
      "title": req.body.title.trim(),
      "description": req.body.description,
      "isDone": req.body.isDone
    }
    fs.writeFileSync(url, JSON.stringify(arrayJson));
  } else {
    res.sendStatus(404);
  }
  res.end();

})

/**
 * This functions retrieves the data file and compares its ids to the id of the desired entry,
 * if the entry does not exists, it is denied, but if its a existing entry, the entry its deleted 
 * from the array and its saved on the file.
 * @param req.param.id This is the id of the entry to be deleted
 * @returns Status code containing a possibe error
 */
router.delete('/deleteFromList/:id', function (req, res) {
  
  let resu = readFileJson()

  if (resu.indexOf(req.params.id) != -1) {
  arrayJson.splice(resu.indexOf(req.params.id), 1);
  fs.writeFileSync(url, JSON.stringify(arrayJson));
  } else {
    res.sendStatus(404);
  }
  res.end();
})

/**
 * Function that reads the file and uses an auxiliary array to checks for ids
 * @returns auxiliary array that contais all the ids
 */
function readFileJson() {
  filejson = fs.readFileSync(url);
  arrayJson = JSON.parse(filejson);
  var resu = [].concat(...arrayJson).map(({
    title
  }) => title);
  return resu
}


module.exports = router;


/*Testing values, to use by copying and pasting
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
