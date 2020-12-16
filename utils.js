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

function proceedOrders(boards, i) {// TODO continue testing this function

		previousSet = getPositionsFromBoardMatrix(boards[i % boards.length]);
		nextSet = getPositionsFromBoardMatrix(boards[(i + 1) % boards.length]);

        // Condition decision making
        var orders = [null, [], null, null];
		var flags = [
						false,	// add
						false,	// pop
						false 	// same
					];

        if(previousSet.length < nextSet.length)
        {
            // Add a piece
            flags[0] = true;

            // Row
            orders[1].push(nextSet[nextSet.length-1][0]);
            // Column
            orders[1].push(nextSet[nextSet.length-1][1]);
        }
        else if(previousSet.length == nextSet.length)
        {
            // Change last queen's positions
            flags[1] = true;

            // pacesDown
            orders[2] = previousSet[previousSet.length-1][0] - nextSet[nextSet.length-1][0];
        }
        else if(previousSet.length > nextSet.length)
        {
            flags[2] = true;

            if(nextSet.length != 0)
            {

                flags[0] = true; // Add as well
                // nPops
                orders[3] = previousSet.length - nextSet.length + 1;
                
                // Row
                orders[1].push(nextSet[nextSet.length-1][0]);
                // Column
                orders[1].push(nextSet[nextSet.length-1][1]);

            } else {

                orders[3] = previousSet.length;

            }

        }

        orders[0] = flags;
            
        return orders;

}

function move(plus) {
    
    var orders = proceedOrders(boards, boardSetCount),
    flags = orders[0],
    row = orders[1][0],
    col = orders[1][1],
    pacesDown = orders[2],
    nPops = orders[3];

    // Three paths:

    if(flags[0] && !flags[2]) {// put another queen

        sceneModels.push(new queenModel(row, col));

    } else if(flags[1]) {// change a queen

        sceneModels[sceneModels.length-1].ty += pacesDown * 0.25;

    } else if (flags[2]) {// delete N queens and put new one or go back to empty

        for(var i = 0 ; i < nPops; i++) {
            sceneModels.pop();
        }

        if(flags[0]) {//Also add
            sceneModels.push(new queenModel(row, col));
        }

    } else {
        console.log("Error!");
    }

    // One step
    boardSetCount += 1;

}