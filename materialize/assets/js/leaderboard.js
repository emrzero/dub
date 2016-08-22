// database.ref("/leaderboard").update({eliot: 209});

var players = {
  eliot: 789,
  john: 367,
  george: 431,
  victor: 213
}

var sorted = [];


db.ref('/players').update(players);

var playersRef = db.ref('/players');

playersRef.orderByValue().on('value', function(snapshot){
  var snapLength = Object.keys(snapshot).length;
  console.log(snapLength);
  snapshot.forEach(function(childSnap){
    var pname = childSnap.key;
    var score = childSnap.val()
    sorted.splice(snapLength, 0, { [pname] : score });
    snapLength--;
  });
});