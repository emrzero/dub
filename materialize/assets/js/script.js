// Initialize Firebase
var config = {
  apiKey: "AIzaSyBmrX91JJuF622wDzsKchjw6ObaBdC0nLs",
  authDomain: "dub-marvel.firebaseapp.com",
  databaseURL: "https://dub-marvel.firebaseio.com",
  storageBucket: "dub-marvel.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();



var game = {
  playerName: "",
  hp: 100
}


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
    newBlock.text("Here's a hint!");
    // newLi.append(newBlock);
    $('#hints').append(newBlock).show('slow');
});


// leaderboard code from Kent
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


// function showLeaderboard(){

//   var lb = $('#mainLeaderBoardContainer').show();
//   $('#leaderBoardContainer').show();
  
//   var playerName = game.playerName;
//   var score = game.hp;

//   database.ref(playerName).update({
//     playerName : playerName,
//     score : score,
//     scoreInverse : -score
//   });

//   // $('#leaderboardTable > tbody').empty();

//   database.ref().orderByChild('scoreInverse').on('child_added', function(childSnapshot, prevChildKey){
    
//     var playerName = childSnapshot.val().playerName;
//     var score = childSnapshot.val().score;

//     $('#leaderboardTable > tbody').append(
//       '<tr><td>' + playerName + '</td><td>' + score + '</td></tr>'
//     );

//   });

//   // return false;
  
//   };

  // showLeaderboard();


  // This is just a button to wipe firebase clean
  // $('#deleteall1').on('click', function(){
  //   database.ref().remove();

  //   return false;
  // });