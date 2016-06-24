exports = module.exports;



exports.FireBase = {

		
		hello : function(){ console.log('hi');},

		insertWordInFireBase : function(ref,id,word){
			var wordRef = ref.child('IDs').child(id).child('words').push();
			wordRef.set(word);
		},

		insertRandom : function(ref){
			id = Math.random();
			var randomRef = ref.push();
			ref.set(id);
			return id;
		},

		getWords : function(database,id){
			
			var ref2 = database.ref().child('IDs').child(id).child('words');
			console.log(ref2);
			ref2.on('value', function(snapshot) {
				var ss = snapshot.val();
				//console.log('In Value: '+snapshot.val());
				for(var key in ss){
					console.log(ss[key]);
				}
			});

		}
}


