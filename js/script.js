// BUSINESS LOGIC
function pigDice(p1,p2) {
	this.player1 = p1;
	this.player2 = p2
  }
  pigDice.prototype.userToStart = 1;
  pigDice.prototype.userPlaying = 1;
  pigDice.prototype.roundScore = 0;
  pigDice.prototype.finalScore = 100;
  pigDice.prototype.globalScore1 = 0;
  pigDice.prototype.globalScore2 = 0;
  pigDice.prototype.rollDice =  function() {
	var dice = Math.floor(Math.random() * 6) + 1;
	
	if(dice !== 1) {
	  this.roundScore+=dice;
	  $(".roundScoreDisplay" + this.userPlaying).text(this.roundScore);
	  $("#dice-display").show();
	  $("#dice-display").text(dice);
	} else {
	  alert("Oh no you got a 1");
	  this.otherPlayer();
	  $("#dice-display").text(""); 
	}
  }
  pigDice.prototype.hold = function(){ 
	$("#dice-display").hide();
	if(this.userPlaying === 1) {
	  this.globalScore1+=this.roundScore;
	  $(".globalScoreDisplay1").text(this.globalScore1);
	} else {
	  this.globalScore2+=this.roundScore;
	  $(".globalScoreDisplay2").text(this.globalScore2);
	}
	this.winner();
  }
  pigDice.prototype.winner = function() {
	if(this.globalScore1 >= this.finalScore || this.globalScore2 >= this.finalScore) {
	  $("#announcer").text("Game Over")
	  $(".user" + this.userPlaying + "Win").html("<span class='winner'>Winner!!</span");
	  if(this.userPlaying === 1) {
		$("#game-board h5").text("Winner: " + this.player1);
	  } else {
		$("#game-board h5").text("Winner: " + this.player2);
	  } 
	  $("#rematch").show();
	  this.roundScore = 0;
	  $(".roundScoreDisplay1").text(this.roundScore);
	  $(".roundScoreDisplay2").text(this.roundScore);
	  $(".player-roll").attr("disabled",true);
	  $(".player-hold").attr("disabled",true);
	} else {
	  this.otherPlayer();
	}
  }
  pigDice.prototype.otherPlayer = function() {
	$(".roundScoreDisplay" + this.userPlaying).text(0);
	if(this.userPlaying === 1) {
	  $("#user1").addClass("notPlaying");
	  $("#user2").removeClass("notPlaying");
	  $("#game-board h5").text("Current Player: " + this.player2);
	  this.userPlaying = 2;
	} else {
	  $("#user2").addClass("notPlaying");
	  $("#user1").removeClass("notPlaying");
	  $("#game-board h5").text("Current Player: " + this.player1);
	  this.userPlaying = 1;
	}
	this.roundScore = 0;
  }
  pigDice.prototype.newGame  = function() {
	this.roundScore = 0;
	this.globalScore1 = 0;
	this.globalScore2 = 0;
	$(".roundScoreDisplay1").text(this.roundScore);
	$(".roundScoreDisplay2").text(this.roundScore);
	$(".globalScoreDisplay1").text(this.globalScore1);
	$(".globalScoreDisplay2").text(this.globalScore2);
	$(".player-roll").attr("disabled",false);
	$(".player-hold").attr("disabled",false);
	$(".user1Win").text(this.player1);
	$(".user2Win").text(this.player2);
	this.userPlaying = 1;
	$("#announcer").text("Game On!")
  }
  pigDice.prototype.initial = function() {
	$("#game-board h5").text("Current Player: " + this.player1);
	$(".user1Win").text(this.player1);
	$(".user2Win").text(this.player2);
	$("#user1").removeClass("notPlaying");
	$("#user2").addClass("notPlaying");
	$("#rematch").hide();
  }
  
  // USER INTERFACE LOGIC
  $(document).ready(function() {
	$("#description h4").click(function() {
	  $(".gameplay").slideToggle();
	})
	$("#playBtn").click(function(event) {
	  var playerOne = $("#player1").val().toUpperCase();
	  var playerTwo = $("#player2").val().toUpperCase();
	  $("#description").hide();
	  $("#game").show();
	  event.preventDefault();
	  game = new pigDice(playerOne,playerTwo);
	  $("#settings").hide();
	  $("#game").show();
	  game.initial();
	})
	$("#starter").click(function(event) {
	})
	$(".player-roll").click(function() {
	  game.rollDice(); 
	})
	$(".player-hold").click(function() {
	  game.hold();
	})
	$("#reset").click(function() {
	  location.reload();
	})
	$("#rematch").click(function() {
	  game.initial();
	  game.newGame();
	})
  })
  