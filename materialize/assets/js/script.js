

//-----------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------//


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmrX91JJuF622wDzsKchjw6ObaBdC0nLs",
  authDomain: "dub-marvel.firebaseapp.com",
  databaseURL: "https://dub-marvel.firebaseio.com",
  storageBucket: "dub-marvel.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// // kent testing firebase
// database.ref().set({
//   playerName : 'Kent',
//   score : 15,
//   scoreInverse : -15
// });

var characters = {
    thor: {
      Team: 'Avengers',
      Origin: 'Asgard',
      Archnemesis: 'Loki',
      Power: 'Mjolnir',
      Alias: 'Thor Odinson'
    },
    ironman: {
      Team: 'Avengers',
      Origin: 'Long Island',
      Archnemesis: 'Obadiah Stone',
      Power: 'Powered Armor Suit',
      Alias: 'Tony Stark'
    },
    captainamerica: {
      Team: 'Avengers',
      Origin: 'Manhattan',
      Archnemesis: 'Baron Zemo',
      Power: 'Vibranium-Steel Alloy Shield',
      Alias: 'Steve Rodgers'
    },
    blackwidow: {
      Team: 'Avengers',
      Origin: 'Stalingrad',
      Archnemesis: 'Black Lotus',
      Power: 'Widow\'s Bite',
      Alias: 'Natasha Romanova'
    },
    spiderman: {
      Team: 'Avengers',
      Origin: 'Queens',
      Archnemesis: 'Doctor Octopus',
      Power: 'Spider-Sense',
      Alias: 'Peter Parker'
    },
  };

  var playerScore = 0;
  var charactersGame = ['thor', 'captainamerica', 'ironman', 'spiderman', 'blackwidow'];
  var charactersChosen = ["thor", "captainamerica", "ironman", "spiderman", "blackwidow"];
  var hintCounter = 0;
  var charHints = [];
  var questionScore;
  var callbackParam;
  var hintguess;
  var computerNumber;
  var computerGuess;
  var number;
  var charactersLeft = 5;

  function gameInitialize() {


    questionScore = 5;

    var answer = "";
    //var thor = false;
    //var ironman = false;
    //var captainamerica = false;
    //var wolverine = false;
    //var spiderman = false;

    var number = Math.floor(Math.random()*charactersChosen.length);
    computerNumber = number;
    var computerGuess = charactersChosen[number];
    console.log(computerGuess);
    callbackParam = charactersChosen[number];

    for (key in characters[computerGuess]){
      charHints.push(key + " : "+ characters[computerGuess][key]);
    }
    //console.log(characters.computerGuess.Team);

    // var unix = Math.round(+new Date()/1000);
    // console.log(unix);

    // var publicAPIkey = "5664cba2d0357c1f7e1a63f962247a76";
    // var privateAPIkey = "0624d293385e3f5fdfbef056afdcb2eced4303f9";

    // var h = MD5(unix + privateAPIkey + publicAPIkey);

    // var apiURL = 'http://gateway.marvel.com:80/v1/public/characters';
    // var apiKey = '5664cba2d0357c1f7e1a63f962247a76';
    // var callbackParam = charactersChosen[number];
    // var timeStamp = Date.now();

    // var queryURL = apiURL + "?ts=" + unix + "&apikey=" + publicAPIkey + "&hash=" + h + "&name=" + callbackParam;
    // console.log(queryURL);

    // $.ajax({
    //   url: queryURL,
    //   method: 'GET'
    // })
    // .done(function(response) {

      //console.log(response.data.results[0].name);
      // console.log(response);

      // var thumbnail = response.data.results[0].thumbnail.path
      // var path = response.data.results[0].thumbnail.extension
      // console.log(thumbnail + "." + path)
      //$('#here').append("<img src=" + thumbnail + "." + path + " height=" + "200" +  " width=" + "200" + " id=" + "character" + ">");
      //$('#here').append("Question " + (pos+1) + " of " + characters.length);

      answer = characters[computerGuess];
      // $('#here').html("Guess the character that has meets the following criteria: ");
      // $('#hintText').html("<div>" + charHints[hintCounter] + "</div>");
      // $('#playerScore').html("Current Score: " + playerScore);
      // $('#questionScore').html("This question is worth: " + questionScore);

    // });
  };

//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//

var game = {
  playerName: "",
  hp: 15
};


$('#questionContainer').hide();
$('#charOptions').hide();
$('#hintsContainer').hide();
$('#leaderBoardContainer').hide();
var lb = $('#mainLeaderBoardContainer').hide();
$('.modal-trigger').leanModal(); //Initialize jQuery for Modal


$('#begin').on('click', function(){
  $('.modal-trigger').leanModal();
  $('#name').focus();
});

