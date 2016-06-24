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
	    		if(body.results!== undefined && body.results[0].senses!== undefined && body.results[0].senses[0].definition !== undefined){
	        	var definition = body.results[0].senses[0].definition.toString();
	        	var partOfSpeech = body.results[0].part_of_speech.toString();
	        	var resp = "("+ partOfSpeech + ") "+ definition ;
	        	//console.log(resp);
	        	callback(resp);
	        }
        	else{
        		callback("No meaning found");
        		//console.log("No meaning found");
        	}
        	//callback(resp);
	        
	    }

	})

}

//define('anna');

module.exports={define:define}