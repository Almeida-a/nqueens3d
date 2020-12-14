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
    
    var posList = [];

    for(var i = 0 ; i < board.length ; i++){
        for(var j = 0; j < board[i].length; j++){

            console.assert(board.length == board[i].length, "Board is not squared!!");

            // Add [row, column] of squares that should have a queen
            if (board[i][j] == 1){
                posList.push([i, j]);
            }
        }
    }

    return posList;
}

function proceedOrders(i) {

		previousSet = getPositionsFromBoardMatrix(boards[i]);
		nextSet = getPositionsFromBoardMatrix(boards[i + 1]);

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
            flags[1] = true;

            // pacesUp
            orders[2] = nextSet[nextSet.length-1][0] - previousSet[previousSet.length-1][1];
        }
        else
        {
            flags[2] = true;

            // nPops
            orders[3] = previousSet.length - nextSet.length;
        }

        orders[0] = flags;
            
        return orders;

}

// Obsolete functions:

// // from https://www.tutorialspoint.com/how-to-read-and-write-a-file-using-javascript
// function readFile(fileName) {

//     var fs = require("fs");
//     console.log("Going to write into existing file");

//     // Open a new file with name input.txt and write Simply Easy Learning! to it.
//     fs.writeFile(fileName, 'Simply Easy Learning!', function(err) {

//         if (err) {
//             return console.error(err);
//         }
//         console.log("Data written successfully!");
//         console.log("Let's read newly written data");

//         // Read the newly written file and print all of its content on the console
//         fs.readFile(fileName, function (err, data) {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log("Asynchronous read: " + data.toString());
//         });

//     });
// }