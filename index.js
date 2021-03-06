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

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

var bodyParser = require('body-parser');
app.use(bodyParser());

app.get('/', function(req, res) {
	res.json({message:"Hello World"})
});

app.get('/user/:email', function(req, res) {
	user = db.get("user")
	user.find({email: req.params.email}, {}, function(e, docs){
		if(docs.length>0){
			res.json(docs[0])
		} else {
			user.insert({email: req.params.email}, function(e, docs){
				res.json(docs)
			})
		}
	})
});

app.get('/quiz/', function(req, res) {
	var filter = req.query.type;
	quiz = db.get("quiz")
	if(filter) {
		if(filter == 'live')
		{
			quiz.find({started_at : {$lt : new Date()}}, {}, function(e, docs){
				res.json(docs)
			})
		}
		else
		{
			quiz.find({started_at : {$gt : new Date()}}, {}, function(e, docs){
				res.json(docs)
			})
		}	
	}
});

app.get('/quiz/:quiz_id', function(req, res) {
	question = db.get("question");
	question.find({quiz: ObjectId(req.params.quiz_id)}, {}, function(e, docs){
		res.json(docs)
	})
});

app.post('/point', function(req, res) {
	obj = req.body
	console.log(obj)
	if(!obj || !("user" in obj) || !("question" in obj)|| !("points" in obj))
		res.send("oops")
	obj.user = ObjectId(obj.user)
	obj.question = ObjectId(obj.question)

	var point = db.get("point")
	point.find({user:obj.user, question:obj.question}, {}, function(e, docs){
		if(docs.length==0){
			point.insert(obj,function(e, docs){
				res.json(obj)
			})
		} else {
			point.updateById(docs[0]._id, {$set: {points: obj.points}}, function(e, docs2){
				if (docs2==1){
					res.send("updated")
				} else {
					res.json({})
				}
			})
		}
	})
});

app.get('/user/:user_id/quiz/:quiz_id/point', function(req, res) {
	question = db.get("question")
	question_ids = []
	question.find({quiz: ObjectId(req.params.quiz_id)}, {fields:{_id:1}},function(e, docs){
		docs.forEach(function(obj){
			question_ids.push(ObjectId(obj._id))
		})
		point = db.get("point")
		point.find({question:{$in:question_ids}}, {}, function(e, docs){
			res.json(docs)
		})
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
  })
})
