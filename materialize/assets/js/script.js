// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmrX91JJuF622wDzsKchjw6ObaBdC0nLs",
  authDomain: "dub-marvel.firebaseapp.com",
  databaseURL: "https://dub-marvel.firebaseio.com",
  storageBucket: "dub-marvel.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

//-----------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------//

//Characters
var characters = {
    thor: {
      Origin: 'Asgard',
      Archnemesis: 'Loki',
      Power: 'Mjolnir',
      Alias: 'Thor Odinson',
      Actor: 'Chris Hemsworth'
    },
    ironman: {
      Origin: 'Long Island',
      Archnemesis: 'Obadiah Stone',
      Power: 'Powered Armor Suit',
      Alias: 'Tony Stark',
      Actor: 'Robert Downey Jr.'
    },
    captainamerica: {
      Origin: 'Manhattan',
      Archnemesis: 'Baron Zemo',
      Power: 'Vibranium-Steel Alloy Shield',
      Alias: 'Steve Rodgers',
      Actor: 'Chris Evans'
    },
    blackwidow: {
      Origin: 'Stalingrad',
      Archnemesis: 'Black Lotus',
      Power: 'Widow\'s Bite',
      Alias: 'Natasha Romanova',
      Actor: 'Scarlett Johansson'
    },
    spiderman: {
      Origin: 'Queens',
      Archnemesis: 'Doctor Octopus',
      Power: 'Spider-Sense',
      Alias: 'Peter Parker',
      Actor: 'Andrew Garfield'
    },
  };

  var charactersHint = {
    thor: {
      Movie: 'Last Movie: 2013'
    },
    ironman: {
      Movie: 'Last Movie: 2013'
    },
    captainamerica: {
      Movie: 'Last Movie: 2016'
    },
    spiderman: {
      Movie: 'Last Movie: 2014'
    },
    blackwidow: {
      Movie: 'Last Movie: None'
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
  var oneHint = [];

  function gameInitialize() {


    questionScore = 5;

    var answer = "";

    var number = Math.floor(Math.random()*charactersChosen.length);
    computerNumber = number;
    var computerGuess = charactersChosen[number];
    console.log(computerGuess);
    callbackParam = charactersChosen[number];

    for (key in characters[computerGuess]){
      charHints.push(key + " : "+ characters[computerGuess][key]);
    }

    for (key in charactersHint[computerGuess]){
      oneHint.push(charactersHint[computerGuess][key]);
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

    if (charactersLeft == 5) {
      $('#firstHint').text("");
    } else {
      $('#firstHint').text(oneHint[0]);
    };
  };

//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//

var game = {
  playerName: "",
  hp: 15
}


$('#questionContainer').hide();
$('#charOptions').hide();
$('#hintsContainer').hide();
$('#leaderBoardContainer').hide();
$('#mainLeaderBoardContainer').detach();
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
    $('#leaderBoardContainer').show('slow');
  }, 6000);

  setTimeout(function(){
    $('#firstHint').text(oneHint[0]).show('slow');
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
      $('#action').html("You cannot take anymore hints or you will run out of HP!").show('slow');
      return false;
    } else if (hintCounter >= 5) {
      $('#action').html("You cannot take anymore hints! You must guess a character.").show('slow');
      return false;
    }
    else {
      hintCounter++;
      $('#hints').append(newBlock).show('slow');
      game.hp--;
      $('#hp').text(game.hp);
    }
});

$(document).on('click', '.character', function(){

  var userGuess = $(this).attr('id');

  if (userGuess == callbackParam) {
    $('#action').html("Correct!").show('slow');
    game.hp += 2;
    $('#hp').text(game.hp);

    correctGif();

    charactersGame.splice(computerNumber, 1);
    charactersChosen.splice(computerNumber, 1);
    if (charactersLeft > 1) {
      charactersLeft--;
      $('#charactersCorrect').html("Characters Remaining: " + charactersLeft);
      reset();
    } else {
      $('#action').html("Congratulations! Your final score is: " + game.hp).show('slow');

      $('#leaderBoardContainer').show();
      var lb = $('#mainLeaderBoardContainer').show();

      var playerName = game.playerName;
      var score = game.hp;
      // console.log('hp', game.hp);
      // console.log('name', playerName);
      // console.log(database.ref());

      database.ref(playerName).update({
        playerName : playerName,
        score : score,
        scoreInverse : -score
      });

      // $('#leaderboardTable > tbody').empty();
      // $('#leaderBoard').empty();

      database.ref().orderByChild('scoreInverse').on('child_added', function(snapshot){
        


        var playerName = snapshot.val().playerName;
        var score = snapshot.val().score;
          console.log('name', playerName);
          console.log('score', score);


        $('#leaderboardTable > tbody').append(
          '<tr><td>' + playerName + '</td><td>' + score + '</td></tr>'
        );

        $('#leaderBoard').append(
          '<li>' + playerName + ': </li><li>' + score + '</li>'
        );

      });
      location.reload();
    } 
  }

    else {
    $('#action').html("Wrong! Guess again").show('slow');
    game.hp--;
    $('#hp').text(game.hp);
  }
       
});

function reset() {
  hintCounter = 0;
  questionScore = 5;
  charHints = [];
  oneHint = [];
  $('#hints').empty();
  $('#firstHint').text(oneHint[0]).show('slow');
  gameInitialize();
};

function correctGif(){

  var celebration = "celebration";
  var limitCount = charactersLeft;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebration + "&api_key=dc6zaTOxFJmzC&limit=5";

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {

    var results = response.data[charactersLeft];
    console.log(response);

    var celebrationDiv = $('<div>');

    var celebrationGif = $('<img>');
    celebrationGif.attr('src', results.images.fixed_height.url);
    celebrationGif.addClass('resultGif');

    celebrationDiv.append(celebrationGif);
      
    $('#hints').prepend(celebrationDiv);
  });
};

database.ref().orderByChild('scoreInverse').on('child_added', function(snapshot){
  
  $('#leaderBoardContainer > tbody').empty();
  // $('#leaderBoard').empty()
  $('#leaderBoardContainer').show();
  var lb = $('#mainLeaderBoardContainer').show();

  var playerName = snapshot.val().playerName;
  var score = snapshot.val().score;

  $('#leaderboardTable > tbody').append(
    '<tr><td>' + playerName + '</td><td>' + score + '</td></tr>'
  );

  $('#leaderBoard').append(
    '<li> ' + playerName + ': </li><li>' + score + '</li>'
  );

});

//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------//

gameInitialize();