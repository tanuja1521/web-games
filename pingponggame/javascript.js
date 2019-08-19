
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var restart = document.getElementById("restart");
var btn = document.getElementById("btn");
var state = 1;
var ball = {
	x : cvs.width/2,
	y : cvs.height/2,
	radius : 10,
	velocityX : 5,
	velocityY : 5,
	speed : 7,
	color : "WHITE"
}
var user = {
	x : 0,
	y : (cvs.height - 100)/2,
	width : 10,
	height : 100,
	score : 0,
	color : "WHITE"
}
var com = {
	x : cvs.width - 10,
	y : (cvs.height - 100)/2,
	width : 10,
	height : 100,
	score : 0,
	color : "STEELBLUE"
}
restart.textContent = "RESTART";
function drawRectanle(x, y, w, h, color){
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
	ctx.fillStyle = color;
	ctx.beginPath();																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																				
	ctx.arc(x, y, r, 0, Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
}

cvs.addEventListener("mousemove", getmousepos);

function getmousepos(evt){
	var rect = cvs.getBoundingClientRect();

	user.y = evt.clientY - rect.top - user.height/2;	
}
function resetBall(){
	ball.x = cvs.width/2;
	ball.y = cvs.height/2;
	ball.velocityX = -ball.velocityX;
	ball.speed =7;
}

function update(){
	if(state == 1){
	if(ball.x - ball.radius < 0){
		com.score++;
		resetBall();
	}
	else if(ball.x + ball.radius > cvs.width){
		user.score++;
		resetBall();
	}
}
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;


	com.y += (ball.y - (com.y + com.height/2))*0.1;
	if(ball.y - ball.radius < 0 || ball.y + ball.radius > cvs.height){
        ball.velocityY = -ball.velocityY;

    }
    var player = (ball.x + ball.radius < cvs.width / 2) ? user : com;
   var p = {    
   				top : player.y,
			    bottom : player.y + player.height,
			    left : player.x,
			    right : player.x + player.width
			}
	var b = {
			    top : ball.y - ball.radius,
			    bottom : ball.y + ball.radius,
			    left : ball.x - ball.radius,
			    right : ball.x + ball.radius
    		}
    if(p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top){
    	var collidepoint = ball.y - (player.y +player.height/2);
    	collidepoint = collidepoint / (player.height/2);

    	var angle = (Math.PI/4) * collidepoint;

    	var direction = (ball.x + ball.radius < cvs.width/2) ? 1 : -1;
    	ball.velocityX = direction* ball.speed *Math.cos(angle);
    	ball.velocityY = ball.speed * Math.sin(angle);
    	ball.speed += 0.1;
    }
}

function draw(){
	drawRectanle(0,0,cvs.width,cvs.height,"#000");
	ctx.fillStyle = "WHITE";
	ctx.font = "20px Verdana";
	ctx.fillText("USER : "+user.score,cvs.width/6,cvs.height/5);
	ctx.fillText("COMPUTER : "+com.score,4*cvs.width/6,cvs.height/5);
	drawRectanle(user.x,user.y,user.width,user.height,user.color);
	drawRectanle(com.x,com.y,com.width,com.height,com.color);
	ctx.fillRect(cvs.width/2, 0, 2, cvs.height);
	drawCircle(ball.x,ball.y,ball.radius,ball.color);
	btn.addEventListener("click",function(){
		document.location.reload();
	});
	if(com.score ==5){
		restart.textContent ="PLAYAGAIN??";
		ctx.fillText("score :"+ user.score,(cvs.width-100)/2,cvs.height/2);
		ctx.fillText("YOU LOST",(cvs.width-100)/2,cvs.height/2 +50);
		state = 0;

	}
}

function game(){
	update();
	draw();

	requestAnimationFrame(game);

}

game();


