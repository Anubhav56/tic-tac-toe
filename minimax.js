function nextTurn(){
    //AI Turn
    let bestScore = -Infinity;
    let move;
    for(let i =0;i<3;i++){
        for(let j =0;j<3;j++){
            //Is spot available
            if(board[j][i] == ''){
                board[j][i] = ai;
                let score = minimax(board,0,false);
                board[j][i] = '';
                if(score > bestScore){
                    bestScore = score;
                    move = {j,i};
                } 
            }
        }
    }
    board[move.j][move.i] = ai;
    currentPlayer = human;
}

let scores = {
    X: 1,
    O: -1,
    tie: 0
}

function minimax(board , depth, ismaximizing){
    let result = checkWinner();
    if(result != null){
        let score = scores[result];
        return score;
    }

    if(ismaximizing){
        let bestScore = -Infinity;
        for(let i =0;i<3;i++){
            for(let j = 0;j<3;j++){
                if(board[j][i] == ''){
                    board[j][i] = ai;
                    let score = minimax(board,depth+1,false);
                    board[j][i] = '';
                    bestScore = max(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for(let i =0;i<3;i++){
            for(let j = 0;j<3;j++){
                if(board[j][i] == ''){
                    board[j][i] = human;
                    let score = minimax(board,depth+1,true);
                    board[j][i] = '';
                    bestScore = min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}