const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Controllers
const postsController = require('./controllers/postsController');
const albumsController = require('./controllers/albumsController');
const todosController = require('./controllers/todosController');

// View engine
app.set("view engine", "ejs");

// Files static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.render('index');
});

app.use("/", postsController);
app.use("/", albumsController);
app.use("/", todosController);

// Server
app.listen(8080, (error) => {
    if (error) {
        console.log("Error when starding the server! :(");
        console.log(error);
    }
    else{
        console.log("Server started successfully! :)");
    }
})