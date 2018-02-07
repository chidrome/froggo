//HTML/CSS BASIC MANIPULATION
//appends an "active" class to .info and .info-content when the "Open" button is clicked
$("#infoButton").on("click", function(){
  $(".info-overlay, .info-content").addClass("active");
});

//removes the "active" class to .info and .info-content when the "Close" button is clicked 
$("#info-close, .info-overlay").on("click", function(){
  $(".info-overlay, .info-content").removeClass("active");
});

//////SPOT FOR IDEAS, DELETE FOR FINAL PRODUCT////
//perhaps to make gator blink / water shimmer / whatever 
//later on in the game, if the current frameRate is divisible
//by 500 equally it'll swap the img block 









//CANVAS MANIPULATION AND CREATION
//make your canvas available in JS 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var contScreen = $('.continue-content, .continue-screen');
var newLevelScreen = $('.next-level-screen, .next-level-content');
var youWonScreen = $('.you-won-screen, .you-won-content');
var gameOverScreen = $('.gameover-screen, .gameover-content');
//height/width of canvas
canvas.width = 200;
canvas.height = 400;

var scoreBoard = $('#score');
var score = 0;
var collision = false;
var gameLost = false;
var gameWin = false;
var levelOne = null;
var levelTwo = null;
var levelThree = null;
var levelOneFrame = 23;
var levelTwoFrame = 18;
var levelThreeFrame = 15;
var withinBounds = true;
var bgAnimator = null;

var goalMetSound = $('#goal-met');
var gatorMouthSound = $('#gatormouth');
var hopSound = $('#hopsound');
var plunkSound = $('#plunk');

//froggo start coordinates
var x = 85;
var y = 370;

//initialized counters
var level = 1;
var lives = 3;
var count = 45;
var countdown = $('#timer');
var timer = null;

//event listeners to start game
var startButton = $('#startButton');

//life icons
var livesArr = [
	{ type: 'life1', imgName: 'life', x: 145, y: 375, width: 25, height: 25},
	{ type: 'life2', imgName: 'life', x: 160, y: 375, width: 25, height: 25},
	{ type: 'life3', imgName: 'life', x: 175, y: 375, width: 25, height: 25}
]

//all safe static tiles to populate for levelOne
var levelOneLilypads = [
	{ type: 'lilypad1', imgName: 'lilypad', x: 40, y: 345, width: 25, height: 25 },
	{ type: 'lilypad2', imgName: 'lilypad', x: 90, y: 345, width: 25, height: 25 },
	{ type: 'lilypad3', imgName: 'lilypad', x: 140, y: 345, width: 25, height: 25 },
	{ type: 'lilypad4', imgName: 'lilypad', x: 65, y: 295, width: 25, height: 25 },
	{ type: 'lilypad5', imgName: 'lilypad', x: 110, y: 295, width: 25, height: 25 },
	{ type: 'lilypad6', imgName: 'lilypad', x: 90, y: 220, width: 25, height: 25 },
	{ type: 'lilypad7', imgName: 'lilypad', x: 65, y: 145, width: 25, height: 25 },
	{ type: 'lilypad8', imgName: 'lilypad', x: 110, y: 145, width: 25, height: 25 },
	{ type: 'lilypad9', imgName: 'lilypad', x: 90, y: 30, width: 25, height: 25 }
];

//all bad boy tiles to populate for levelOne 
var levelOneGators = [
	{ type: 'gator1', imgName: 'gator1', x: 40, y: 220, width: 25, height: 25 },
	{ type: 'gator2', imgName: 'gator1', x: 140, y: 220, width: 25, height: 25 },
	{ type: 'gator3', imgName: 'gator1', x: 40, y: 30, width: 25, height: 25 },
	{ type: 'gator4', imgName: 'gator1', x: 140, y: 30, width: 25, height: 25 }
];

