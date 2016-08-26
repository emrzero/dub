//Marvel API

var MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function GG(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function HH(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function II(a,b,c,d,x,s,ac) {
           a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
           return AddUnsigned(RotateLeft(a, s), b);
   };

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";

           for (var n = 0; n < string.length; n++) {

                   var c = string.charCodeAt(n);

                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   }
                   else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }
                   else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;

   string = Utf8Encode(string);

   x = ConvertToWordArray(string);

   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);
      }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

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

        // Game media feedback: audio clip sound effect - by Kent
    // var audio = new Audio('https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90');
    // var audio = new Audio(src = 'assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3');
    
    // characterClips = [
    //   thor = ['assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3', 'assets/media/thor-This-drink-I-like-it-I-know-Its-great-right-Another!.mp3'],
    //   captainamerica = ['assets/media/captainamerica-I-can-do-this-all-day.mp3',
    //   'assets/media/captainamerica-You-and-me-we-stay-here-on-the-ground.mp3'],
    //   ironman = ['assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3', 'assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3'],
    //   spiderman = ['assets/media/spiderman-Im-just-Peter-Parker.mp3', 'assets/media/spiderman-Im-SpiderMan.mp3'],
    //   blackwidow = ['assets/media/blackwidow-You-really-think-Im-pretty.mp3', 'assets/media/blackwidow-You-really-think-Im-pretty.mp3']
    // ];

    var randomAudio = Math.floor(Math.random() * 2);

    if (callbackParam == 'thor') {

      console.log('callbackParam', callbackParam)
      // console.log('character index:', computerNumber)
      // console.log('characterClips', characterClips[number])

    // randomize number 0 to 2 as corresponding with index numbers
    
    //   console.log('randomAudio:', randomAudio)

    // the source is conditional on characterGame index number and then randomAudio index number
    // var audio = new Audio(src = characterClips[number][randomAudio]);
    var thor = ['assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3', 'assets/media/thor-This-drink-I-like-it-I-know-Its-great-right-Another!.mp3'];

    var audio = new Audio(src = thor[randomAudio]);
      // console.log('audio index:', computerNumber)
      
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
      $('#leaderBoard').empty();

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
      restart();
    };
  }
    else {
    $('#action').html("Wrong! Guess again").show('slow');
    game.hp--;
    $('#hp').text(game.hp);

    var randomAudio = Math.floor(Math.random() * 3);
      
    var wrongPick = ['assets/media/wrong-And-no-offense-but-youre-wrong-Im-wrong-about-what.mp3', 'assets/media/wrong-No-Uhuh-Uhuh-Uh.mp3', 'assets/media/wrong-Oh-God-Im-sorry-Thats-just-not-the-answer-we-were-looking-for.mp3'];

    var audio = new Audio(src = wrongPick[randomAudio]);      
    audio.play();

  }
       
});

function restart(){
  alert("here");
  $('.modal-trigger').leanModal();
  $('#name').focus();
  $('#submit').on('click', function(){
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
  var limitCount = charactersLeft;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebration + "&api_key=dc6zaTOxFJmzC&limit=5";

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
      
// <<<<<<< HEAD
    // $('#hints').prepend(celebrationDiv);

// =======
    $('#gifs').append(celebrationGif);
// >>>>>>> 89f38c956942b162a5cb4ebec4aa3972c4a3388c

    // // Game media feedback: audio clip sound effect - by Kent
    // // var audio = new Audio('https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90');
    // // var audio = new Audio(src = 'assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3');
    
    // characterClips = [
    //   thor = ['assets/media/thor-Its-unwise-to-be-in-my-company-right-now-Brother.mp3', 'assets/media/thor-This-drink-I-like-it-I-know-Its-great-right-Another!.mp3'],
    //   captainamerica = ['assets/media/captainamerica-I-can-do-this-all-day.mp3',
    //   'assets/media/captainamerica-You-and-me-we-stay-here-on-the-ground.mp3'],
    //   ironman = ['assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3', 'assets/media/ironman-Im-just-not-the-hero-type-Clearly.mp3'],
    //   spiderman = ['assets/media/spiderman-Im-just-Peter-Parker.mp3', 'assets/media/spiderman-Im-SpiderMan.mp3'],
    //   blackwidow = ['assets/media/blackwidow-You-really-think-Im-pretty.mp3', 'assets/media/blackwidow-You-really-think-Im-pretty.mp3']
    // ];
    //   console.log('audioClips', characterClips[computerNumber])

    // // randomize number 0 to 2 as corresponding with index numbers
    // randomAudio = Math.floor(Math.random() * 2);
    //   console.log('randomAudio', randomAudio)

    // // the source is conditional on characterGame index number and then randomAudio index number
    // var audio = new Audio(src = characterClips[computerNumber][randomAudio]);
    //   console.log('audio', audio)
      


    //   audio.play();
  });
};

function correctAnswer() {
  var unix = Math.round(+new Date()/1000);
  console.log(unix);

  var publicAPIkey = "5664cba2d0357c1f7e1a63f962247a76";
  var privateAPIkey = "0624d293385e3f5fdfbef056afdcb2eced4303f9";

  var h = MD5(unix + privateAPIkey + publicAPIkey);

  var apiURL = 'http://gateway.marvel.com:80/v1/public/characters';
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

    