var users = [
	{
		user_name:"Rhyna Silva",
		email:"rhynas@gmail.com",
		position: "Full Stack Web Developer",
		profile_picture:"assets/images/rhynaSilvaPicture.jpg",
		interest:"Angels, Yoga, The Law of Time, Mayans Culture, Mantras",
		favorite_spot:"Home",
		favorite_songs:[1,2],
	},
	{
		user_name:"Ishani Amin",
		email:"ishaniamin@gmail.com",
		position:"Full Stack Web Developer",
		profile_picture:"assets/images/ishaniAminPicture.jpg",
		interest:"",
		favorite_spot:"",
		favorite_songs:[2],
	},
	{
		user_name:"Arron Linton",
		email:"lintonarron@gmail.com",
		position:"Full Stack Web Developer",
		profile_picture:"assets/images/arronLintonPicture.jpg",
		interest:"",
		favorite_spot:"",
		favorite_songs:[1],
	}
];

var songs = [
	{
		song_id: "1",
		song_name: "Todavia te Quiero",
		song_url: "https://open.spotify.com/track/2uthGAtv4a62CMq4kWfeXn",
		song_picture:"https://d3rt1990lpmkn.cloudfront.net/640/baff341635bec603e5d791abe127a34201b0860c"
	},
	{
		song_id: "2",
		song_name: "Te Hubieras ido Antes",
		song_url: "https://open.spotify.com/track/6Xa85yXNGDtBhWQXAo99Ts",
		song_picture: "https://d3rt1990lpmkn.cloudfront.net/640/dc3f66d87f0a0c9a330497dfa82c44d5409163ab"
	}
];


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

	//Insert data in the Database
	function writeUserData(userInfo){
		database.ref('users/').push(userInfo);
	};

	function writeSongData(songInfo){
		database.ref('songs/').push(songInfo);
	};
	//Create database from the array of objects with user information
	//this will change with the user input from the registration Page
	//Setting initial value from our Dropdown list
	$("#add-user-btn").on('click', function(){
		console.log("in");
		for (var i = 0; i < users.length; i++) {
			writeUserData(users[i]);
		}

		for (var i = 0; i < songs.length; i++) {
			writeSongData(songs[i]);
		}

	});



	$('.carousel-item').on('click', function(){
		console.log($(this).attr("data-index"));
	});

	database.ref('/users').on("value", function(data){
		// $('.carousel').append('<a>').attr('data-key', data.key)
		// var db = data.val();
		// console.log("Data" + data.key);
	})


    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref('/users').on("child_added", function(childSnapshot) {
    	// debugger;
      // Log everything that's coming out of snapshot

      $('.collection').append('<a href="#" class="collection-item" data-key="'+childSnapshot.key+'"></a>'+childSnapshot.val().user_name)
      // $('.collection').append('<a href="#" class="collection-item circle avatar" data-key="'+childSnapshot.key+'"><img src="'+childSnapshot.val().profile_picture+'"></a>')
		// $('.carousel').carousel();

		// console.log(childSnapshot.val().user_name);
      // console.log("Data" + childSnapshot.key);
      // console.log(childSnapshot.val());
      // console.log(childSnapshot.val().email);
      // console.log(childSnapshot.val().position);
      // console.log(childSnapshot.val().interest);
      // console.log(childSnapshot.val().favorite_spot);

      // full list of items to the well
      // $("#full-member-list").append
      // ("<div class='well'><span id='name'> " + childSnapshot.val().name +
      //   " </span><span id='email'> " + childSnapshot.val().email +
      //   " </span><span id='age'> " + childSnapshot.val().age +
      //   " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
});//End document ready function