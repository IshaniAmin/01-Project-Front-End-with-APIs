$(document).ready(function() {
jQuery.noConflict()
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

	// database.ref('/songs').con("value", function () {



	// })

	// Firebase watcher + initial loader 
    database.ref('/songs').on("child_added", function(childSnapshot) {
      // $('.collection').append('<a href="#" class="collection-item" data-key="'+childSnapshot.key+'"></a>'+childSnapshot.val().user_name)

    
      console.log("Data" + childSnapshot.key);
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().song_id);
      console.log(childSnapshot.val().song_name);
      console.log(childSnapshot.val().song_picture);
      console.log(childSnapshot.val().song_url);




    // var trackUri = "https://embed.spotify.com/?uri=spotify:track:" + childSnapshot.val().song_id; 
    // console.log(trackUri);

      // $("#list").append("<button type='button' class='list-group-item' data-key=" + childSnapshot.key + ">" + childSnapshot.val().song_name + "</button>");
      // $("#list").append("<img  width='300px' height='300px' class='img-rounded' data-key=" + childSnapshot.key + " src=" + childSnapshot.val().song_picture + ">");
      // $("#list").append("<iframe height='150px'data-key=" + childSnapshot.key + " src=" + trackUri + ">")
      var url = childSnapshot.val().song_url;

      new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
		}, [ 
			{
			title: childSnapshot.val().song_name,
			artist: childSnapshot.val().song_artist,
			m4a: url
			},
		], {
			// playlistOptions: {
   //          loopOnPrevious: true
   //      },
		swfPath: "../../jPlayer/dist/jplayer/jquery.jplayer.swf",
		supplied: "m4a",
		// loop: true,
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		});

     

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
});
