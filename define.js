'use strict'
var request = require("request")

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

let word;
var define = { 

	define : function (word,callback){

		if(isASCII()){

			var url = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword="+word;
			request({
			    url: url,
			    json: true
			}, function (error, response, body) {

			    if (!error && response.statusCode === 200) {
			    	var resp = "";
			    		if(body.results.length != 0 ){
			    			console.log('Before For loop'); 
			    			for(var i=0; i < body.results.length;i++){
			    				if(body.results[i].senses!== undefined && body.results[i].senses[0].definition !== undefined)
			    				var headword = 	body.results[i].headword;
					    		var definition = body.results[i].senses[0].definition.toString();
					        	var partOfSpeech = body.results[i].part_of_speech.toString();
					        	resp += (i+1) + headword + " ("+ partOfSpeech + ") "+ definition + "\n";
			    			}
			    		console.log('after for loop. Response: '); 	
			        	console.log(resp);
			        	callback(resp);
			        }	        
		        	else{
		        			
		        		callback(undefined);
		        	}

		        	console.log(body.results);
			    }
			});
		}
	}

	// new fn
}

module.exports= define;