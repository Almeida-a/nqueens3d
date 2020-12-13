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

// function getPositions() {
//     // TODO return set of positions for each queen
//     var fileContent = readFile();
// }