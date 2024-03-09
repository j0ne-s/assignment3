/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Joao Santiago Student ID: 126567221 Date: 06/03/2024
*
*  Published URL: https://calm-rose-lemming-shoe.cyclic.app/
********************************************************************************
********************************************************************************/
const legoData = require('./modules/legoSets');
const path = require('path');

const express = require('express');
const app = express();

const HTTP_PORT = process.env.PORT || 5500;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/lego/sets", async (req,res) => {
  const theme = req.query.theme;
  try {
    if (theme) {
      const sets = await legoData.getSetsByTheme(theme);
      res.send(sets); 
      } else {
      const sets = await legoData.getAllSets();
      res.send(sets);
    }
  } catch(err){
    res.status(404).send(err);
    //res.sendStatus(404);
  }
});

app.get("/lego/sets/:num", async (req,res)=>{
  const legoNum = req.params.num;
  try {
    let set = await legoData.getSetByNum(legoNum);
    res.send(set);
  } catch(err) {
    res.status(404).send(err);
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

legoData.initialize().then(()=>{
  app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
});