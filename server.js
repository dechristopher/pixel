const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jade = require('jade');

//const redis = require("redis");
//const db = redis.createClient();

var port = 3000;

app.use(express.static('px'));

/*db.on("error", function (err) {
    console.log('[ERR] Redis: ' + err);
});*/

server.listen(port, function () {
    console.log('[SYS] Pixel μSrvc started.');
	console.log('[SYS] Express server started.');
    /*db.select(1, function () {
        console.log('[SYS] Connected to database');
    });*/
});

app.get('/', function (req, res, next) {
    try {
        res.send(jade.compileFile(__dirname + '/templates/index.jade')({
            title: 'Home',
        }));
        console.log('[APP] GET /');
    } catch (e) {
        next(e);
    }
});

app.get('/dashboard', function (req, res, next) {
    try {
        res.send(jade.compileFile(__dirname + '/templates/dash.jade')({
            title: 'Dashboard',
        }));
        console.log('[APP] GET /dashboard');
    } catch (e) {
        next(e)
    }
});

app.post('/dashboard', function (req, res, next) {
    console.log('[APP] POST /dashboard { ' + req.body.id + ' }');
    res.redirect('/dashboard');
});

app.get('/:id', function (req, res, next) {
    var id = req.params.id;

    console.log('[TRK] GET /pixel.png - ID: ' + id);

    res.send('<img src="pixel.png"></img>');
});
