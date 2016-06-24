'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const define = require('./define')
const app = express()
const fb = require('./firebaseUtils')
const Firebase = require('firebase');
const token = "EAAELYU6ZCatYBAF59Dy2ZCb1KQ7gCEUcFxUw8GzBWcTVlSj80HV3hJqx4xHCj4Fg1ROoRXOnRZBBUhCjCl5BZAEgIABVFNNWhdTGPU1ZAAZAvPtEhAZBaFGr4xk12mIjHJ6LT0GIxxu9SOAcm9y3YTnnCunJihwRmHH6BIvUPvesgZDZD"
var IDs = [];

Firebase.initializeApp({
  serviceAccount: {
    project_id: "project-1317554104942910185",
     clientEmail:"project-1317554104942910185@appspot.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCGbkXZ2Ro1o/K9\nl5LZSf9BU1RTTE/6AAngQmU3DgKMBnmPgtTDTZjVSaKJ0uXINsvjYMzNLeJ1iaH7\nnrHh1D64xZnNSAdRY9p3ioCnnT4W5kQQokkka35cLlSQE/iCaxcuNa13htq7M5Z+\nmCkABAeYaTiyCvqzdXwiHpWp5/dxAxH8lyTHRHmRCDZ05SZvHgdbTL2cRoF1HAqR\nmbvU/a/5so2ypTzvW8tvT+Buy/3rvTWI7zzk1mMfJj2QxiFhj4oysfPK6aoC4tP+\nGO+UtYTba06EE7TOUOui1MsCnIUuWOoq65Q1kcnllokmlnByQ46mlIn9ZS9PKFZa\nI9CPpTfPAgMBAAECggEAeYr+UMb/8Xu4Hz8KILfMt82VsnKO5ORgCYk+Zhaeque3\nxM9vet2Pz1fyQ1aRNwKEOaLtyJ0x4T99WzjSb/Ise3b9ZiM3qpjzj52EUQfUeXPc\nGoYAR5OA/etNva6ww4n7vWX+3tDottUfvnnoqAD8tQp9nkxa+yLAB0FL5AC9MklV\nbvNCj9h1GKZb0SBX0/1kiaOZ0Lz+wTsG9baSvjPJncFCoRwvsKPxcaLyZfpl6EZE\nOhvhOacYzUHIYQJBDPaKlk6InnucknWUA5bAJZlWtjLsQbMwO5M1jUZxVOOk6om6\nbR7QhcTkv5LL/N0HPyA97UVun65+STAWkwclNO4Y8QKBgQDeKtJED4M2dJCxT3Qu\n7RFPng8zyyZgjvtSgx5VLZYYi3765GJsR5wR2S5+wWmPcBwbrMoVQ/i5GM9FjBbT\ntjBfpiLXvoWIs+6SAQ94y2MJUgLiPzZoDaxt45Ix2v8Eg5NmG5e4u0/7jHE0ub7J\ngDAEIKp6u97NiTSxFnYjBj+EkwKBgQCa5wxbOMh5Hq5nfBcXEAnCo7BkzplRRNuD\npam0c7jQxcfN3R6djNoPx6hXbxkxY8nminI7upRT+EdW2OhtYDLmyNUJCMl0sQa0\nKZgW8z2jwvLG5AMy0XonvB1sTaxxfjv3zJ2QitUjNQm7qqDM0ULK/D5k2LmR6Y8I\nk5bmWXPhVQKBgF4TFdw6EV6ytz5Nna3tNsJW9KsC3+pNQUCsQuDgn8ke8JL+uGqP\nXBf2tgh4j+FsIIrbfOrKUHzYc5RIgLX/VLZ73A8tHtBHGMN8bXfB79rXfl8dU0V2\nXMhfb91qlUftCzJWhsVzk6e5zYn9CTu76xkkV+wGt46jBcvi7f1gvO6/AoGAWvZ0\n/hiROPb4aZKoKIXlhWQEUJ410FCEK4Gb73jJPef21gAUW2Z8IyoWxAlcnPFBfd0t\nCcAeHFU+51QG4TvNiFLFL0H2s0zFaATI6Ck8uC7hzEPXUP9MIYtJJ/FQ43DCnFiO\n6nNsh/k8VvTy6nO0KmkH5saR6oph0SKCSZCcCOUCgYAv3DDR69x+XmG1RsWWMxHt\ntjvIXHD/1lPV5VCNIVjGVIV4wR4wNk5Xst+AMOhyOY08v4SxbRqvF5azjubLS2Qr\ndgCTBambr2836Khkf2brMogggCU8yQYZ7y7NNWxa7MbWCQvv8pezWzjFe9kZYHUy\n+OtYA5YFJk+bXSYmKEqeRA==\n-----END PRIVATE KEY-----\n"
    },
 databaseURL: "https://project-1317554104942910185.firebaseio.com"

});

const ref = Firebase.database().ref();
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('MessageRecieved', function(){

    userInserted();

});

function userInserted(){
    console.log('user inserted event');
    console.log(IDs);
}



app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {

                define.define('stone',function(meaning){
                    fb.FireBase.insertWordInFireBase(ref,'prasann','stone');
                    IDs.push('prasann');
                    //sendTextMessage(sender,meaning);
                   eventEmitter.emit('MessageRecieved');
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
                     
            define.define(text,function(meaning){
                    fb.FireBase.insertWordInFireBase();
                    IDs.push(sender);
                    sendTextMessage(sender,meaning);
                   // eventEmitter.emit('MessageRecieved');
            });
                        
        }
        if(event.postback) {
        	let text = JSON.stringify(event.postback)
        	sendTextMessage(sender, "Postback recieved : "+text.substring(0,200), token)
        	continue
        }
    }
    res.sendStatus(200)
})



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


function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
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