const express = require('express');
const app = express();

const http = require('http').Server(app);
const cors = require('cors');

const router = require('./routes/index.js');

var session = require('express-session');


app.use(express.urlencoded());

// use sessions to secure app
app.use(session(
  { 
    secret: "SECRET KEY!",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: false
    },
}))

// use CORS to allow cross-origin requests and restrict the type of HTTP methods
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true

  }
));


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use('/api', (req, res, next) => {
    next();
  }, router);


/* Run the server */
// app.listen(8080);
http.listen(3000);
console.log('Server running on port 3000. Now open http://localhost:3000/ in your browser!');

