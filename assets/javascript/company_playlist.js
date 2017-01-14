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
    database.ref('/songs').on("value", function(data) {

    
      // console.log("Data" + childSnapshot.key);
      // console.log(childSnapshot.val());
      // console.log(childSnapshot.val().song_id);
      // console.log(childSnapshot.val().song_name);
      // console.log(childSnapshot.val().song_picture);
      // console.log(childSnapshot.val().song_url);

    $('.list-group-item').on('click', function(event){

    $("#jquery_jplayer_1").jPlayer("destroy");

    var currentKey = $(this).attr("data-key");
    console.log(currentKey);
//-------------------------------------------------------------------------------------------
    database.ref('songs/' + currentKey).on('value', function(data) {
    	
    	var m4a = data.val().song_url;
    	var title = data.val().song_name;
    	var artist = data.val().song_artist;
    	
    	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
		}, [ 
			{
			title: title,
			artist: artist,
			m4a: m4a
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
    	})
    })

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

	// Puts songs' into buttons dynamically
    database.ref('/songs').on("child_added", function(childSnapshot) {
 
    var url = childSnapshot.val().song_url;
    var track = childSnapshot.val().song_name;
    var artist = childSnapshot.val().song_artist;
    	$("#song-list").append("<button type='button' class='list-group-item' data-key=" + childSnapshot.key + " data-url=" + url + " data-artist=" + artist + " data-name=" + track + " style='background-color: transparent;'>" + track + " by: " + artist + "</button>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});