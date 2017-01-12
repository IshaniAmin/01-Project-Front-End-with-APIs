var user_name = "";
var user_email = "";
var user_position = "";
var user_profile_picture = "";
var user_interest = ""; 
var user_fav_spot = "";
var user_fav_songs = []; 

var song_id = "";
var song_name = "";
var song_url = "";
var song_picture = "";

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

// Capture Button Click
$("#submit-playlist").on("click", function(event) {
	
	event.preventDefault();
	name = $("#profile-name").val().trim();
	email = $("#profile-email").val().trim();
	position = $("#profile-position").val().trim();
	interest = $("#profile-interests").val().trim();
	fav_spot = $("#profile-fav-spot").val().trim();

	for (var k=0; k < songList.length; k++) {

		var fav_song = songList[k];
		user_fav_songs.push(fav_song);

	}
	
	


	// Code for the push
	database.ref('users/').push({
			user_name : name,
			user_email : email,
			user_position : position,
			// user_profile_picture : profile,
			user_interest : interest, 
			user_fav_spot: fav_spot,
			user_fav_songs: user_fav_songs,
			    
	  	dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});


var index;
var songList = [];

$(document).ready( function() {

	function renderSongs(event) {

		$(".table #displayList").empty();

		for (var j=0; j < songList.length; j++) {

		var songDiv = $("<tr class='playlistSong'>");

		var newAdd = songList[j]

		songDiv.append("<td>" + newAdd + "</td>");
		// var newAdd = $("<iframe class='song'>").attr("src", songList[j]).attr("frameborder", 0).attr("allowtransparency", true);

		$(".table #displayList").prepend(songDiv);

		}

	}

	// Function to Display Spotify API Results
	function displayResults(event) {

		event.preventDefault();
		var q = $("#query").val().trim();
		var queryUrl = "https://api.spotify.com/v1/search?type=track,artist&market=US&limit=5";
		console.log(q)

		queryUrl += '&' + $.param({
			'q': q,
		})

		$.ajax({

        	url: queryUrl,
        	method: 'GET'

        })
        .done(function(response) {

        	console.log(response);
        	var data = response.tracks

        	for(var i = 0; i < data.items.length; i++) {
        	var tracks = $("<tr id='track'>");

        		var songName = "<br>" + data.items[i].name + "<br>";	

        		var albumArt = data.items[i].album.images[0].url;

        		var image = $("<img class='img-rounded' width='150px' height='150px'>").attr("src", albumArt);
        		var p = $("<p class='songInfo'>")
        		p = songName;

        		var uri = data.items[i].uri;

        		// var trackUri = "https://embed.spotify.com/?uri=" + uri; 

        		var preview = data.items[i].preview_url;

        		var playButton = $("<iframe class='preview'>").attr("src", preview).attr("frameborder", 1).attr("allowtransparency", true);

        		var playlistAdd = $("<button type='button' class='add'>").text("Add To Playlist");

        		tracks.append("<td class='col-md-2'>" + songName + "</td>");
        		tracks.append(image);
        		tracks.append("<td class='col-md-5'>" + playButton);
        		tracks.append(playlistAdd);

        		// $(".song").on("load", function preventAutoPlay(event) {
        		// 	event.preventDefault();
        		// 	audio.pause()
        		// })

        		$(".table #searchResults").append(tracks);
        	}


        // function playPreview(snd) {
        // 	audio = new Audio(snd)
        // 	audio.play();
        // }

        // function pausePreview(snd) {
        // 	audio.pause();
        // }

        // $(".img").on("click", function() {


        //  	var index = ($(this).index('.img'));

        //  	var preview = "";
        //  	preview = data.items[index].preview_url;

        //  	playPreview(preview);

	       //   	if(preview =! "") {
	       //   		$(".img").on("click", ".img", pausePreview)
	       //   	}


	   // Playlist Add Button
		$(".add").on("click", function () {

				index = ($(this).index('.add'));
				console.log(index)
				id = data.items[index].id;
				url = data.items[index].external_urls.spotify;
				name = data.items[index].name;
				
				picture = data.items[index].album.images[0].url;
				     	
				// Code for the push
				database.ref('songs/').push({
					song_id: id,
					song_name: name,
					song_url: url,
					song_picture: picture
				})

				var trackName = data.items[index].name;
				console.log(trackName);
				songList.push(trackName);
	     		renderSongs();
				
			});	
       })
    }
 
// Exceutes the Function to Display Results from Spotify API
$(document).on("click", "#search", displayResults);

 $("#clr").on("click", function(event) {
        event.preventDefault();
       $("#search-form")[0].reset();
        $("#searchResults").empty();
  });	

});