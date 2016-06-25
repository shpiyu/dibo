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
			    	console.log('response is 200');
			    	var resp = "";
			    		if(body.results.length != 0 ){
			    			console.log('Before For loop'); 
			    			for(var i=0; i < body.results.length;i++){
			    				if(body.results[i].senses!== undefined && body.results[i].senses[0].definition !== undefined)
			    				var headword = 	body.results[i].headword;
					    		var definition = body.results[i].senses[0].definition.toString();
					        	var partOfSpeech = body.results[i].part_of_speech.toString();
					        	resp += headword + " ("+ partOfSpeech + ") : "+ definition + "\n\n";
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
	},

	options : function(word, callback){
		var words = []; 
		var url = "http://words.bighugelabs.com/api/2/bb3bce84dabc99e28f8f748276fba24b/"+word+"/json";
		request({
			url:url,
			json: true
		}, function(error, response, body) {
			console.log(error);
			//console.log(response);
			if(!error && response.statusCode === 200) {
				for(var x in body){
					if(words.length <= 2){
						for(var y in body[x]){
							if(words.length !=2)
								words.push(body[x][y]);
							else
								break;
						}
					}
				}
				//callback(words);
				console.log(words);
			}

		});
	}
}


define.options("delight",function(words){
	console.log(words);
});
module.exports= define;