
// express sever to host the website
const express = require('express')
const app = express()
var path = require("path");
var data = '';


//Rive Script for NLP
//var RiveScript = require("RiveScript");
var RiveScript = require('./rivescript.min.js');
var bot;

function loadingDone(files) {
    console.log("ok");
    bot.sortReplies();
    console.log("Reply from bot:" +bot.reply("local-user", data));
}

function loadingError(files, error) {
    console.log("error");
}

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile("index.html", { root: path.join(__dirname, 'public') }))

app.post("/speech-to-text", function (req, res) {
    //console.log(req)
    req.on("data",function(chunk){
        data = chunk.toString();
        console.log("data from user: "+data);
        bot = new RiveScript({utf8: true});
    bot.loadFile("rives/start.rive", loadingDone, loadingError);
    });
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))
