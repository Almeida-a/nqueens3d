//////////////////////////////////////////////////////////////////////////////
//
//  For instantiating the scene models.
//
//  J. Madeira - November 2018
//
//	Adapted by André Almeida 2020
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
// Global Variables
//

var N = 5,  themes = {
	"bronze":{
		"kAmbi":[0.21, 0.13, 0.05],
		"kDiff":[0.71, 0.43, 0.18],
		"kSpec":[0.39, 0.27, 0.17],
		"nPhong": 25.6
	},
	"bronzePolido":{
		"kAmbi":[0.25, 0.15, 0.06],
		"kDiff":[0.4, 0.24, 0.1],
		"kSpec":[0.77, 0.46, 0.2],
		"nPhong": 76.8
	},
	"cobre":{
		"kAmbi":[0.19, 0.07, 0.02],
		"kDiff":[0.7, 0.27, 0.08],
		"kSpec":[0.26, 0.14, 0.08],
		"nPhong": 12.8
	},
	"cobrePolido":{
		"kAmbi":[0.23, 0.08, 0.03],
		"kDiff":[0.55, 0.21, 0.07],
		"kSpec":[0.58, 0.22, 0.07],
		"nPhong": 51.2
	},
	"cromio":{
		"kAmbi":[0.25, 0.25, 0.25],
		"kDiff":[0.4, 0.4, 0.4],
		"kSpec":[0.77, 0.77, 0.77],
		"nPhong": 76.8
	},
	"latao":{
		"kAmbi":[0.33, 0.22, 0.03],
		"kDiff":[0.78, 0.57, 0.11],
		"kSpec":[0.99, 0.94, 0.81],
		"nPhong": 27.9
	},
	"ouro":{
		"kAmbi":[0.25, 0.20, 0.07],
		"kDiff":[0.75, 0.60, 0.23],
		"kSpec":[0.63, 0.56, 0.37],
		"nPhong": 51.2
	},
	"ouroPolido":{
		"kAmbi":[0.25, 0.22, 0.06],
		"kDiff":[0.35, 0.31, 0.09],
		"kSpec":[0.80, 0.73, 0.21],
		"nPhong": 83.2
	},
	"prataPolida":{
		"kAmbi":[0.23, 0.23, 0.23],
		"kDiff":[0.28, 0.28, 0.28],
		"kSpec":[0.77, 0.77, 0.77],
		"nPhong": 89.6
	},
	"plasticoVermelho":{
		"kAmbi":[0.3, 0.0, 0.0],
		"kDiff":[0.6, 0.0, 0.0],
		"kSpec":[0.8, 0.6, 0.6],
		"nPhong": 32.0
	},
	"azulMBrilhante":{
		"kAmbi":[0.0, 0.0, 0.5],
		"kDiff":[0.0, 0.0, 1.0],
		"kSpec":[1.0, 1.0, 1.0],
		"nPhong": 125.0
	},
	"cinzento":{
		"kAmbi":[0.1, 0.1, 0.1],
		"kDiff":[0.5, 0.5, 0.5],
		"kSpec":[0.7, 0.7, 0.7],
		"nPhong": 1.0
	}
}; // Length of the board side

//----------------------------------------------------------------------------
//
//  Constructors
//

function emptyModelFeatures() {

	// EMPTY MODEL

	this.vertices = [];

	this.normals = [];

	// Transformation parameters

	// Displacement vector
	
	this.tx = 0.0;
	
	this.ty = 0.0;
	
	this.tz = 0.0;	
	
	// Rotation angles	
	
	this.rotAngleXX = 0.0;
	
	this.rotAngleYY = 0.0;
	
	this.rotAngleZZ = 0.0;	

	// Scaling factors
	
	this.sx = 1.0;
	
	this.sy = 1.0;
	
	this.sz = 1.0;		
	
	// Animation controls
	
	this.rotXXOn = false;
	
	this.rotYYOn = false;
	
	this.rotZZOn = false;
	
	this.rotXXSpeed = 1.0;
	
	this.rotYYSpeed = 1.0;
	
	this.rotZZSpeed = 1.0;
	
	this.rotXXDir = 1;
	
	this.rotYYDir = 1;
	
	this.rotZZDir = 1;
	
	// Material features
	
	this.kAmbi = [ 0.2, 0.2, 0.2 ];
	
	this.kDiff = [ 0.7, 0.7, 0.7 ];

	this.kSpec = [ 0.7, 0.7, 0.7 ];

	this.nPhong = 100;
}

