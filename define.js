'use strict'
var request = require("request")

let word;
var define = function define(word,callback){

	var url = "http://api.pearson.com/v2/dictionaries/entries?headword="+word;


	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        	
	        	var resp = "("+ body.results[0].part_of_speech.toString() + ") "+ body.results[0].senses[0].definition.toString() ;
	        	//console.log(resp);
	        	callback(resp);
	        
	    }

	})

}

//define('flower');

module.exports={define:define}