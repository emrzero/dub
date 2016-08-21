
var game = {
  playerName: "",
  hp: 100
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