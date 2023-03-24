const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const allParticles = [];

var board = new Array(3); //default = 0, cross = 10, circle = 7

for (var i = 0; i < board.length; i++) {
    board[i] = new Array(3);
}

var player = 1, count=0, playerWin=0, matchesPlayed=0, player1wins=0, player2wins=0, winningPlayer=" - - - - ";
var winning = "";

const center = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
}

var topX = center.x - 150, topY = center.y - 150; 

const mouse = {
    x: undefined,
    y: undefined,
}

const click = {
    x: undefined,
    y: undefined,
}

function clearBoard(){
    let i,j;
    for(i=0; i<3; i++)
       for(j=0; j<3; j++)
            board[i][j]=0;
}
clearBoard();

function updateBoard(row, column){
    if(board[row][column] == 0){
        count++;
        if(player == 1){
            board[row][column]= 10;
            player = 2;
        }
        else{
            board[row][column] =7;
            player = 1;
        } 
    }
    //console.log(board);
}

function win(){
    let sum1, sum2, sum3, sum4, sum5, sum6, sum7, sum8, win=0;
    sum1 = board[0][0] + board [1][0] + board[2][0];
    sum2 = board[0][1] + board [1][1] + board[2][1];
    sum3 = board[0][2] + board [1][2] + board[2][2];
    sum4 = board[0][0] + board [0][1] + board[0][2];
    sum5 = board[1][0] + board [1][1] + board[1][2];
    sum6 = board[2][0] + board [2][1] + board[2][2];
    sum7 = board[0][0] + board [1][1] + board[2][2];
    sum8 = board[2][0] + board [1][1] + board[0][2];

    if(sum1 == 30 || sum1 == 21){
        win =1;
    }
    else if(sum2 == 30 || sum2 == 21){
        win =1;
    }
    else if(sum3 == 30 || sum3 == 21){
        win =1;
    }
    else if(sum4 == 30 || sum4 == 21){
        win =1;
    }
    else if(sum5 == 30 || sum5 == 21){
        win =1;
    }
    else if(sum6 == 30 || sum6 == 21){
        win =1;
    }
    else if(sum7 == 30 || sum7 == 21){
        win =1;
    }
    else if(sum8 == 30 || sum8 == 21){
        win =1;
    }
    
    return win;
}



window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCoordinates();
    redraw();
});


canvas.addEventListener('mousemove', function(move){
    mouse.x = move.x;
    mouse.y = move.y;
});

canvas.addEventListener('click', function(click1){
    
    if(click1.x > center.x - 150 &&  click1.x < center.x + 150 && click1.y > center.y - 150 &&  click1.y < center.y + 150 && playerWin==0){
        let xi = Math.floor((click1.x - topX)/100);
        let yi = Math.floor((click1.y -topY)/100);
        //click.x = 50 + xi*100 + topX;
        //click.y = 50 + yi*100 + topY;
        //console.log(click);
        updateBoard(xi, yi);
        if(count == 9){
            winning = "MATCH IS DRAW.";
            matchesPlayed += 1;
            clearSecondCanvas();
            secondCanvasPrint();
        }
        playerWin = win();
        if(playerWin == 1){
            if(player == 2){
                winning = "PLAYER 1 WINS !";
                matchesPlayed += 1;
                player1wins += 1;
                checkPlayer();
                clearSecondCanvas();
                secondCanvasPrint();
            }
            else{
                winning = "PLAYER 2 WINS !";
                matchesPlayed += 1;
                player2wins += 1;
                checkPlayer();
                clearSecondCanvas();
                secondCanvasPrint();
            }
        } 
        //console.log(xi);
        //console.log(yi);
    }
});

canvas.addEventListener('dblclick', function(dbclick1){
    if(dbclick1.x > center.x - 150 &&  dbclick1.x < center.x + 150 && dbclick1.y > center.y - 150 &&  dbclick1.y < center.y + 150){
        reset_game();
    }
});

function reset_game(){
    clearBoard();
    winning="";
    count=0;
    player=1;
    playerWin=0;
}

var resetbtn = document.getElementById('resetbtn');
resetbtn.onclick = function(){
  reset_game();
}


