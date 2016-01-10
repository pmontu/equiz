var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

var mongodb = require('mongodb');
var monk = require('monk');
var url = process.env.MONGOLAB_URI || 'localhost:27017/equiz'
var db = monk(url);
var ObjectId = mongodb.ObjectID;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(express.static(__dirname + "/"))

app.get('/', function(req, res) {
	res.json({message:"Hello World"})
});

app.get('/users/:email', function(req, res) {
	user = db.get("user")
	user.find({email: req.params.email}, {}, function(e, docs){
		if(docs.length>0){
			res.json(docs[0])
		}
		res.json({})
	})
});

app.get('/quiz', function(req, res) {
	quiz = db.get("quiz")
	quiz.find({}, {}, function(e, docs){
		res.json(docs)
	})
});

app.get('/quiz/:quiz_id', function(req, res) {
	question = db.get("questions")
	// quiz: ObjectId(req.params.quiz_id)
	question.find({}, {}, function(e, docs){
		res.json(docs)
	})
});

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
