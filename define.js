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
			    	//console.log('response is 200');
			    	var resp = "";
			    		if(body.results.length != 0 ){
			    		//	console.log('Before For loop'); 
			    			for(var i=0; i < body.results.length;i++){
			    				if(body.results[i].senses!== undefined && body.results[i].senses[0].definition !== undefined)
			    				var headword = 	body.results[i].headword;
					    		var definition = body.results[i].senses[0].definition.toString();
					        	var partOfSpeech = body.results[i].part_of_speech.toString();
					        	resp += headword + " ("+ partOfSpeech + ") : "+ definition + "\n\n";
			    			}
			    		//console.log('after for loop. Response: '); 	
			        	//console.log(resp);
			        	resp = resp.substring(0,320);
			        	resp = resp.substring(0,resp.lastIndexOf('\n'));
			        	callback(resp);
			        }	        
		        	else{
		        			
		        		callback(undefined);
		        	}

		        	//console.log(body.results);
			    }
			});
		}
	},

	options : function(word, callback){
		var words = []; 
		var url = "http://words.bighugelabs.com/api/2/224ad9d3c9f417f0e317e096a7b2a9be/"+word+"/json";
		// http://words.bighugelabs.com/api/2/224ad9d3c9f417f0e317e096a7b2a9be
		request({
			url:url,
			json: true
		}, function(error, response, body) {
			console.log(error);
			//console.log(response);
			if(!error && response.statusCode === 200) {
				var key = Object.keys(body)[0];
				for(var key2 in body[key])
				{
					var t = body[key];
					words.push(t[key2][0]);
					words.push(t[key2][1]);
				}
				callback(words);
				words = [];
				//console.log(words);
			}

		});
	}
}


/*define.options("flower",function(words){
	console.log(words);
});*/
module.exports= define;