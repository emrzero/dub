$('#game-area').fadeOut(1);

var nickname;

$('#submit').on('click', function(){
  nickname = $('#nickname').val();
  $('.jumbotron').remove();
  $('#game-area').fadeIn(500);
  var newHeader = $('<h2>');
  newHeader.html(nickname);
  $('#game-area').prepend(newHeader)
});

