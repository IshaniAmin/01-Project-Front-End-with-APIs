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

    database.ref('/users').on("value", function(data){

       $(".list-group-item").on("click", function(event) {

          $("#cardTitle1").empty();
          $("#email").empty();
          $("#position").empty();
          $("#interests").empty();
          $("#favSpot").empty();
          $("#addSongs").empty();

          event.preventDefault();
  

          var currentKey = $(this).attr("data-key");
          console.log(currentKey);


      

          database.ref('users/' + currentKey).on('value', function(data) {

                $("#cardTitle1").append("Name: " + data.val().user_name);
                $("#email").append("Email: " + data.val().user_email);
                $("#position").append("Position: " + data.val().user_position);
                $("#interests").append("Interest: " + data.val().user_interest);
                $("#favSpot").append("Favorite Spot: " + data.val().user_fav_spot);
            // if(arron.val()) {
            //   console.log(arron.val());
            // }

          for (var i=0; i < data.val().user_fav_songs.length; i++) {
            
            $("#addSongs").append(data.val().user_fav_songs[i] + "<br>");
          }


          });




      });
  
  })




    // Firebase watcher + initial loader 
    database.ref('/users').on("child_added", function(childSnapshot) {
 
      // $('.collection').append('<a href="#" class="collection-item" data-key="'+childSnapshot.key+'"></a>'+childSnapshot.val().user_name)

      // console.log(childSnapshot.val().user_name);
      // console.log("Data" + childSnapshot.key);
      // console.log(childSnapshot.val());
      // console.log(childSnapshot.val().user_email);
      // console.log(childSnapshot.val().user_position);
      // console.log(childSnapshot.val().user_interest);
      // console.log(childSnapshot.val().user_fav_spot);








      $("#list").append("<button type='button' class='list-group-item' data-key=" + childSnapshot.key + ">" + childSnapshot.val().user_name + "</button>");
      // $("#list").append("<button type='button' class='list-group-item'>" + childSnapshot.key + "</button>");



     
      

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    


});//End document ready function
