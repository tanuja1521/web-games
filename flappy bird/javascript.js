
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
 var bird = new Image();
 var bg = new Image();
 var fg = new Image();
 var pipenorth = new Image();
 var pipesouth = new Image();

 var hit = new Audio();
 var point = new Audio();
 var swooshing = new Audio();
 var wing = new Audio();


bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipenorth.src = "images/pipeNorth.png";
pipesouth.src = "images/pipeSouth.png";

hit.src = "flappy/hit.mp3";
point.src = "flappy/point.mp3";
wing.src = "flappy/wing.mp3";
swooshing.src = "flappy/swooshing.mp3";

var constant;
var gap = 85;
var bX = 10;
var bY = 150;
var Gravity = 1.5;
var score = 0;
var state = 1;
document.addEventListener("keydown",moveUp);
function moveUp()
{
	 bY -= 25;
	 wing.play();
}

var pipe = [];
  pipe[0] = {
  	x : cvs.width,
  	y : 0
  };

function draw()
{
	 ctx.drawImage(bg,0,0);

	 for (var i = 0; i < pipe.length; i++) 
	  {
	  	constant = pipenorth.height + gap;
	 	ctx.drawImage(pipenorth,pipe[i].x,pipe[i].y);
	 	ctx.drawImage(pipesouth,pipe[i].x,pipe[i].y+constant);
	 	pipe[i].x--;
	 	if (pipe[i].x == 125) {
	 		pipe.push({
	 			x : cvs.width,
	 			y : Math.floor(Math.random()*pipenorth.height)-pipenorth.height
	 		});


	 	}
	 	
	 	
	 	if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipenorth.width && (bY <= pipe[i].y + pipenorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            if(state == 1){
            hit.play();
            ctx.font= "30px Arial";
			   ctx.fillStyle= "black";
			   ctx.textAlign="center";
			   ctx.fillText("Game Over", cvs.width / 2, 100);  
			   ctx.fillText("Score: " + score, cvs.width / 2, 150);  
			   ctx.font= "20px Arial";
			   ctx.fillText("Click, touch to play again", cvs.width / 2, 300);  
			   bX --;
			   state = 0;}
	 			document.addEventListener("click", function(){
            	 document.location.reload();
	 			});
         
        }
     if(state == 1){
	 	if(pipe[i].x == 5){
            score++;
            point.play();
        }
    }
	 }
	 
	 ctx.drawImage(fg,0,cvs.height - fg.height);
	 ctx.drawImage(bird,bX,bY);
	 bY += Gravity;
	 if(state==1){
	 swooshing.play();
	 ctx.fillStyle = "#000";
     ctx.font = "20px Verdana";
     ctx.fillText("Score : " + score,cvs.width / 2,cvs.height-20);

	 requestAnimationFrame(draw);}

 }
draw();
