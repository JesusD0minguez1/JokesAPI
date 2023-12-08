const express = require("express");
const pug = require("pug");
const path = require("path")
const routes = require("./routes/routes.js");

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");
app.use(express.static(path.join(__dirname,'/public')));

const urlencodedParser = express.urlencoded({
    extended: false
});

app.get('/create', routes.createJokeForm);
app.post('/create',urlencodedParser,routes.createJoke);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/api', routes.api);

app.listen(3000);