function drawCircle(x,y){
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.arc(x, y, 20,  0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
}
//drawCircle();

function drawCross(x,y){
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.moveTo(x - 20, y - 20);
    ctx.stroke();
    ctx.lineTo(x + 20, y +  20);
    ctx.stroke();
    ctx.moveTo(x + 20, y - 20);
    ctx.stroke();
    ctx.lineTo(x - 20, y + 20);
    ctx.stroke();
    ctx.closePath();
}

function drawCursor(){
    if(mouse.x > center.x - 150 &&  mouse.x < center.x + 150 && mouse.y > center.y - 150 &&  mouse.y < center.y + 150){
        if(player == 1) drawCross(mouse.x,mouse.y);
        else drawCircle(mouse.x,mouse.y);
    }
}

function redraw(){
    drawTicTac();
    heading();
    instructions();
    print_Cross_Circle();
}

function updateCoordinates(){
    center.x = window.innerWidth/2;
    center.y = window.innerHeight/2;
    topX = center.x - 150;
    topY = center.y - 150; 
}

class particles{
    constructor(){
        this.x = center.x;
        this.y = center.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random()*5 + 1;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5;
    }
    update(){
        if(this.x > canvas.width - 10 || this.x < 10){
            this.speedX *= -1;
        }
        if(this.y  > canvas.height - 10 || this.y  < 10){
            this.speedY *= -1;
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
}

function generate(){
    for(let i=0; i<100; i++){
        allParticles.push(new particles());
    }
}
generate();

function drawParticles(){
    for(let i=0; i<allParticles.length; i++){
        allParticles[i].update();
        allParticles[i].draw();
    }
}
//drawParticles();

function drawTicTac(){
    ctx.beginPath();
    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 2;
    ctx.moveTo(center.x - 150, center.y - 150);
    ctx.lineTo(center.x + 150, center.y - 150);
    ctx.stroke();
    ctx.moveTo(center.x - 150, center.y - 50);
    ctx.lineTo(center.x + 150, center.y - 50);
    ctx.stroke();
    ctx.moveTo(center.x - 150, center.y + 50);
    ctx.lineTo(center.x + 150, center.y + 50);
    ctx.stroke();
    ctx.moveTo(center.x - 150, center.y + 150);
    ctx.lineTo(center.x + 150, center.y + 150);
    ctx.stroke();
    ctx.moveTo(center.x - 150, center.y - 150);
    ctx.lineTo(center.x - 150, center.y + 150);
    ctx.stroke();
    ctx.moveTo(center.x - 50, center.y - 150);
    ctx.lineTo(center.x - 50, center.y + 150);
    ctx.stroke();
    ctx.moveTo(center.x + 50, center.y - 150);
    ctx.lineTo(center.x + 50, center.y + 150);
    ctx.stroke();
    ctx.moveTo(center.x + 150, center.y - 150);
    ctx.lineTo(center.x + 150, center.y + 150);
    ctx.stroke();
    ctx.fillStyle='pink';
    ctx.font = "20px Ubuntu";
    ctx.fillText("1", center.x - 70, center.y - 130);
    ctx.fillText("2", center.x + 30, center.y - 130);
    ctx.fillText("3", center.x + 130, center.y - 130);
    ctx.fillText("4", center.x - 70, center.y - 30);
    ctx.fillText("5", center.x + 30, center.y - 30);
    ctx.fillText("6", center.x + 130, center.y - 30);
    ctx.fillText("7", center.x - 70, center.y + 70);
    ctx.fillText("8", center.x + 30, center.y + 70);
    ctx.fillText("9", center.x + 130, center.y + 70);
    ctx.closePath();

    printWin();
}

function print_Cross_Circle(){
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[i][j] == 10) drawCross(50 + i*100 + topX, 50 + j*100 + topY);
            else if(board[i][j] == 7) drawCircle(50 + i*100 + topX, 50 + j*100 + topY);
        }
    }
}

function heading(){
    ctx.beginPath();
    ctx.strokeStyle='#1589FF';
    ctx.font = "50px Ubuntu";
    ctx.strokeText("TIC - TAC - TOE", center.x - 170, center.y - 250);
    ctx.closePath();
}

function instructions(){
    ctx.beginPath();
    var img = document.getElementById("rules");
    ctx.drawImage(img, center.x - 550, center.y - 140, 300, 300);
    ctx.closePath();
}

function printWin(){
    ctx.beginPath();
    ctx.fillStyle='#FFFF00';
    ctx.font = "40px Ubuntu";
    ctx.fillText(winning, center.x - 155, center.y + 250);
    ctx.closePath();
}

function checkPlayer(){
    if(player1wins > player2wins) winningPlayer = "Player - 1";
    else if(player1wins < player2wins) winningPlayer = "Player - 2";
    else winningPlayer = " draw "
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles();
    drawTicTac();
    drawCursor(mouse.x, mouse.y);
    heading();
    instructions();
    print_Cross_Circle();
    requestAnimationFrame(animate);
}
animate();







const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = window.innerWidth/2;
canvas2.height = window.innerHeight;

function secondCanvasPrint(){
    ctx2.beginPath();
    ctx2.fillStyle='black';
    ctx2.font = "30px Ubuntu";
    ctx2.fillText("SCORE BOARD", 200, 150);
    ctx2.strokeStyle='black';
    ctx2.lineWidth= 3;
    ctx2.moveTo(210, 160);
    ctx2.lineTo(390,160);
    ctx2.stroke();
    ctx2.font = "20px Ubuntu";
    ctx2.fillText("Total Matches Played : ", 160, 250);
    ctx2.fillText("Matches Won By Player - 1 : ", 160, 300);
    ctx2.fillText("Matches Won By Player - 2 : ", 160, 350);
    ctx2.fillText("Winning Player : ", 160, 400);
    ctx2.fillStyle='#f3228a';
    ctx2.fillText(matchesPlayed, 460, 250);
    ctx2.fillText(player1wins, 460, 300);
    ctx2.fillText(player2wins, 460, 350);
    ctx2.fillText(winningPlayer, 440, 400);
    ctx2.closePath();
}
secondCanvasPrint();

function clearSecondCanvas(){
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
}




var screen = document.getElementById('score-screen');
var scorebtn = document.getElementById('scorebtn');
scorebtn.onclick = function(){
  screen.style.display = "block";
}

var close = document.getElementsByClassName("close")[0];
close.onclick = function() { 
  screen.style.display = "none";
}