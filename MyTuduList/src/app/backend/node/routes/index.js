const { Router } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router =express.Router(); 

router.get('/getList', (req,res) => {

    const url = path.join(__dirname,'..','..','..','..','..', '/src/assets/files/list.txt') 
    fileArr = fs.readFileSync(url)
    arrayfie = eval(fileArr.toString())

    res.send(arrayfie);
})

module.exports = router;


/*
[
        {
          title: "Breathe",
          description: "I mean, you need it"
        },
        {
          title: "Think",
          description: "I mean, you have to"
        },
        {
          title: "Carry on",
          description: "Nothing its permanent"
        },
      ]
*/