$(document).ready(function(){      	

  // Initialize Firebase
	var config = {
		 apiKey: "AIzaSyARm7xKPSKNRunk49DwplrL7Sb3mA0wTa4",
		 authDomain: "project-01-front-end-wit-39454.firebaseapp.com",
		 databaseURL: "https://project-01-front-end-wit-39454.firebaseio.com",
		 storageBucket: "project-01-front-end-wit-39454.appspot.com",
		 messagingSenderId: "780675474319"
	};
	firebase.initializeApp(config);

	//Variables
	//Get a reference to the database service
	var database = firebase.database();
    // Firebase watcher + initial loader 
    database.ref('/users').on("child_added", function(childSnapshot) {
 
      // $('.collection').append('<a href="#" class="collection-item" data-key="'+childSnapshot.key+'"></a>'+childSnapshot.val().user_name)

		console.log(childSnapshot.val().user_name);
      console.log("Data" + childSnapshot.key);
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().email);
      console.log(childSnapshot.val().position);
      console.log(childSnapshot.val().interest);
      console.log(childSnapshot.val().favorite_spot);

      // full list of items to the well
      // $("#full-user-list").append
      // ("<div class='card'><span class='card-title'> " + childSnapshot.val().name +
      //   " </span><span id='email'> " + childSnapshot.val().email +
      //   " </span><span id='age'> " + childSnapshot.val().age +
      //   " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
});//End document ready function
