/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, play;
init();


document.querySelector(".btn-roll").addEventListener('click', function() {
  if (play) {
    document.querySelector(".dice").style.display = 'block';
    var dice = Math.floor(Math.random() * 6 ) + 1
    document.querySelector(".dice").src = "dice-" + dice + ".png";

    if (dice !== 1 ) {
      roundScore+= dice;
      document.querySelector("#current-"+activePlayer).textContent = roundScore;
    } else {
      changePlayer();

    }
  }

});
//When hold is pressed, current score goes to total score and active player is switched
document.querySelector(".btn-hold").addEventListener('click', function() {
  if (play) {
    score[activePlayer] += roundScore
    document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
  //Check if player won
    if (score[activePlayer] >= 10) {
      document.getElementById('name-' + activePlayer).textContent = "WINNER";
      document.querySelector(".dice").style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      play = false;
    } else {
      changePlayer();
    }
  }
});

function changePlayer() {
  roundScore = 0;
  document.querySelector("#current-"+activePlayer).textContent = roundScore;
  activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

}
function init() {
  document.querySelector(".dice").style.display = 'none';
  play = true;
  score = [0,0];
  activePlayer = 0;
  roundScore = 0;

  for (var i = 0; i <= 1; i++) {
    document.querySelector("#score-" + i).textContent = '0';
    document.querySelector("#current-" + i).textContent = '0';
    document.querySelector("#name-" + i).textContent = 'Player '+ i;
    document.querySelector('.player-' + i + '-panel').classList.remove('active');
    document.querySelector('.player-' + i + '-panel').classList.remove('winner');
  }
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}
document.querySelector(".btn-new").addEventListener('click', init);