//all logs displayed in levelOne
var levelOneLogs = [
	{ type: 'starter', imgName: 'longLog', x: 240, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog2', imgName: 'longLog', x: 40, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog3', imgName: 'longLog', x: 140, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'log1', imgName: 'log', x: -25, y: 270, width: 25, height: 25, dx: 0.6},
	{ type: 'log2', imgName: 'log', x: 20, y: 270, width: 25, height: 25, dx: 0.6},
	{ type: 'log3', imgName: 'log', x: 65, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'log4', imgName: 'log', x: 110, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'starter', imgName: 'log', x: 150, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'log6', imgName: 'log', x: -50, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log7', imgName: 'log', x: -5, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log8', imgName: 'log', x: 40, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: 85, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log10', imgName: 'log', x: -5, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log12', imgName: 'log', x: 65, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'log13', imgName: 'log', x: -5, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'log15', imgName: 'log', x: 65, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'log16', imgName: 'log', x: -5, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 65, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log19', imgName: 'log', x: 190, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log20', imgName: 'log', x: 130, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log21', imgName: 'log', x: 245, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log22', imgName: 'log', x: 65, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'log23', imgName: 'log', x: 190, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'log24', imgName: 'log', x: 130, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: -5, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'longLog', x: 40, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog5', imgName: 'longLog', x: 140, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'starter', imgName: 'longLog', x: 165, y: 100, width: 50, height: 25, dx: 0.5},
	{ type: 'longLog7', imgName: 'longLog', x: 90, y: 100, width: 50, height: 25, dx: 0.5},
	{ type: 'longLog8', imgName: 'longLog', x: 20, y: 100, width: 50, height: 25, dx: 0.5}
];

//all safe static tiles to populate for levelTwo
var levelTwoLilypads = [
	{ type: 'lilypad1', imgName: 'lilypad', x: 40, y: 345, width: 25, height: 25 },
	{ type: 'lilypad2', imgName: 'lilypad', x: 140, y: 345, width: 25, height: 25 },
	{ type: 'lilypad3', imgName: 'lilypad', x: 65, y: 295, width: 25, height: 25 },
	{ type: 'lilypad4', imgName: 'lilypad', x: 110, y: 295, width: 25, height: 25 },
	{ type: 'lilypad5', imgName: 'lilypad', x: 90, y: 220, width: 25, height: 25 },
	{ type: 'lilypad6', imgName: 'lilypad', x: 110, y: 145, width: 25, height: 25 },
	{ type: 'lilypad7', imgName: 'lilypad', x: 90, y: 30, width: 25, height: 25 }
];

//all bad boy tiles to populate for levelTwo
var levelTwoGators = [
	{ type: 'gator1', imgName: 'gator1', x: 40, y: 220, width: 25, height: 25 },
	{ type: 'gator2', imgName: 'gator1', x: 140, y: 220, width: 25, height: 25 },
	{ type: 'gator3', imgName: 'gator1', x: 40, y: 30, width: 25, height: 25 },
	{ type: 'gator4', imgName: 'gator1', x: 140, y: 30, width: 25, height: 25 },
	{ type: 'gator5', imgName: 'gator1', x: 90, y: 345, width: 25, height: 25 },
	{ type: 'gator6', imgName: 'gator1', x: 65, y: 145, width: 25, height: 25 }
];

//all logs displayed in levelTwo
var levelTwoLogs = [
	{ type: 'starter', imgName: 'longLog', x: 240, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog2', imgName: 'longLog', x: 40, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'log1', imgName: 'log', x: -25, y: 270, width: 25, height: 25, dx: -0.6},
	{ type: 'log2', imgName: 'log', x: 20, y: 270, width: 25, height: 25, dx: -0.6},
	{ type: 'log3', imgName: 'log', x: 65, y: 270, width: 25, height: 25, dx: -0.6 },
	{ type: 'starter', imgName: 'log', x: 110, y: 270, width: 25, height: 25, dx: -0.6 },
	{ type: 'starter', imgName: 'log', x: 150, y: 270, width: 25, height: 25, dx: -0.6 },
	{ type: 'log6', imgName: 'log', x: -50, y: 245, width: 25, height: 25, dx: 0.5 },
	{ type: 'log7', imgName: 'log', x: -5, y: 245, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 85, y: 245, width: 25, height: 25, dx: 0.5 },
	{ type: 'log10', imgName: 'log', x: -5, y: 245, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 245, width: 25, height: 25, dx: 0.5 },
	{ type: 'log12', imgName: 'log', x: 65, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'log15', imgName: 'log', x: 65, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'log16', imgName: 'log', x: -5, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 65, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log19', imgName: 'log', x: 190, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log21', imgName: 'log', x: 245, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log22', imgName: 'log', x: 65, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'log23', imgName: 'log', x: 190, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'log24', imgName: 'log', x: 130, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: -5, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'longLog', x: 40, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog5', imgName: 'longLog', x: 140, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'starter', imgName: 'longLog', x: 165, y: 100, width: 50, height: 25, dx: 0.5},
	{ type: 'longLog7', imgName: 'longLog', x: 90, y: 100, width: 50, height: 25, dx: 0.5}
];

//all safe static tiles to populate for levelThree
var levelThreeLilypads = [
	{ type: 'lilypad1', imgName: 'lilypad', x: 140, y: 345, width: 25, height: 25 },
	{ type: 'lilypad2', imgName: 'lilypad', x: 65, y: 295, width: 25, height: 25 },
	{ type: 'lilypad3', imgName: 'lilypad', x: 90, y: 220, width: 25, height: 25 },
	{ type: 'lilypad4', imgName: 'lilypad', x: 110, y: 145, width: 25, height: 25 },
	{ type: 'lilypad5', imgName: 'lilypad', x: 90, y: 30, width: 25, height: 25 }
];

//all bad boy tiles to populate for levelThree
var levelThreeGators = [
	{ type: 'gator1', imgName: 'gator1', x: 40, y: 220, width: 25, height: 25 },
	{ type: 'gator2', imgName: 'gator1', x: 140, y: 220, width: 25, height: 25 },
	{ type: 'gator3', imgName: 'gator1', x: 40, y: 30, width: 25, height: 25 },
	{ type: 'gator4', imgName: 'gator1', x: 140, y: 30, width: 25, height: 25 },
	{ type: 'gator5', imgName: 'gator1', x: 90, y: 345, width: 25, height: 25 },
	{ type: 'gator6', imgName: 'gator1', x: 40, y: 345, width: 25, height: 25 },
	{ type: 'gator7', imgName: 'gator1', x: 110, y: 295, width: 25, height: 25 }
];

//all logs displayed in levelThree
var levelThreeLogs = [
	{ type: 'starter', imgName: 'longLog', x: 240, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog2', imgName: 'longLog', x: 40, y: 320, width: 50, height: 25, dx: -0.5},
	{ type: 'log1', imgName: 'log', x: -25, y: 270, width: 25, height: 25, dx: 0.6},
	{ type: 'log2', imgName: 'log', x: 20, y: 270, width: 25, height: 25, dx: 0.6},
	{ type: 'log3', imgName: 'log', x: 65, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'starter', imgName: 'log', x: 110, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'starter', imgName: 'log', x: 150, y: 270, width: 25, height: 25, dx: 0.6 },
	{ type: 'log6', imgName: 'log', x: -50, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log7', imgName: 'log', x: -5, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: 85, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 245, width: 25, height: 25, dx: -0.5 },
	{ type: 'log12', imgName: 'log', x: 65, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 170, width: 25, height: 25, dx: 0.5 },
	{ type: 'log15', imgName: 'log', x: 65, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'log16', imgName: 'log', x: -5, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 130, y: 50, width: 25, height: 25, dx: 0.5 },
	{ type: 'starter', imgName: 'log', x: 65, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log19', imgName: 'log', x: 190, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log21', imgName: 'log', x: 245, y: 125, width: 25, height: 25, dx: -0.5 },
	{ type: 'log22', imgName: 'log', x: 65, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'log24', imgName: 'log', x: 130, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'log', x: -5, y: 195, width: 25, height: 25, dx: -0.5 },
	{ type: 'starter', imgName: 'longLog', x: 40, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'longLog5', imgName: 'longLog', x: 140, y: 75, width: 50, height: 25, dx: -0.5},
	{ type: 'starter', imgName: 'longLog', x: 165, y: 100, width: 50, height: 25, dx: 0.5},
	{ type: 'longLog7', imgName: 'longLog', x: 90, y: 100, width: 50, height: 25, dx: 0.5}
];

var timerStart = function() {
  count--;
  if (count <= 0 && lives > 0) {
     clearInterval(timer);
     clearInterval(bgAnimator);
     loseHeart();
  } 
  if (count <= 0 && lives === 0) {
  	clearInterval(timer);
  	clearInterval(bgAnimator);
  	gameOver();
  }
}

//checks to see if froggo is within the game screen bounds
var checkBounds = function() {
	withinBounds = true;
	if (x < -15 || x > 202) {
		withinBounds = false;
		loseHeart();
	}
	if (y > 390) {
		withinBounds = false;
		loseHeart();
	}
}

var gameOver = function() {
	if (level === 1) {
		clearInterval(levelOne);
	} else if (level === 2) {
		clearInterval(levelTwo);
	} else if (level === 3) {
		clearInterval(levelThree);
	}
	clearInterval(timer);
	clearInterval(bgAnimator);
	gameOverScreen.addClass('active');
	$('#gameover-button').on('click', continueGame);
	$('.displayScore').text(score);
	lives = 3;
	level = 1;
}

//distance calculator
var distanceCheck = function(x1, y1, x2, y2) {
	var xDistance = x2/2 - x1/2;
	var yDistance = y2/2 - y1/2;
	var result = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
	return result;
}

//checks to see if froggo is on log, and if so it'll 
//move the froggo coordinates along with it 
var onLog = function(staticObjectsArray) {
	for (var i = 0; i < staticObjectsArray.length; i++) {
		var currentLog = document.getElementById(staticObjectsArray[i].imgName);
		if (distanceCheck(x, y, staticObjectsArray[i].x, staticObjectsArray[i].y) <= 7) {
			x += staticObjectsArray[i].dx;
			return true;
		}
	}
	return false; 
}

var onLilypad = function(staticArray) {
	for (var i = 0; i < staticArray.length; i++) {
		if (distanceCheck(x, y, staticArray[i].x, staticArray[i].y) <= 5) {
			return true;
		}
	}
	return false;
}

var angryWater = function(lilypad, log) {
	if (onLilypad(lilypad) === false && onLog(log) === false && y < 365 && y > 30) {
		loseHeart();
	}
}

//checks to see if froggo is near/on a gator 
//if near, mouth opens.
//if on, loseHeart() 
var nearGator = function(gatorArray) {
	//checks to see if froggo is near gator!
	//if so, display open gator mouth 
	for (var i = 0; i < gatorArray.length; i++) {
		var currentGator = document.getElementById(gatorArray[i].imgName);
		var gatorChomp = document.getElementById('gatorChomp');
		if (distanceCheck(x,y,gatorArray[i].x, gatorArray[i].y) <= 17) {
			ctx.drawImage(gatorChomp, gatorArray[i].x, gatorArray[i].y, 25, 25);
			gatorMouthSound[0].play();
		} else {
			ctx.drawImage(currentGator, gatorArray[i].x, gatorArray[i].y, 25, 25);
		}
		if (distanceCheck(x,y,gatorArray[i].x, gatorArray[i].y) <= 2.5) {
			loseHeart();
		}
	}
}

//checks to see if froggo is over the finish line yet 
//and if so, it checks the level and pushes to the next 
//and does everything to display whatever level 
var checkForGoal = function() {
	if (y < 10 && level === 1) {
		clearInterval(levelOne);
		clearInterval(timer);
		clearInterval(bgAnimator);
		goalMetSound[0].play();
		newLevelScreen.addClass('active');
		level=2;
		$('#next-level-button').on('click', newLevelButton);
		score = score + (count * 10);  
	} else if (y < 10 && level === 2) {
		clearInterval(levelTwo);
		clearInterval(timer);
		clearInterval(bgAnimator);
		goalMetSound[0].play();
		newLevelScreen.addClass('active');
		level=3;
		$('#next-level-button').on('click', newLevelButton);
		score = score + (count * 10); 
	} else if (y < 10 && level === 3) {
		clearInterval(levelThree);
		clearInterval(timer);
		clearInterval(bgAnimator);
		goalMetSound[0].play();
		x=80;
		y=370;
		youWonScreen.addClass('active');
		score = score + (count * 10); 
		$('#reset-game-button').on('click', beginGame);
		$('.displayScore').text(score);
		level=1;
		//display you won! and score/time
	}
}

var newLevelButton = function () {
	if (newLevelScreen.hasClass('active')) {
		newLevelScreen.removeClass('active');
	}

	x = 85;
	y = 370;
	count = 45; 
	if (level===1) {
		levelOne = window.setInterval(gameLoop, levelOneFrame);
	} else if (level===2) {
		levelTwo = window.setInterval(gameLoop, levelTwoFrame);
	} else if (level===3) {
		levelThree = window.setInterval(gameLoop, levelThreeFrame);
	};	
	clearInterval(timer);
	clearInterval(bgAnimator);
	timer = setInterval(timerStart, 1000); //1000 will  run it every 1 second
}

//displays safe static spots to walk on the board
var staticSafe = function(staticSafe) {
	for (var i = 0; i < staticSafe.length; i++) {
		var safeTile = document.getElementById(staticSafe[i].imgName);
		ctx.drawImage(safeTile, staticSafe[i].x, staticSafe[i].y, staticSafe[i].width, staticSafe[i].height);
	}
};

//displays bad boys on the board
var staticBad = function(staticBad) {
	for (var i = 0; i < staticBad.length; i++) {
		var badTile = document.getElementById(staticBad[i].imgName);
		ctx.drawImage(badTile, staticBad[i].x, staticBad[i].y, staticBad[i].width, staticBad[i].height);
	}
};

//this will update the x/y values of each object to the delta x/y each 
//frame so it will animate them at various rates of movement
//if the image goes off the frame, it resets the x value to 
//off the screen respective of what direction it's going
var movingObjects = function(movingObjects) {
	for (var i = 0; i < movingObjects.length; i++) {
		var img = document.getElementById(movingObjects[i].imgName);
		ctx.drawImage(img, movingObjects[i].x, movingObjects[i].y, movingObjects[i].width, movingObjects[i].height);
		movingObjects[i].x += movingObjects[i].dx;
		if (movingObjects[i].x > 202) {
			var tempXL = -25;
			movingObjects[i].x = tempXL;
		} else if (movingObjects[i].x < -25) {
			var tempXR = 202;
			movingObjects[i].x = tempXR; 
		} 
	}
};

//displays the amount of lives left 
//eventually add function to detract from lives global var 
//every time it is necessary 
var lifeDisplay = function(livesArr, lives) {
	for (var i = 0; i < lives; i++) {
		var livesImg = document.getElementById(livesArr[i].imgName);
		ctx.drawImage(livesImg, livesArr[i].x, livesArr[i].y, livesArr[i].width, livesArr[i].height);
	}
}

//removes the continue modal, resets froggo location, resets timer count,
//restarts gameLoop and timer
var continueGame = function() {
	if (contScreen.hasClass('active')){
		contScreen.removeClass('active');
	} 
	if (gameOverScreen.hasClass('active')) {
		gameOverScreen.removeClass('active');
	}
	x = 85;
	y = 370;
	count = 45; 
	if (level===1) {
		levelOne = window.setInterval(gameLoop, levelOneFrame);
	} else if (level===2) {
		levelTwo = window.setInterval(gameLoop, levelTwoFrame);
	} else if (level===3) {
		levelThree = window.setInterval(gameLoop, levelThreeFrame);
	};	
	clearInterval(timer);
	clearInterval(bgAnimator);
	timer = setInterval(timerStart, 1000); //1000 will  run it every 1 second
}

//removes heart and lives-- and restarts the proper level and OR 
//makes gameOver. 
//pops up the continue game modal
var loseHeart = function() {
	if (lives >= 1) {
		if (level===1) {
			clearInterval(levelOne);
			lives--; 
		} else if (level===2) {
			clearInterval(levelTwo);
			lives--; 
		} else if (level===3) {
			clearInterval(levelThree);
			lives--; 
		};

		clearInterval(timer);
		clearInterval(bgAnimator);
		contScreen.addClass('active');
		plunkSound[0].pause();
		plunkSound[0].currentTime = 0;
		plunkSound[0].play();

		$('#continue-button').on('click', continueGame);

	} else if (lives === 0) { 
		gameOver();
	}
	if (score >= 150) {
		score = score - 150;
	} else { 
		score = 0;
	}
}

var bgAnimate = function () {
	if (bgCounter === 1) {
		$('canvas').css('background', "url('./img/froggoBg2.jpg'");
		bgCounter = 2;
	} else if (bgCounter === 2) {
		$('canvas').css('background', "url('./img/froggoBg.jpg'");
		bgCounter = 1;
	}
}

//this adds all the event listeners, focuses onto the canvas
//for a better ux, and determines which level we are on so it 
//displays the right board 
var beginGame = function() {
	count = 45;
	window.addEventListener('keydown', hop);
	canvas.focus();
	clearInterval(bgAnimator);
	bgAnimator = setInterval(bgAnimate, 500);

	if(youWonScreen.hasClass('active')) {
		youWonScreen.removeClass('active');
	}
	
	//if statements to find out what level it is and then
	//displays stuff accordingly 
	if (!levelOne && level===1) {
		levelOne = window.setInterval(gameLoop, levelOneFrame);
	} else if (!levelTwo && level===2) {
		levelTwo = window.setInterval(gameLoop, levelTwoFrame);
	} else if (!levelThree && level===3) {
		levelThree = window.setInterval(gameLoop, levelThreeFrame);
	};
	clearInterval(timer);
	timer = setInterval(timerStart, 1000);
};

//lets the user use the space key rather than clicking 
//the various buttons for a better ux 
var spaceStart = function(e) {
	if(e.keyCode === 32) {
		if (lives === 3 && level === 1){
			beginGame(); 
		} else if (contScreen.hasClass('active')) {
			continueGame();
		} else if (newLevelScreen.hasClass('active')) {
			newLevelButton();
		} 
	}
}
var froggo = document.getElementById('froggo');
//initiates froggo on screen
var froggoDisplay = function () {
	ctx.drawImage(froggo, x, y, 35, 35);
}

//specifics keydown values and how it affects froggo
//they also play hop sounds and adds to the score
var hop = function(e) {
	// ^
	if (e.keyCode === 38) {
		y -= 25;
		$('froggo').css({'transform' : 'rotate(0deg)'});
		hopSound[0].pause();
		hopSound[0].currentTime=0;
		hopSound[0].play();
		score+=10;
	}
	// v
	if (e.keyCode === 40) {
		y += 25;
		$('froggo').css({'transform' : 'rotate(180deg)'})
		hopSound[0].pause();
		hopSound[0].currentTime=0;
		hopSound[0].play();
		score+=10;
	}
	// < 
	if (e.keyCode === 37) {
		x -= 25; 
		$('froggo').css({'transform' : 'rotate(270deg)'})
		hopSound[0].pause();
		hopSound[0].currentTime=0;
		hopSound[0].play();
		score+=10;
	}
	// >
	if (e.keyCode === 39) {
		x += 25;
		$('froggo').css({'transform' : 'rotate(90deg)'})
		hopSound[0].pause();
		hopSound[0].currentTime=0;
		hopSound[0].play();
		score+=10;
	}
};

//this is the animation loop initializer 
//and all the things that ought to begin 
//on game startup 
var bgCounter = 1;
var gameLoop = function() {
	//clear between interval pops
	ctx.clearRect(0, 0, 200, 400);

	if (level === 1) {
		staticBad(levelOneGators);
		staticSafe(levelOneLilypads);
		movingObjects(levelOneLogs);
		nearGator(levelOneGators);
		angryWater(levelOneLilypads, levelOneLogs); 
	} else if (level === 2) {
		staticBad(levelTwoGators);
		staticSafe(levelTwoLilypads);
		movingObjects(levelTwoLogs);
		nearGator(levelTwoGators);
		angryWater(levelTwoLilypads, levelTwoLogs); 
	} else if (level === 3) {
		staticBad(levelThreeGators);
		staticSafe(levelThreeLilypads);
		movingObjects(levelThreeLogs);
		nearGator(levelThreeGators);
		angryWater(levelThreeLilypads, levelThreeLogs); 
	}
	scoreBoard.text("Score: " + score);
	froggoDisplay();
	checkBounds();
	checkForGoal();
	lifeDisplay(livesArr, lives);
	countdown.text(count);
	ctx.font = '20px Courier';
	ctx.fillStyle = '#f6fc88';
  	ctx.fillText(countdown.text(), 5, 395); 
};


$(document).ready(function() {
	startButton.on('click', beginGame);
	window.addEventListener('keydown', spaceStart);
});