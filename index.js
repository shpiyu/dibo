'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const define = require('./define')
const app = express()
const fb = require('./firebaseUtils')
const Firebase = require('firebase');
const token = "EAAELYU6ZCatYBAF59Dy2ZCb1KQ7gCEUcFxUw8GzBWcTVlSj80HV3hJqx4xHCj4Fg1ROoRXOnRZBBUhCjCl5BZAEgIABVFNNWhdTGPU1ZAAZAvPtEhAZBaFGr4xk12mIjHJ6LT0GIxxu9SOAcm9y3YTnnCunJihwRmHH6BIvUPvesgZDZD"
//questions

const questions = ['Best Match for','Pick a suitable word for'];
const success = ['Awesome, that\'s right :)','Amazing, you\'ve mastered this word :D','Nice one ;)','You\'re getting pro'];
const failure = ['Oops, try again :(', 'No, that\'s not the correct one :<', 'guessing doen\'t work everytime :p try again' ];
var IDs = [];
var WordsPerID = {}

Firebase.initializeApp({
  serviceAccount: {
    project_id: "project-1317554104942910185",
     clientEmail:"project-1317554104942910185@appspot.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGbkXZ2Ro1o/K9\nl5LZSf9BU1RTTE/6AAngQmU3DgKMBnmPgtTDTZjVSaKJ0uXINsvjYMzNLeJ1iaH7\nnrHh1D64xZnNSAdRY9p3ioCnnT4W5kQQokkka35cLlSQE/iCaxcuNa13htq7M5Z+\nmCkABAeYaTiyCvqzdXwiHpWp5/dxAxH8lyTHRHmRCDZ05SZvHgdbTL2cRoF1HAqR\nmbvU/a/5so2ypTzvW8tvT+Buy/3rvTWI7zzk1mMfJj2QxiFhj4oysfPK6aoC4tP+\nGO+UtYTba06EE7TOUOui1MsCnIUuWOoq65Q1kcnllokmlnByQ46mlIn9ZS9PKFZa\nI9CPpTfPAgMBAAECggEAeYr+UMb/8Xu4Hz8KILfMt82VsnKO5ORgCYk+Zhaeque3\nxM9vet2Pz1fyQ1aRNwKEOaLtyJ0x4T99WzjSb/Ise3b9ZiM3qpjzj52EUQfUeXPc\nGoYAR5OA/etNva6ww4n7vWX+3tDottUfvnnoqAD8tQp9nkxa+yLAB0FL5AC9MklV\nbvNCj9h1GKZb0SBX0/1kiaOZ0Lz+wTsG9baSvjPJncFCoRwvsKPxcaLyZfpl6EZE\nOhvhOacYzUHIYQJBDPaKlk6InnucknWUA5bAJZlWtjLsQbMwO5M1jUZxVOOk6om6\nbR7QhcTkv5LL/N0HPyA97UVun65+STAWkwclNO4Y8QKBgQDeKtJED4M2dJCxT3Qu\n7RFPng8zyyZgjvtSgx5VLZYYi3765GJsR5wR2S5+wWmPcBwbrMoVQ/i5GM9FjBbT\ntjBfpiLXvoWIs+6SAQ94y2MJUgLiPzZoDaxt45Ix2v8Eg5NmG5e4u0/7jHE0ub7J\ngDAEIKp6u97NiTSxFnYjBj+EkwKBgQCa5wxbOMh5Hq5nfBcXEAnCo7BkzplRRNuD\npam0c7jQxcfN3R6djNoPx6hXbxkxY8nminI7upRT+EdW2OhtYDLmyNUJCMl0sQa0\nKZgW8z2jwvLG5AMy0XonvB1sTaxxfjv3zJ2QitUjNQm7qqDM0ULK/D5k2LmR6Y8I\nk5bmWXPhVQKBgF4TFdw6EV6ytz5Nna3tNsJW9KsC3+pNQUCsQuDgn8ke8JL+uGqP\nXBf2tgh4j+FsIIrbfOrKUHzYc5RIgLX/VLZ73A8tHtBHGMN8bXfB79rXfl8dU0V2\nXMhfb91qlUftCzJWhsVzk6e5zYn9CTu76xkkV+wGt46jBcvi7f1gvO6/AoGAWvZ0\n/hiROPb4aZKoKIXlhWQEUJ410FCEK4Gb73jJPef21gAUW2Z8IyoWxAlcnPFBfd0t\nCcAeHFU+51QG4TvNiFLFL0H2s0zFaATI6Ck8uC7hzEPXUP9MIYtJJ/FQ43DCnFiO\n6nNsh/k8VvTy6nO0KmkH5saR6oph0SKCSZCcCOUCgYAv3DDR69x+XmG1RsWWMxHt\ntjvIXHD/1lPV5VCNIVjGVIV4wR4wNk5Xst+AMOhyOY08v4SxbRqvF5azjubLS2Qr\ndgCTBambr2836Khkf2brMogggCU8yQYZ7y7NNWxa7MbWCQvv8pezWzjFe9kZYHUy\n+OtYA5YFJk+bXSYmKEqeRA==\n-----END PRIVATE KEY-----\n"
    },
 databaseURL: "https://project-1317554104942910185.firebaseio.com"
});

