var players = {
  eliot: 789,
  john: 367,
  george: 431,
  victor: 213, 
  josh: 9483,
  pierre: 273423
}

var sorted = [];

db.ref('/players').update(players);

var playersRef = db.ref('/players');

playersRef.orderByValue().once('value').then(function(snapshot){
  console.log(snapshot.val());
  var snapLength = Object.keys(snapshot.val()).length -1;
  console.log(snapLength);
  snapshot.forEach(function(childSnap){
    var pname = childSnap.key;
    var score = childSnap.val();
    sorted.unshift({ [pname] : score });
  });
});

