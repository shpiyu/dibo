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
		}

}


