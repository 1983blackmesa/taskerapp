/*
const router = require("express").Router();
let Todo = require("../models/todoModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const SECRET = process.env.SECRET;



router.route("/").get((req, res) => {

 
  const payload = jwt.verify(req.cookies.token, SECRET);  
  
  
  Todo.where({user:new mongoose.Types.ObjectId(payload.id)})
    .find((err,todos) => {
      res.json(todos);

    })


});

//ADD
//router.route("/todos").put((req, res) => {
  //router.route("/todos").post((req, res) => {
    router.put("/", async (req, res) => {

  //router.route('/').put((req,res) => {

    const payload = jwt.verify(req.cookies.token, SECRET);
    console.log(payload);
    Todo.updateOne({
      _id:new mongoose.Types.ObjectId(req.body.id),
      user:new mongoose.Types.ObjectId(payload.id)
    }, {
      done:req.body.done,
      //text:req.body.text,
    }).then(() => {
      //res.json(todos);
     
      res.sendStatus(200);
    });
  });

//UPDATE
router.put("/:id", async (req, res) => {
//router.route("/todos").patch((req, res) => {
//router.put('/todos', (req, res) => {
//router.route("/todos/:id").patch((req, res) => {

//router.put('/todos/', (req, res) => {
  const payload = jwt.verify(req.cookies.token, SECRET);
  const todo = new Todo({
    text:req.body.text,
    done:false,
    user:new mongoose.Types.ObjectId(payload.id),
  });
  todo.save().then(todo => {
    res.json(todo);
  })
});




module.exports = router;

*/

