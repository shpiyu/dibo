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
	        //console.log(body) // Print the json response
	        	let meaning = body.results[0].senses[0].definition.toString();
	        	//console.log('in define:'+meaning );
	        	return meaning;
	        
	    }

	})

}

module.exports={define:define}