function singleTriangleModel( ) {
	
	var triangle = new emptyModelFeatures();
	
	// Default model has just ONE TRIANGLE

	triangle.vertices = [

		// FRONTAL TRIANGLE
		 
		-0.5, -0.5,  0.5,
		 
		 0.5, -0.5,  0.5,
		 
		 0.5,  0.5,  0.5,
	];

	triangle.normals = [

		// FRONTAL TRIANGLE
		 
		 0.0,  0.0,  1.0,
		 
		 0.0,  0.0,  1.0,
		 
		 0.0,  0.0,  1.0,
	];

	return triangle;
}

function tile( x, y, z, themeKey ) {
	
	var tile = new emptyModelFeatures();
	
	// Tile model: from a starting point, produce a square 1x1 tile, parallel to plane x0y, in ccw

	tile.vertices = [
			// Top triangle
			x,   y,   z,
			x+1, y,   z,
			x+1, y+1, z,

			// Bottom triangle
			x,   y,   z,
			x+1, y+1, z,
			x,   y+1, z
	];

	// Don't know how this works yet, might need ajustments later, TODO check
	triangle.normals = [

		// FRONTAL TRIANGLE
		 
		 0.0,  0.0,  1.0,
		 
		 0.0,  0.0,  1.0,
		 
		 0.0,  0.0,  1.0,
	];

	tile.kAmbi = themes[themeKey]["kAmbi"];
	tile.kSpec = themes[themeKey]["kSpec"];
	tile.kDiff = themes[themeKey]["kDiff"];
	tile.nPhong = themes[themeKey]["nPhong"];
	

	return tile;
}

function simpleCubeModel( ) {
	
	var cube = new emptyModelFeatures();
	
	cube.vertices = [

		-1.000000, -1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
		-1.000000,  1.000000,  1.000000, 
		-1.000000, -1.000000,  1.000000,
		 1.000000, -1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
         1.000000, -1.000000,  1.000000, 
		 1.000000, -1.000000, -1.000000, 
		 1.000000,  1.000000, -1.000000, 
         1.000000, -1.000000,  1.000000, 
         1.000000,  1.000000, -1.000000, 
         1.000000,  1.000000,  1.000000, 
        -1.000000, -1.000000, -1.000000, 
        -1.000000,  1.000000, -1.000000,
         1.000000,  1.000000, -1.000000, 
        -1.000000, -1.000000, -1.000000, 
         1.000000,  1.000000, -1.000000, 
         1.000000, -1.000000, -1.000000, 
        -1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000,  1.000000,  1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000, -1.000000, -1.000000,
		 1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		 1.000000, -1.000000, -1.000000, 
		 1.000000, -1.000000,  1.000000, 	 
	];

	computeVertexNormals( cube.vertices, cube.normals );

	return cube;
}


function cubeModel( subdivisionDepth = 0 ) {
	
	var cube = new simpleCubeModel();
	
	midPointRefinement( cube.vertices, subdivisionDepth );
	
	computeVertexNormals( cube.vertices, cube.normals );
	
	return cube;
}


function simpleTetrahedronModel( ) {
	
	var tetra = new emptyModelFeatures();
	
	tetra.vertices = [

		-1.000000,  0.000000, -0.707000, 
         0.000000,  1.000000,  0.707000, 
         1.000000,  0.000000, -0.707000, 
         1.000000,  0.000000, -0.707000, 
         0.000000,  1.000000,  0.707000, 
         0.000000, -1.000000,  0.707000, 
        -1.000000,  0.000000, -0.707000, 
         0.000000, -1.000000,  0.707000, 
         0.000000,  1.000000,  0.707000, 
        -1.000000,  0.000000, -0.707000, 
         1.000000,  0.000000, -0.707000, 
         0.000000, -1.000000,  0.707000,
	];

	computeVertexNormals( tetra.vertices, tetra.normals );

	return tetra;
}


function tetrahedronModel( subdivisionDepth = 0 ) {
	
	var tetra = new simpleTetrahedronModel();
	
	midPointRefinement( tetra.vertices, subdivisionDepth );
	
	computeVertexNormals( tetra.vertices, tetra.normals );
	
	return tetra;
}


