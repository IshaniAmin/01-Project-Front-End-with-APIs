$(document).ready(function(){  

// Initialize Firebase
//-------------------------------------------------------------------------------------------
var config = {
   apiKey: "AIzaSyARm7xKPSKNRunk49DwplrL7Sb3mA0wTa4",
   authDomain: "project-01-front-end-wit-39454.firebaseapp.com",
   databaseURL: "https://project-01-front-end-wit-39454.firebaseio.com",
   storageBucket: "project-01-front-end-wit-39454.appspot.com",
   messagingSenderId: "780675474319"
};
firebase.initializeApp(config);
//-------------------------------------------------------------------------------------------

  //Variables
  //Get a reference to the database service
//-------------------------------------------------------------------------------------------
  var database = firebase.database();
//-------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------
database.ref('/users').on("value", function(data){

  $(".list-group-item").on("click", function(event) {

    $("#cardTitle1").empty();
    $("#email").empty();
    $("#position").empty();
    $("#interests").empty();
    $("#favSpot").empty();
    $("#addSongs").empty();
    $("#addEvents").html("No Events");

    var currentKey = $(this).attr("data-key");
//-------------------------------------------------------------------------------------------
    database.ref('users/' + currentKey).on('value', function(data) {
      // console.log(currentKey);
      $("#cardTitle1").append("Name: " + data.val().user_name);
      $("#email").append("Email: " + data.val().user_email);
      $("#position").append("Position: " + data.val().user_position);
      $("#interests").append("Interest: " + data.val().user_interest);
      $("#favSpot").append("Favorite Spot: " + data.val().user_fav_spot);



     for (var i=0; i < data.val().user_fav_songs.length; i++) {
                keysong = data.val().user_fav_songs[i];
                var ref = database.ref("songs/"+ keysong);
                ref.on("value",function(snapshot) {
                  // console.log(snapshot.val().song_name);
                  $("#addSongs").append(snapshot.val().song_name + " by " + snapshot.val().song_artist + "<br>");

//Ticketmaster API
//-------------------------------------------------------------------------------------------
                  console.log(snapshot.val().song_artist);
                  var artistInput = snapshot.val().song_artist;

                  var queryURL = "http://app.ticketmaster.com/discovery/v1/events.json?keyword="+ artistInput +"&apikey=zyleKSfADiALla0NEoeit7ieP42ITTfA&callback=myFunction"

                  $.ajax({
                    url: queryURL,
                    method: "GET"
                  }).done(function(response) {

                    var div = $("<div>");

                    for (var i = 0; i < response._embedded.events.length; i++) {
                      var event = response._embedded.events[i].name;
                      var city = response._embedded.events[i]._embedded.venue[0].city.name;
                      var state = response._embedded.events[i]._embedded.venue[0].state.stateCode;
                      div.append(i+1 + ". " + 
                        "<a href='http://www.ticketmaster.com" + response._embedded.events[i]._embedded.attractions[0].url + "'>" + event + " in " + city + ", " + state + "</a>" + "<br>");
                    }

                    $("#addEvents").html("<p>Upcoming performances:</p>");

                    $("#addEvents").append(div);

                  });

                });
              }
//-------------------------------------------------------------------------------------------

    });//end database.ref('users/')

    database.ref('songs/').on('value', function(data){
      // console.log(data.val().song_name);

    })
  });

//-------------------------------------------------------------------------------------------

}); //ends the "database.ref('/users').on("value", function(data)"


// Puts users' names into buttons dynamically
//-------------------------------------------------------------------------------------------
database.ref('/users').on("child_added", function(childSnapshot) {

  $("#list").append("<button id='listButtons' type='button' class='list-group-item' data-key=" + childSnapshot.key + ">" + childSnapshot.val().user_name + "</button>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
//-------------------------------------------------------------------------------------------

    


});//End document ready function