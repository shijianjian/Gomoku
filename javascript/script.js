var gomoku = document.getElementById('gomoku');
var context = gomoku.getContext('2d');

var youBlack;
var gameType;

var chessBoard = [];
var me = true;
var over = false;

var recoderArray = [];

var wins = [];

var myWin = [];
var computerWin = [];

var max = 0;
var u = 0, v = 0;

var counter = 0;

for (var i = 0; i<15; i++){
	chessBoard[i]=[];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

for(var i = 0 ; i<15; i++){
	wins[i]=[];
	for(var j=0; j<15; j++){
		wins[i][j] = [];
	}
}

//count stands for all the possible ways to win
var count = 0;
//winner strategies for all rows
for(var i = 0; i<15; i++){
	for(var j =0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

//winner strategies for all cols
for(var i = 0; i<15; i++){
	for(var j =0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

//winner strategies for all diagonals
for(var i = 0; i<11; i++){
	for(var j =0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

//winner strategies for all diagonals
for(var i = 0; i<11; i++){
	for(var j =14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}


for(var i = 0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

var logo = new Image();
logo.src = "img/GOMOKU_LOGO.png";
logo.onload = function(){
	//context.drawImage(logo, 0,0,450,450); //must wait for loading the image.
	drawBoard();
	document.getElementById('gomoku').style.pointerEvents = 'none';
}

var checkStart = function(){
	var check = 0;
	for (var i = 0; i<15; i++){
		for(var j=0; j<15; j++){
			if(chessBoard[i][j] == 0)
				check++;
		}
	}
	if(check == 225){
		document.getElementById("play").disabled = false;
		return true;
	}
	else{
		document.getElementById('gomoku').style.pointerEvents = 'none';
		return false;
	}
}

var drawBoard = function(){
	context.strokeStyle="#484546";
	for(var i=0; i<15 ; i++){
		context.beginPath();
		context.moveTo(15 + i*30 ,15);
		context.lineTo(15 + i*30 ,435);
		context.closePath();
		context.stroke();
		context.beginPath();
		context.moveTo(15 ,15 + i*30);
		context.lineTo(435 ,15 + i*30);
		context.closePath();
		context.stroke();
	}
	context.beginPath();
	context.arc(15 + 3*30, 15 + 3*30, 3, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fillStyle = '#000';
	context.fill();
	context.beginPath();
	context.arc(15 + 3*30, 15 + 11*30, 3, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fillStyle = '#000';
	context.fill();
	context.beginPath();
	context.arc(15 + 11*30, 15 + 3*30, 3, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fillStyle = '#000';
	context.fill();
	context.beginPath();
	context.arc(15 + 11*30, 15 + 11*30, 3, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fillStyle = '#000';
	context.fill();
	context.beginPath();
	context.arc(15 + 7*30, 15 + 7*30, 3, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	context.fillStyle = '#000';
	context.fill();
}

document.getElementById('restart').addEventListener('click',function(){
	restart();
	checkStart();
	document.getElementById('gomoku').style.pointerEvents = 'none';
});

document.getElementById('play').addEventListener('click',function(){
	if(typeof gameType != 'undefined' && typeof youBlack != 'undefined'){
		checkStart();
		play();
		document.getElementById("play").disabled = true;
	}else{
		alert("Please choose game type!");
	}
});

	document.getElementById('PVP').addEventListener('click',function(){
	if($('#PVP').is(':checked')){
		document.getElementById('gameTypeTip').innerHTML = 'You are playing with your friend!';
		gameType = false;
		gomoku.onclick = PVP;
		document.getElementById('youWhite').disabled = true;
		document.getElementById('playTypeTip').innerHTML = 'You play Black!';
		youBlack=true;
	};
	});
	document.getElementById('PVE').addEventListener('click',function(){
		if($('#PVE').is(':checked')){
			document.getElementById('gameTypeTip').innerHTML = 'You are playing with Computer!';
			gameType = true;
			gomoku.onclick = PVE;
			document.getElementById('youWhite').disabled = false;
		};
	});

	document.getElementById('youBlack').addEventListener('click',function(){
		if($('#youBlack').is(':checked')){
			document.getElementById('playTypeTip').innerHTML = 'You play Black!';
			youBlack = true;
		};
	});

	document.getElementById('youWhite').addEventListener('click',function(){
		if($('#youWhite').is(':checked')){
			document.getElementById('playTypeTip').innerHTML = 'You play White!';
			youBlack = false;

		};
	});

var play = function(){
	document.getElementById('gomoku').style.pointerEvents = 'auto';
	
	if(!youBlack && gameType){
		oneStep(7,7,false);
	}
}

var restart = function(){
	context.save();
	context.clearRect(0,0,450,450);
	context.restore();
	for(var i = 0; i<15; i++){
		chessBoard[i]=[];
		for(var j=0; j<15; j++){
			chessBoard[i][j] = 0;
		}	
	}
	for(var i = 0; i<count; i++){
		myWin[i] = 0;
		computerWin[i] = 0;
	}
	drawBoard();
	if(document.getElementById('mask') != null){
		document.getElementById('mask').remove();
	}
	document.getElementById('tip').innerHTML = 'You can choose the game type! ';
	document.getElementById("PVP").disabled = false;
	document.getElementById("PVE").disabled = false;
	document.getElementById("youBlack").disabled = false;
	document.getElementById("youWhite").disabled = false;
	var myNode = document.getElementById("screen");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	youBlack = true;
	me = true;
	over = false;
	counter = 0;
}

var oneStep = function(i,j,me){
	var chessman;
	context.save();
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
	context.closePath();
	context.stroke();
	var gradient = context.createRadialGradient(15 + i*30 +2, 15 + j*30 -2,13 ,15 + i*30 +2, 15 + j*30 -2,0);
	if(youBlack){
		if(me){
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
			chessman = 'Black Player';
		} else {
			gradient.addColorStop(0,"#D1D1D1");
			gradient.addColorStop(1,"#F9F9F9");
			chessman = 'White Player';
		}
	}else{
		if(me){
			gradient.addColorStop(0,"#D1D1D1");
			gradient.addColorStop(1,"#F9F9F9");
			chessman = 'White Player';
		} else {
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
			chessman = 'Black Player';
		}
	}
	context.fillStyle = gradient;
	context.fill();
	context.restore();
	disableChange();
	recoder(i,j,chessman);
}

var disableChange = function(){
	document.getElementById('tip').innerHTML = 'You can change game type in next round!';
	document.getElementById("PVP").disabled = true;
	document.getElementById("PVE").disabled = true;
	document.getElementById("youBlack").disabled = true;
	document.getElementById("youWhite").disabled = true;
}

var recoder = function(i,j,chessman){
	counter++;
	recoderArray.push(i,j,chessman);
	var first = document.getElementById('screen').firstChild;
	var x = document.createElement("li"); 
	var textnode = document.createTextNode("Step "+counter+": "+chessman+" put a piece on "+i+" "+j+".");
	x.setAttribute("id", counter);
	x.appendChild(textnode);
	document.getElementById('screen').insertBefore(x,first);
}

var gameOver = function(winner){
	console.log(winner);
	var board = document.getElementById("board");
	var boardTop = document.getElementById("gomoku").offsetTop;
	var boardLeft = document.getElementById("gomoku").offsetLeft;
	
	var oMask = document.createElement("div");
		oMask.id="mask";
		oMask.style.top = boardTop+"px";
		oMask.style.left = boardLeft+"px";
	
	
	var overNode = document.createElement("h1");
		overNode.innerHTML = "Game Over";
	var overResult = document.createElement("h2");
		overResult.innerHTML = winner;
	oMask.appendChild(overNode);
	oMask.appendChild(overResult);
	
	board.appendChild(oMask);

}

var winner = function(){
	if(youBlack){
		if(me){
				return "Black Win";
			}else{
				return "White Win";
			}
		}else{
			if(me){
				return "White Win";
			}else{
				return "Black Win";
			}
		}
}