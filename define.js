'use strict'
var request = require("request")

let word;
var define = function define(word,callback){

	var url = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword="+word;


	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	var resp = "";
	    		if(body.results !== undefined || body.results.length == 0 ){
	    			for(var i=0; i < body.results.length;i++){
	    				if(body.results[i].senses!== undefined && body.results[i].senses[0].definition !== undefined)
	    				var headword = 	body.results[i].headword;
			    		var definition = body.results[i].senses[0].definition.toString();
			        	var partOfSpeech = body.results[i].part_of_speech.toString();
			        	resp += (i+1) + headword + " ("+ partOfSpeech + ") "+ definition + "\n";
	    			}
	        	
	        	callback(resp);
	        }	        
        	else{

        		callback("No meaning found");
        	}
	    }
	})
}

module.exports={define:define}