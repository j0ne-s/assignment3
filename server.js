/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Joao Santiago Student ID: 126567221 Date: 20/03/2024
*
*  Published URL: https://calm-rose-lemming-shoe.cyclic.app/
********************************************************************************
********************************************************************************/
const legoData = require('./modules/legoSets');
const path = require('path');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const HTTP_PORT = process.env.PORT || 5500;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("home", {page: '/'});
});

app.get('/about', (req, res) => {
  res.render("about", {page: '/about'});
});

app.get("/lego/sets", async (req,res) => {
  const theme = req.query.theme;
  try {
    let sets;
    if (theme) {
      sets = await legoData.getSetsByTheme(theme);
    } else {
      sets = await legoData.getAllSets();
    }
    if (sets.length === 0) {
      res.status(404).render("404", {page: req.path, message: "No sets found for the matching theme"});
    } else {
      res.render("sets", {page: '/lego/sets', sets: sets});
    }
  } catch(err){
    res.status(404).render("404", {page: req.path, message: "An error occurred while fetching the sets"});
  }
});

app.get("/lego/sets/:num", async (req,res) => {
  const legoNum = req.params.num;
  try {
    let set = await legoData.getSetByNum(legoNum);
    if (!set) {
      res.status(404).render("404", {page: req.path, message: "No set found for the specified set number"});
    } else {
      res.render("set", {set: set});
    }
  } catch(err) {
    res.status(404).render("404", {page: req.path, message: "An error occurred while fetching the set"});
  }
});

app.use((req, res, next) => {
  res.status(404).render("404", {page: req.path, message: "I'm sorry, we're unable to find what you're looking for, my bro/sis"});
});

legoData.initialize().then(()=>{
  app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
});