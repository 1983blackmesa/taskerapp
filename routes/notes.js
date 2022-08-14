const router = require("express").Router();
let Note = require("../models/noteModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const SECRET = process.env.SECRET;




// READ
router.route("/").get((req, res) => {


  const payload = jwt.verify(req.cookies.token, SECRET);



  Note.where({ user: new mongoose.Types.ObjectId(payload.id) })
    .find((err, notes) => {
      res.json(notes);

    })



});

// CREATE
router.route("/add").post((req, res) => {
  //console.log(">>> payload: ");


  const payload = jwt.verify(req.cookies.token, SECRET);
  console.log(payload.id);


  const newTitle = req.body.title;
  const newContent = req.body.content;
  let newUser = new mongoose.Types.ObjectId(payload.id);
  console.log(">>> User: " + JSON.stringify(newUser));

  const newNote = new Note({
    user: newUser,
    title: newTitle,
    content: newContent,
  });

  newNote
    .save()
    .then(() => res.json("Note added."))
    .catch((err) => res.status(400).json("Error: " + err));
});



// UPDATE
router.route("/update/:id").patch((req, res) => {

  const payload = jwt.verify(req.cookies.token, SECRET);
  let user = new mongoose.Types.ObjectId(payload.id);

  Note.findById(req.params.id)
    .then((note) => {
      note.user = user;
      note.title = req.body.title;
      note.content = req.body.content;

      note
        .save()
        .then(() => res.json("Note Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE
router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
