exports = module.exports;



exports.FireBase = {

		hello : function(){ console.log('hi');},
		insertWordInFireBase : function(ref,id,word){
			var data;
			var bool = false;	
			var wordRef = ref.child('IDs').child(id).child('words').push();
			wordRef.set(word.toLowerCase());				
		},

		insertRandom : function(ref){

			id = Math.random();
			var randomRef = ref.push();
			ref.set(id);
			return id;
		},

		getWords : function(ref,id,meaning,callback){
			
			var ref2 = ref.child('IDs').child(id).child('words');
			console.log(ref2);
			ref2.on('value', function(snapshot) {
				var ss = snapshot.val();
				var array = [];
				//console.log('In Value: '+snapshot.val());
				for(var key in ss){
					array.push(ss[key]);
				}
				
				callback(array);				
			});

		}
}