const database = Firebase.database();
const ref = database.ref();
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('InsertedIDAndWord', function(meaning){
	console.log('--------EventEmitter: '+ meaning)
    userInserted(meaning);

});

function userInserted(meaning){
    console.log('user inserted event');
    console.log('before pop: '+IDs);
    sendQuestionToID(IDs[IDs.length-1],database,meaning);
    console.log('after pop:' +IDs);
}

function sendQuestionToID(id,database,meaning){
	//var i=0;
	//while(i<=300000){
		console.log('before send ques: '+id);
   // 	setTimeout(function(){
    		var arrayT = WordsPerID[id];
    		if(arrayT == undefined || arrayT.length == 0){
    			sendTextMessage(id,"Nothing to search :-|");
    		}
    		else {
    		var text = arrayT[Math.floor((Math.random() * WordsPerID[id].length))];
    		define.define(text,function(){
    		console.log('------------------------------------')
    		console.log(WordsPerID);
    		console.log(id);
            sendGenericMessage(id,text, meaning);	
    		});
    //	},10000);
    	}	
	//}
	//i += 60000;
}


    	

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

Array.prototype.insertUnique = function (value) {
    if(this.indexOf(value) <= -1)
        this.push(value);
}

// Index route
app.get('/', function (req, res) {

            console.log(req.query);
            if(req.query['text'] === 'ask me')
                //quizMode('948868911892281');
                define.define('option 1',function(meaning){
                    //fb.FireBase.insertWordInFireBase(ref,'prasann','stone');
                    console.log(meaning);
                    //IDs.insertUnique('prasann');    
                   //eventEmitter.emit('InsertedIDAndWord');
            });
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
        
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        //check messgage
        if (event.message && event.message.text) {
        	let text = event.message.text
            if(text == "ask"){
                sendQuestionToID(sender,database,undefined);
            }
            else{
                console.log('Making a request'); 
                new define.define(text,function(meaning){
                    if(meaning !== undefined || meaning == "")
                    {
                        console.log('Saving to firebase..');
                        console.log(meaning);  
                        fb.FireBase.insertWordInFireBase(ref,sender,text);
                        fb.FireBase.getWords(ref,sender,text,function(array){
                            WordsPerID[sender] = array;
                            console.log(WordsPerID);
                            eventEmitter.emit('InsertedIDAndWord',meaning);
                        });
                        IDs.insertUnique(sender);
                        console.log(IDs);
                        sendTextMessage(sender,meaning);
                        //sendGenericMessage(sender,fb.FireBase.getWords(), meaning);
                       
                    }
                    else
                        sendTextMessage(sender, 'No meaning found');
                    //console.log(meaning);
                    console.log(sender);
                });
            }
                        
        }
        if(event.postback) {
        	console.log(event.postback['payload']);
        	let ans = event.postback['payload'];
        	//sendTextMessage(sender, "Postback recieved : "+text.substring(0,200), token)
        	if(ans == 'correct'){
        		var corrMsg = success[Math.floor(Math.random()*success.length)];
        		sendTextMessage(sender,corrMsg);
        	}
        	else{
        		var inCorrMsg = failure[Math.floor(Math.random()*failure.length)];
				sendTextMessage(sender,inCorrMsg);
        	
        	}
        	continue
        }
    }
    res.sendStatus(200)
})


function quizMode(id){

    fb.FireBase.getWords(database,id);

}


function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendGenericMessage(sender,text, meaning) {
	var option1,option2;
	var question = meaning.substring(meaning.indexOf(':')+1);

	 define.options(text, function(words){
		option1 = words[0] || "option 1";
		option2 = words[1] || "option 2";
		console.log('Words: '+words);
	

	console.log(option1 + " $$ "+ option2);
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": questions[Math.floor(Math.random()*questions.length)],
                    "subtitle": question.substring(0,question.indexOf('\n')),
                    "image_url": "",
                    "buttons": [{
                        "type": "postback",
                        "title": text,
                        "payload": "correct"
                    }, {
                        "type": "postback",
                        "title": option1,
                        "payload": "incorrect"
                    },{
                        "type": "postback",
                        "title": option2,
                        "payload": "incorrect"
                    }],
                }],
                }
            }
        }

     console.log(messageData);
    
     request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    });
  });
}