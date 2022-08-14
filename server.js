require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//new here
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Todo = require("./models/todoModel");
const User = require("./models/userModel");


const app = express();

app.use(cookieParser()); //added
app.use(bodyParser.json({extended:true})); //added

//app.use(cors());
app.use(express.json());
const SECRET = process.env.SECRET;
// const secret = 'secret123';

// Database connect
// Connect to mongodb
const URI = process.env.MONGODB_URL; //pass to .env file
mongoose.connect(URI, {
    useCreateIndex: true, //comment out due to error
    useFindAndModify: false, //comment out due to error
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb"); //connected to mongo cloudb
})


app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/user', (req, res) => {
  if (!req.cookies.token) {
    return res.json({});
  }
  const payload = jwt.verify(req.cookies.token, SECRET);  
  User.findById(payload.id)
    .then(userInfo => {
      if (!userInfo) {
        return res.json({});
      }
      res.json({id:userInfo._id,email:userInfo.email});
    });
});

app.post('/register', (req, res) => {
  const {email,password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({password:hashedPassword,email});
  user.save().then(userInfo => {
    jwt.sign({id:userInfo._id,email:userInfo.email}, SECRET, (err,token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
      }
    });
  });
});

app.post('/login', (req, res) => {
  const {email,password} = req.body;
  User.findOne({email})
    .then(userInfo => {
      if (!userInfo) {
        return res.sendStatus(401);
      }
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        jwt.sign({id:userInfo._id,email},SECRET, (err,token) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.cookie('token', token).json({id:userInfo._id,email:userInfo.email});
          }
        });
      } else {
        res.sendStatus(401);
      }
    })
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});


//Read Todos
app.get('/todos', (req,res) => {
  const payload = jwt.verify(req.cookies.token, SECRET);  
  Todo.where({user:new mongoose.Types.ObjectId(payload.id)})
    .find((err,todos) => {
      res.json(todos);
    })
});

//update
app.put('/todos', (req, res) => {
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

app.post('/todos', (req,res) => {
  const payload = jwt.verify(req.cookies.token, SECRET);
  Todo.updateOne({
    _id:new mongoose.Types.ObjectId(req.body.id),
    user:new mongoose.Types.ObjectId(payload.id)
  }, {
    done:req.body.done,
  }).then(() => {
    res.sendStatus(200);
  });
});

// Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

//const todos = require("./routes/todos");
//app.use("/todos", todos);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => { //create NodeJS Server
    console.log('Server is running on port', PORT) //listen port 5000 in the backend
})
