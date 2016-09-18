// We are using canvas variable to refer to the canvas element in the html page
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight - 150;

var paused = true;

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var interval = 10;

var ballRadius = 10;
var ballColor = "blue";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;


var brickColumnLength = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickRowLength = ((canvas.width + brickOffsetLeft) / (brickWidth + brickPadding)) - 1; 

var score = 0;
var lives = 3;

var bricks = [];
for(var i = 0; i < brickColumnLength; i++) {
	bricks[i] = [];
	for(var j = 0; j < brickRowLength; j++) {
		bricks[i][j] = {x :0, y: 0, status: 1};
	}
}

// Function to draw the ball on canvas
function drawBall() {

	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {

	ctx.beginPath();
	ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
	ctx.fillStyle = "#009ACD";
	ctx.fill();
	ctx.closePath();	
}

function drawBricks()  {

	for(var i = 0; i < brickColumnLength; i++) {
		for(var j = 0; j < brickRowLength; j++) {
			if(bricks[i][j].status == 1) {
				var brickX = (j * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (i * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[i][j].x = brickX;
				bricks[i][j].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#42C0FB";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#236B8E"
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#236B8E";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Function to change the position of the ball on the canvas
function draw() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	collisonDetection();
	drawScore();
	drawLives();
	drawBricks();


	if(paused == false) {
		if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    		dx = -dx;
    	}

		if(y + dy < ballRadius) {
    		dy = -dy;
    	}
	    else if(y + dy > canvas.height - ballRadius) {
	    	if(x > paddleX && x < paddleX + paddleWidth) {
	     	   dy = -dy;
	     	}
	    	else {
	    			lives--; 
	    			if(lives == 0) {
	    		 		alert("GAME OVER");
	    				document.location.reload();
	    			}
	    			else {
	    					x = canvas.width / 2;
						    y = canvas.height - 30;
							dx = 2;
							dy = -2;
	    					paddleX = (canvas.width-paddleWidth)/2; 
	    			}
	    	}   
	    }

		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
		}
		if(leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
		x = x + dx;
		y = y + dy;
		//requestAnimationFrame(draw);
	}
}

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
	else if(e.keyCode == 32){
		paused = !paused;
	}
	
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function collisonDetection() {

	for(var i = 0; i < brickColumnLength; i++) {
		for(var j = 0; j < brickRowLength; j++) {
			var temp = bricks[i][j];
			if(temp.status == 1) {
				if((x > temp.x && x < temp.x + brickWidth) && (y > temp.y && y < temp.y + brickHeight)) {
					dy = -dy;
					temp.status = 0;
					score++;
					if(score == (brickRowLength * brickColumnLength)) {
						alertify.success("You won!!!");
						document.location.reload();
					}
				}
			}
		}
	}
}
 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);