exports = module.exports;



exports.FireBase = {

		createUser : function(callback,context,ref){

			//var ref = new Firebase("https://project-1317554104942910185.firebaseio.com");
		    ref.authWithOAuthPopup("facebook", function(error, authData) {
		      	if (error) {
		       	 console.log("Login Failed!", error);
		      	} else {
		        	console.log("Authenticated successfully with payload:", authData);

		    	  }
			});

		    callback.call(context);

		},


		hello : function(){ console.log('hi');},

		insertRandom : function(ref){
			id = Math.random();
			var randomRef = ref.push();
			ref.set(id);
			return id;
		}

}


