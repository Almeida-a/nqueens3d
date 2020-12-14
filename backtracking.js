
var N = 4,  boards = [], boardSetCount = 0;

function arrayDeepCopy(arr){

    if(Array.isArray(arr)){

        var clone = [];

        for (var i = 0; i < arr.length; i++){

            clone.push(arrayDeepCopy(arr[i]));

        }

        return clone;
    }

    return arr;

}

function isSafe(board, row, col) {
    
    var i, j, n = board.length; 

    /* Check this row on left side */
    for (i = 0; i < col; i++) 
        if (board[row][i] == 1) 
            return false; 

    /* Check upper diagonal on left side */
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) 
        if (board[i][j] == 1) 
            return false; 

    /* Check lower diagonal on left side */
    for (i = row, j = col; j >= 0 && i < n; i++, j--) 
        if (board[i][j] == 1) 
            return false; 

    return true; 
    
}


function solveNQUtil(board, col) {
    // base case: If all queens are placed
    // then return true

    n = board.length;

    // Save board
    boards.push(arrayDeepCopy(board));

    if (col >= n)
    {
        return true;
    }

    // Consider this column and try placing
    // this queen in all rows one by one
    for(var i = 0; i < n; i++){

        if( isSafe(board, i, col)){

            // # Place this queen in board[i][col]
            board[i][col] = 1;

            // # recur to place rest of the queens
            if (solveNQUtil(board, col + 1)){
                return true;
            }
            // # If placing queen in board[i][col
            // # doesn't lead to a solution, then
            // # queen from board[i][col]
            board[i][col] = 0;
        }
    }
    // # if the queen can not be placed in any row in
    // # this colum col then return false
    return false;
}

function printSolution(board){

    n = board.length;

    for (i = 0; i < n; i++){
        for (j = 0; j < n; j++)
            console.log(board[i][j], end=" ");
        console.log();
    }
}

function runAlgorithm(n){
    /*
    A utility function to check if a queen can
    be placed on board[row][col]. Note that this
    function is called when "col" queens are
    already placed in columns from 0 to col -1.
    So we need to check only left side for
    attacking queens

    :param n: Number of queens; size of the board
    :return:
    */

    board = [];

    // Creating the matrix
    for(var i = 0; i < n; i++){
        board.push(new Array(n).fill(0));
    }

    if (!solveNQUtil(board, 0)) {
        console.log("Solution does not exist");
        return null;
    }

    // printSolution(board);
    return board;
}

// # This code is contributed by Divyanshu Mehta
// # Original code from https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/
// # Adapted to js by André Almeida

// Decomment next lines when debugging
runAlgorithm(N);