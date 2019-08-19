var numsquares;
var colors = [];
colors = GenerateRandomcolor(6);
var squares = document.querySelectorAll(".square");
var pickedcolor = pick();
var ColorDisplay = document.getElementById("colordisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetbutton = document.querySelector("#reset");
resetbutton.addEventListener("click", function(){
	reset();
})
ColorDisplay.textContent = pickedcolor;
var easy = document.querySelector("#easybtn");
var hard = document.querySelector("#hardbtn");
easy.addEventListener("click", function(){
	numsquares = 3;
	reset();
	easy.classList.add("selected");
	hard.classList.remove("selected");
	for (var i = 3; i < squares.length; i++) 
	{
		squares[i].style.display = "none";
	}
})
hard.addEventListener("click", function(){
	numsquares = 6;
	reset();
	hard.classList.add("selected");
	easy.classList.remove("selected");
	for (var i = 0; i < squares.length; i++) 
		{
			//squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		}
})
for (var i = 0; i < squares.length; i++) 
{
	squares[i].style.background = colors[i];
	squares[i].addEventListener("click", function(){
		var clickedcolor = this.style.background;
		if (clickedcolor === pickedcolor){
			for (var i = 0; i < squares.length; i++) {
				squares[i].style.background = clickedcolor;
			}
			message.textContent = "CORRECT";
			h1.style.background = clickedcolor;
			resetbutton.textContent = "Play Again??";
			resetbutton.addEventListener("click", function(){
				reset();
				resetbutton.textContent = "New Colors";
			})
			}	
		else{
			this.style.background="black";
			message.textContent ="TRY AGAIN!!";
		}
	});
}
function pick(){
	var rand = Math.floor(Math.random()*colors.length);
	return colors[rand];
}
function GenerateRandomcolor(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr[i] = randomcolor();
	}
	return arr;
}
function randomcolor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
function reset(){
	colors = GenerateRandomcolor(numsquares);
	pickedcolor = pick();
	ColorDisplay.textContent = pickedcolor;
	message.textContent = "";
	h1.style.background = "steelblue";
	for (var i = 0; i < squares.length; i++) 
		{
			squares[i].style.background = colors[i];
			//squares[i].style.display = "block";
		}
}