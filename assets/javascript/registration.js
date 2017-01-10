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

// Capture Button Click
$("#submit-playlist").on("click", function(event) {
	//change the id tags - use all your inputs
	event.preventDefault();
	name = $("#profile-name").val().trim();
	email = $("#profile-email").val().trim();
	position = $("#profile-position").val().trim();
	interest = $("#profile-interests").val().trim();
	fav_spot = $("#profile-fav-spot").val().trim();


	// Code for the push
	database.ref('users/').push({
			user_name : name,
			user_email : email,
			user_position : position,
			// user_profile_picture : profile,
			user_interest : interest, 
			user_fav_spot: fav_spot,
			// user_fav_songs: songs,    
	  	dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

	// database.ref('songs/').push({
	// 	song_id: id,
	// 	song_name: name,
	// 	song_url: url,
	// 	song_picture: picture

	// })
});

$(document).ready( function() {

	var songList = [];

	function renderSongs(event) {

		$(".table tbody").empty();

		for (var j=0; j < songList.length; j++) {
		var songDiv = $("<tr class='item'>");

		var newAdd = $("<iframe class='song'>").attr("src", songList[j]).attr("frameborder", 0).attr("allowtransparency", true);

		songDiv.append(newAdd);

		$(".table tbody").prepend(songDiv);

		}

	}

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
        	var data = response.tracks;

        	var tracks = $("<div>");

        	for(var i = 0; i < data.items.length; i++) {

        		var name = "<br>" + data.items[i].name + "<br>";	

        		var albumArt = data.items[i].album.images[0].url;

        		var image = $("<img class='img'>").attr("src", albumArt);
        		var p = $("<p class='songInfo'>")
        		p = name;

        		var uri = data.items[i].uri;

        		// var trackUri = "https://embed.spotify.com/?uri=" + uri; 

        		var preview = data.items[i].preview_url;

        		var playButton = $("<iframe class='preview'>").attr("src", preview).attr("frameborder", 1).attr("allowtransparency", true);

        		var playlistAdd = $("<button class='add'>").text("Add To Playlist");

        		tracks.append(name);
        		tracks.append(image);
        		tracks.append(playButton);
        		tracks.append(playlistAdd);

        		// $(".song").on("load", function preventAutoPlay(event) {
        		// 	event.preventDefault();
        		// 	audio.pause()
        		// })

        		$("#results").prepend(tracks);
        	}


        function playPreview(snd) {
        	audio = new Audio(snd)
        	audio.play();
        }

        function pausePreview(snd) {
        	audio.pause();
        }

        // $(".img").on("click", function() {


        //  	var index = ($(this).index('.img'));

        //  	var preview = "";
        //  	preview = data.items[index].preview_url;

        //  	playPreview(preview);

	       //   	if(preview =! "") {
	       //   		$(".img").on("click", ".img", pausePreview)
	       //   	}

	     $(".add").on("click", function (event) {
	     	event.preventDefault();

	     	var index = ($(this).index('.add'));

	     	var uri = data.items[index].uri;

	     	var track = "https://embed.spotify.com/?uri=" + uri;
	     	songList.push(track);
	     	renderSongs();
	     	$("form")[0].reset();
	     	$("#results").empty();

	     	})

        })
     }
 
	$(document).on("click", ".btn", displayResults);		
});