$('#submit').on('click', function(){
  $('#wolverine').fadeOut(1000);
  $('#welcome').fadeOut(1000, function(){
    $('#questionContainer').show('slow');
  });
  game.playerName = $('#name').val();
  $('#playerName').text(game.playerName);
  $('#hp').text(game.hp);
  // setTimeout($('#questionContainer').show('slow'), 10000);
  setTimeout(function(){
    $('#instructions').hide('left slow');
  }, 5000);

  setTimeout(function(){
    $('#charOptions').show('slow');
  }, 6000);

  setTimeout(function(){
    // $('#leaderBoardContainer').show('slow');
    // $('#mainLeaderBoardContainer').show('slow');
    $('#hintsContainer').append(lb);
  }, 6000);
});
// function begin(){
//   alert("let's begin");
// }
$('#wolverine').hide();
setTimeout(function(){
  $('#wolverine').show('slow');
}, 1000);

// setTimeout($('#wolverine').toggle('right'), 2000);

// $(document).ready.on('click', '#begin', function(){
//   console.log('success!');
// });

$("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
});

$(document).on('click','#getHints', function(){
  $('#hintsContainer').show('slow');
    // var newLi = $('<li>');
    // newLi.addClass('collection-item');
    var newBlock = $('<blockquote>');
    newBlock.text(charHints[hintCounter]);
    // newLi.append(newBlock);
    if (game.hp == 1) {
      alert("You cannot take anymore hints or you will run out of HP!");
      return false;
    } else if (hintCounter >= 5) {
      alert("You cannot take anymore hints! You must guess a character.");
      return false;
    }
    else {
      hintCounter++;
      $('#hints').append(newBlock).show('slow');
      game.hp--;
      //$('#questionScore').html("This question is worth: " + questionScore);
      $('#hp').text(game.hp);
    }
});

$(document).on('click', '.character', function(){
// $('.character').on('click', function() {
  var userGuess = $(this).attr('id');

  if (userGuess == callbackParam) {
    alert("Correct!")
    
    game.hp += 10;
    $('#hp').text(game.hp);
    // $('#playerScore').html("Current Score: " + playerScore);
    charactersGame.splice(computerNumber, 1);
    charactersChosen.splice(computerNumber, 1);
    if (charactersLeft > 1) {
      charactersLeft--;
      $('#charactersCorrect').html("Characters Remaining: " + charactersLeft);
      reset();
    } else {
      $('#hints').html("Congratulations! Your final score is: " + game.hp).show('slow');
      // $('#hintText').html("<div>Your final score is: " + playerScore + "</div>");
      // $('#playerScore').html("");
      // $('#questionScore').html("");
      // location.reload();
      // charactersGame.splice(computerNumber, 1);
      // charactersChosen.splice(computerNumber, 1);
      // console.log("characters Game: " + charactersGame);
      // console.log("characters Chosen: " + charactersChosen);

      var playerName = game.playerName;
      var score = game.hp;
      // console.log('hp', game.hp);
      // console.log('name', playerName);
      // console.log(database.ref());

      database.ref(playerName).set({
        playerName : playerName,
        score : score,
        scoreInverse : -score
      });

      $('#leaderboardTable > tbody').empty();

      database.ref().orderByChild('scoreInverse').on('child_added', function(childSnapshot, prevChildKey){
        
        var playerName = childSnapshot.val().playerName;
        var score = childSnapshot.val().score;

        $('#leaderboardTable > tbody').append(
          '<tr><td>' + playerName + '</td><td>' + score + '</td></tr>'
        );

      });

    }
    

  }

    else {
      alert("Wrong!");
    game.hp--;
    // hint();
  }



        //   if (characters.length = 0) {
        //     alert("No more characters");
        //     return false;
        //   } else {
        //     charactersChosen.splice(computerGuess, 1);
        //     charactersGame.splice(number, 1);
        //     reset();
        //   }
          // reset();


        
});

function reset() {
  hintCounter = 0;
  questionScore = 5;
  charHints = [];
  $('#hints').empty();
  //number = Math.floor(Math.random()*charactersGame.length);
  //computerNumber = number;
  //computerGuess = charactersGame[number];
  //answer = "";
  /*console.log(computerGuess);
  for (key in characters[computerGuess]){
    charHints.push(key + " : "+ characters[computerGuess][key]);
  }
  console.log(charHints);
  var callbackParam = charactersChosen[number];
  queryURL = apiURL + "?ts=" + unix + "&apikey=" + publicAPIkey + "&hash=" + h + "&name=" + callbackParam;
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {
    $('#here').html("Guess the character that has meets the following criteria: ");
    $('#here').append("<div>" + characters[computerGuess][hintCounter] + "</div>");
  });*/
  gameInitialize();
};



//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//

gameInitialize();