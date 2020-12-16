//////////////////////////////////////////////////////////////////////////////
//
//  Utility functions
//
//  André Almeida - December 2020
//
//////////////////////////////////////////////////////////////////////////////

// from https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function getPositionsFromBoardMatrix(board) {

  // Return list of queens' positions [row, column] by order of incremental queen's column
  // e.g. 1st queen is the one on column 0, 2st queen is the one on column 1, ...
    
    var posList = [];

    for(var i = 0 ; i < board.length ; i++){
        for(var j = 0; j < board[i].length; j++){

            console.assert(board.length == board[i].length, "Board is not squared!!");

            // Add [row, column] of squares that should have a queen
            if (board[j][i] == 1){
                posList.push([j, i]);
            }
        }
    }

    return posList;
}

function proceedOrders(boards, step) {

        var i = boardSetCount % boards.length,
            nextStep = (i + step) % boards.length;

        if(i < 0) {
            i = (i + boards.length) % boards.length;
        }
        if( nextStep < 0 ){// Work as python's array indexing (arr[-1] = arr[size - 1])
            nextStep = (nextStep + boards.length) % boards.length;
        }
        
		previousSet = getPositionsFromBoardMatrix(boards[i]);
		nextSet = getPositionsFromBoardMatrix(boards[nextStep]);

        var orders = [[], 0];

        // Check how many positions lost a queen
        for(i = 0; i < previousSet.length; i++){
            if(previousSet[i] != nextSet[i]){
                // this and all next queens are to be removed
                orders[1] = previousSet.length - i;
                break;
            }
        }

        // Start adding from the last break point
        var start = previousSet.length - orders[1]; // same as j = i
        for(i = start; i < nextSet.length; i++) {
            orders[0].push(nextSet[i]); // Add a position
        }
            
        return orders;

}

function move(step) {
    
    var orders = proceedOrders(boards, step),
    rowcols = orders[0], // new position [row1, col1], [row2, col2], [row3, col3], [rowN, colN]...
    nPops = orders[1];   // Number of pops
    
    for(var i = 0 ; i < nPops; i++) {
        sceneModels.pop();
    }

    for(i = 0; i < rowcols.length; i++) {//Also add
        sceneModels.push(new queenModel(
            rowcols[i][0],//new queen's row
            rowcols[i][1] //new queen's column
            ));
    }

    // One step
    boardSetCount += step;

}