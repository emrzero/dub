//Marvel API


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
      Movie: 'Last Titular Movie: 2013'
    },
    ironman: {
      Movie: 'Last Titular Movie: 2013'
    },
    captainamerica: {
      Movie: 'Last Titular Movie: 2016'
    },
    spiderman: {
      Movie: 'Last Titular Movie: 2014'
    },
    blackwidow: {
      Movie: 'Last Titular Movie: None'
    },
  };

  var playerScore = 0;
  var charactersGame = ['thor', 'captain america', 'iron man', 'spider-man', 'black widow'];
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
  var marvelapi;

  function gameInitialize() {


    questionScore = 5;

    var answer = "";

    number = Math.floor(Math.random()*charactersChosen.length);
    computerNumber = number;
    var computerGuess = charactersChosen[number];
    console.log(computerGuess);
    callbackParam = charactersChosen[number];
    marvelapi = charactersGame[number];
      console.log('number', number)
    for (key in characters[computerGuess]){
      charHints.push(key + " : "+ characters[computerGuess][key]);
    }

    for (key in charactersHint[computerGuess]){
      oneHint.push(charactersHint[computerGuess][key]);
    }
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
var lb = $('#mainLeaderBoardContainer').hide();
$('#restartContainer').hide();
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

$('#wolverine').hide();
setTimeout(function(){
  $('#wolverine').show('slow');
}, 1000);



$("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
});

$(document).on('click','#getHints', function(){
  $('#hintsContainer').show('slow');

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


    var randomAudio = Math.floor(Math.random() * 2);

    if (callbackParam == 'thor') {

      console.log('callbackParam', callbackParam)

    var thor = ['assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3', 'assets/media/thor-This-drink-I-like-it-I-know-Its-great-right-Another!.mp3'];

    var audio = new Audio(src = thor[randomAudio]);
      
    audio.play();

    }
    else if (callbackParam == 'captainamerica'){
      var captainamerica = ['assets/media/captainamerica-I-can-do-this-all-day.mp3',
      'assets/media/captainamerica-You-and-me-we-stay-here-on-the-ground.mp3'];
      var audio = new Audio(src = captainamerica[randomAudio]);      
    audio.play();
    }
    else if (callbackParam == 'ironman'){
      ironman = ['assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3', 'assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3'];
      var audio = new Audio(src = ironman[randomAudio]);
    audio.play();
    }
    else if (callbackParam == 'spiderman'){
      spiderman = ['assets/media/spiderman-Im-just-Peter-Parker.mp3', 'assets/media/spiderman-Im-SpiderMan.mp3'];
      var audio = new Audio(src = spiderman[randomAudio]);
    audio.play();
    }
    else if (callbackParam == 'blackwidow'){
      blackwidow = ['assets/media/blackwidow-You-really-think-Im-pretty.mp3', 'assets/media/blackwidow-You-really-think-Im-pretty.mp3'];
      var audio = new Audio(src = blackwidow[randomAudio]);
    audio.play();
    };

    $('#action').show('slow');
    game.hp += 2;
    $('#hp').text(game.hp);

    correctAnswer();
    correctGif();

    charactersGame.splice(computerNumber, 1);
    charactersChosen.splice(computerNumber, 1);
    if (charactersLeft > 1) {
      charactersLeft--;
      $('#charactersCorrect').html("Characters Remaining: " + charactersLeft);
      reset();
    } else {

      $('#leaderBoardContainer').show();

      // var lb = $('#mainLeaderBoardContainer').show();
      $('#leaderBoard').empty();

      var playerName = game.playerName;
      var score = game.hp;

      $('#leaderBoard').append('<li>Leader Board</li>');
      database.ref(playerName).update({
        playerName : playerName,
        score : score,
        scoreInverse : -score
      });

      database.ref().orderByChild('scoreInverse').limitToFirst(5).on('child_added', function(snapshot){
        


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
      restart();
    };
  }
    else {
    $('#action').html("Wrong! Guess again").show('slow');
    game.hp--;
    $('#hp').text(game.hp);
    sadGif();

    var randomAudio = Math.floor(Math.random() * 3);
      
    var wrongPick = ['assets/media/wrong-And-no-offense-but-youre-wrong-Im-wrong-about-what.mp3', 'assets/media/wrong-No-Uhuh-Uhuh-Uh.mp3', 'assets/media/wrong-Oh-God-Im-sorry-Thats-just-not-the-answer-we-were-looking-for.mp3'];

    var audio = new Audio(src = wrongPick[randomAudio]);      
    audio.play();

  }
       
});

function restart(){
  $('#restartContainer').show();
  $('#restart').on('click', function(){
    location.reload();
  });
};

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
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebration + "&api_key=dc6zaTOxFJmzC&limit=5";

  try {
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {

    var results = response.data[charactersLeft];
    console.log(response);

    var celebrationGif = $('<img>');
    celebrationGif.attr('src', results.images.fixed_height.url);
    celebrationGif.addClass('resultGif');
      
    $('#gifs').html(celebrationGif);
  }) } catch(err) {
      console.log("unable to find character bio. Move on");
  }

};

function sadGif(){

  var sad = "unimpressed";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sad + "&api_key=dc6zaTOxFJmzC&limit=5";

  try {
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {

    var results = response.data[charactersLeft - 1];
    console.log(response);
    var url = results.images.fixed_height.url;
    console.log("url: " + url);

    var sadGif = $('<img>');
    sadGif.attr('src', url);
    sadGif.addClass('resultGif');
      
    $('#gifs').html(sadGif);
  }) } catch (err) {
    console.log("unable to find character bio. Move on");
  }

};

function correctAnswer() {
  var unix = Math.round(+new Date()/1000);
  console.log(unix);

  var publicAPIkey = "5664cba2d0357c1f7e1a63f962247a76";
  var privateAPIkey = "0624d293385e3f5fdfbef056afdcb2eced4303f9";

  var h = MD5(unix + privateAPIkey + publicAPIkey);

  var apiURL = 'https://gateway.marvel.com:80/v1/public/characters';
  var apiKey = '5664cba2d0357c1f7e1a63f962247a76';
  var timeStamp = Date.now();

  var queryURL = apiURL + "?ts=" + unix + "&apikey=" + publicAPIkey + "&hash=" + h + "&name=" + marvelapi;
  console.log(queryURL);
  try{
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      $('#action').html("Correct! " + response.data.results[0].description);
    }) } catch(err) {
      console.log("unable to find character bio. Move on");
  }
};
$('#leaderBoard').empty()
$('#leaderBoard').append('<li>Leader Board</li>');
database.ref().orderByChild('scoreInverse').limitToFirst(5).on('child_added', function(snapshot){
  
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

    