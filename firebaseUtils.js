exports = module.exports;



exports.FireBase = {

		hello : function(){ console.log('hi');},
		insertWordInFireBase : function(ref,id,word){
			var data;
			var bool = false;	
			ref.child('IDs').child(id).child('words').on('value',function(snap){
				data= snap.val();
				for(var key in data){
					if(data[key] === word){
						bool = true;
						break;
					}

				}

				if(!bool){
					callbackInsert(ref,id,word);
				}
				
			});


				
		},

		callbackInsert : function(ref,id,word){
			var wordRef = ref.child('IDs').child(id).child('words').push();
			wordRef.set(word.toLowerCase());
		},

		insertRandom : function(ref){

			id = Math.random();
			var randomRef = ref.push();
			ref.set(id);
			return id;
		},

		getWords : function(database,id,callback){
			
			var ref2 = database.ref().child('IDs').child(id).child('words');
			console.log(ref2);
			ref2.on('value', function(snapshot) {
				var ss = snapshot.val();
				var array = [];
				//console.log('In Value: '+snapshot.val());
				for(var key in ss){
					array.push(ss[key]);
				}
				int randomIndex = Math.random() * array.length();
				if(randomIndex >= array.length())
					randomIndex --;
				callback(array[randomIndex]);				
			});

		}
}


