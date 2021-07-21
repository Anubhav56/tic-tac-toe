let board = [
  ['','',''],
  ['','',''],
  ['','',''],
]

let human = 'O', ai = 'X';
let currentPlayer;

// function nextTurn(){
//   // AI Turn
//   let index = floor(random(available.length));
//   let spot = available.splice(index,1)[0];
//   let i = spot[0];
//   let j = spot[1];
//   board[i][j] = player[currentPlayer];
//   currentPlayer = (currentPlayer +1)%player.length;
// }


function equals3(a,b,c){
  return (a!='' && a==b && b==c);
}

function checkWinner(){
  let winner;
  // horizontal
  for(let i =0;i<3;i++){
    if(equals3(board[i][0], board[i][1], board[i][2])){
      winner = board[i][0];
    }
  }

  // vertical
  for(let i =0;i<3;i++){
    if(equals3(board[0][i], board[1][i], board[2][i])){
      winner = board[0][i];
    }
  }

  //diagonal
  if(equals3(board[0][0], board[1][1], board[2][2])){
    winner = board[0][0];
  }
  if(equals3(board[2][0], board[1][1], board[0][2])){
    winner = board[0][2];
  }

  let spots = 0;
  for(let i = 0; i<3;i++){
    for(let j =0;j<3;j++){
      if(board[i][j] == ''){
        spots++;
      }
    }
  }
  if(winner == null && spots == 0){
    return 'tie';
  }
  else{
    return winner;
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(1.5);
  currentPlayer = human;
  nextTurn();
  // currentPlayer = floor(random(player.length));
  // for(let i =0;i<3;i++){
  //   for(let j =0;j<3;j++){
  //     available.push([i,j]);
  //   }
  // }
}

function mousePressed() {
  if(currentPlayer == human){
    //Human's Turn
    let i = floor(mouseX/(width/3));
    let j = floor(mouseY/(height/3));
    //if valid
    if(board[j][i] == ''){
      board[j][i] = human;
      currentPlayer = ai;
      nextTurn();
    }
  }
}

function draw() {
  background(255);
  let w = width/3;
  let h = height/3;

  line(w,0,w,height);
  line(w*2,0,w*2,height);
  line(0,h,width,h);
  line(0,h*2,width,h*2);
  for(let i =0;i<3;i++){
    for(let j =0;j<3;j++){
      let x = w*i +w/2;
      let y = h*j + h/2;
      let spot = board[j][i];
      
      strokeWeight(4);
      if(spot == human){
        noFill();
        ellipse(x,y,w/2);
      }
      else if(spot == ai){
        let xr = w/4;
        line(x-xr, y-xr, x+xr, y+xr);
        line(x+xr, y-xr, x-xr, y+xr);
      }
    }
  }

  let result = checkWinner();
  if(result != null){
    noLoop();
    createP(result).style('color','#f57').style('font-size','32pt');
    //console.log(result);
  }
  else if(currentPlayer == ai){
    nextTurn();
  }
  // else{

  // }
}