function sphereModel( subdivisionDepth = 2 ) {
	
	var sphere = new simpleCubeModel();
	
	midPointRefinement( sphere.vertices, subdivisionDepth );
	
	moveToSphericalSurface( sphere.vertices )
	
	computeVertexNormals( sphere.vertices, sphere.normals );
	
	return sphere;
}

function boardModel(themeKey) {

	var x0, y0,
		offset, odd;
	
	var board = new emptyModelFeatures();

	square = [
			// Top triangle
			0, 0, 0,
			1, 0, 0,
			1, 1, 0,

			// Bottom triangle
			0, 0, 0,
			1, 1, 0,
			0, 1, 0
	];

	if(N % 2 == 0) {

		odd = 0;
		offset = 0;

	} else {
		
		odd = 1;
		offset = -0.5;

	}

	var themeIndex = 0;

	var twoThemes = [
		 "latao", // Bright (Latão) - Later to be programmable
		 "cobre" // Dark (Cobre) - Later to be programmable
		];

	half = Math.floor(N/2);
	x0 = y0 = range(-half, half - 1 + odd);

	var z = 0;

	for(var ix = 0; ix < x0.length; ix++){
		for(var iy = 0; iy < y0.length; iy++){

			// Switch theme
			themeIndex = + !themeIndex;
			
			// For each point
			for(var i = 0; i < 6; i++){
				
				board.vertices.push(
					square[i*3 ]  + x0[ix] + offset,
					square[i*3+1] + y0[iy] + offset,
					square[i*3+2] + z
				);
				
			}
		}
	}

	console.log(board.kAmb);

	if(themeKey!=""){
		board.kAmbi = themes[themeKey].kAmbi;
		board.kSpec = themes[themeKey].kSpec;
		board.kDiff = themes[themeKey].kDiff;
		board.nPhong = themes[themeKey].nPhong;
	} else {
		board.kAmbi = [1.0, 0.0, 0.0];
		board.kSpec = [0.0, 1.0, 0.0];
		board.kDiff = [0.0, 1.0, 1.0];
	}

	computeVertexNormals(board.vertices, board.normals);

	return board;

}

function queenModel( ) {
	
	var queen = new emptyModelFeatures();
	
	queen.vertices = [

		-1.000000, -1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
		-1.000000,  1.000000,  1.000000, 
		-1.000000, -1.000000,  1.000000,
		 1.000000, -1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
         1.000000, -1.000000,  1.000000, 
		 1.000000, -1.000000, -1.000000, 
		 1.000000,  1.000000, -1.000000, 
         1.000000, -1.000000,  1.000000, 
         1.000000,  1.000000, -1.000000, 
         1.000000,  1.000000,  1.000000, 
        -1.000000, -1.000000, -1.000000, 
        -1.000000,  1.000000, -1.000000,
         1.000000,  1.000000, -1.000000, 
        -1.000000, -1.000000, -1.000000, 
         1.000000,  1.000000, -1.000000, 
         1.000000, -1.000000, -1.000000, 
        -1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000,  1.000000,  1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000, -1.000000, 
		-1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000,  1.000000, 
		 1.000000,  1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		-1.000000, -1.000000, -1.000000,
		 1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000,  1.000000, 
		 1.000000, -1.000000, -1.000000, 
		 1.000000, -1.000000,  1.000000, 	 
	];

	computeVertexNormals( queen.vertices, queen.normals );

	return queen;
}

//----------------------------------------------------------------------------
//
//  Instantiating scene models
//

var sceneModels = [];

// Model 0 --- Piece (old code TODO change)

// sceneModels.push( new simpleCubeModel() );

// sceneModels[0].sx = 0.1; sceneModels[0].sy = 0.75; sceneModels[0].sz = 0.1;

// Model 1 --- Board1

sceneModels.push( new boardModel("cromio") );

sceneModels[0].sx = 0.12; sceneModels[0].sy = 0.12; sceneModels[0].sz = 0.12;

sceneModels[0].tx = -0.5;

// Model 2 --- Board2

sceneModels.push( new boardModel("") );

sceneModels[1].sx = 0.12; sceneModels[1].sy = 0.12; sceneModels[1].sz = 0.12;

sceneModels[1].tx = 0.5;



