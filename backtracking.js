
var n = 5;

function isSafe(board, row, col) {
    n = board.length;

    // Check this row on left side
    for(var i = 0; i < col.length ; i++){
        if(board[row][i] == 1){
            return false;
        }
    }

    // Check upper diagonal on left side
    range_row = [];
    for( i = row-1 ; i >= 0 ; i--) {
        range_row.push(i);
    }
    
    range_col = [];
    for( i = col-1 ; i >= 0 ; i--) {
        range_col.push(i);
    }

    zipped = zip2(range_col, range_col);
    for (i = 0; i < zipped.length; i++ ) {
        if(board[zipped[i][0]][zipped[i][1]] == 1) {
            return false;
        }
    }

    // Check lower diagonal on left side
    range_row = [];
    for( i = row ; i < n ; i++) {
        range_row.push(i);
    }

    zipped = zip2(range_col, range_col);
    for (i = 0; i < zipped.length; i++ ) {
        if(board[zipped[i][0]][zipped[i][1]] == 1) {
            return false;
        }
    }

    return true;
}


function solveNQUtil(board, col) {
    // base case: If all queens are placed
    // then return true

    n = board.length;

    if (col >= n)
    {
        return true;
    }

    // Consider this column and try placing
    // this queen in all rows one by one
    for(i = 0; i < n; i++){

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

    for(var i = 0; i < n; i++){
        board.push(new Array(n).fill(0));
    }

    if (!solve_nq_util(board, 0)) {
        console.log("Solution does not exist");
        return false;
    }

    printSolution(board);
    return true;
}

// # This code is contributed by Divyanshu Mehta
// # Original code from https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/
// # Adapted by André Almeida
