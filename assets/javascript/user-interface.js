

$('#game-area').fadeOut(1);

var nickname;

$('#submit').on('click', function(){
  nickname = $('#nickname').val();
  $('.jumbotron').remove();
  $('#game-area').fadeIn(500);

  $('#userName').text(nickname);
  $('#userHP').text(1000);

});

//Submit name on ENTER
$(document).ready(function(){

  $("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit").click();
    }
  });

});


characters.splic(computerguess, 1);

var characters = {
  blackwidow : {
    team: avengers
  },

  thor : {
    team: avengers
  }

}

charactersChosen = []

for (key in characters) {
  charactersChosen.push(key);
}

console.log(charactersChosen);