const Jimp = require('jimp');
const LA = require('./linearAlgebra');





// not working
async function dither(matrix) {
	let output = []
	
	let prev = -1;
	let start = 0;
	let debug = 0
	
	
	for(let y = 0; y < matrix.length; y++) {
		for(let x = 0; x < matrix.length; x++) {
			if(output[y] == undefined) {
				output[y] = []
			}
			
			
//			let index = i + (j*40)
			
			if(matrix[y][x] != prev || x == 39) {

				let diff = x-start
				
				let numDithers = Math.floor(diff / 5);
				if(numDithers != 0) {
					let baseDiff = Math.floor(diff/(numDithers))
					
					for(let k = 1; k < numDithers+1; k++) {
						let pos = start + (baseDiff * k);
						
						let yOffset = 0;
//						console.log(prev + ", " + x +", " +y +", "+ start + ", " + baseDiff)
//							debug++
//						
						if(y != 0 && matrix[y-1][x] == prev) {
							yOffset = -1;
						}
						else if(y != 39 && matrix[y+1][x] == prev) {
							yOffset = 1;
						}
						
						if(output[y+yOffset] == undefined) {
								output[y+yOffset] = []
							}
						
						if(prev == 0) {
							output[y+yOffset][pos] = 1
							
						}
						else {
							output[y+yOffset][pos] = 0
							
						}
					}
				}
				start = x
			}
			
			output[y][x] = matrix[y][x]
			prev = matrix[y][x]
			
			if(x == 39) {
				start = 0
				prev = -1
			}
		}
	}
	console.log(debug)
	return new LA.Matrix(output)
}



async function imageToMatrix(image, width, height) {
  let img = await Jimp.read(image.buffer) 
  img.resize(width, height)
  img.greyscale();
//	dither(img)
  const threshold = 128;

  let matrix = []
  img.scan(0, 0, width, height, (x, y, idx) => {
      const intensity = (img.bitmap.data[idx] + img.bitmap.data[idx + 1] + img.bitmap.data[idx + 2]) / 3;

      const color = intensity > threshold ? 1 : 0;
if(matrix[y] == undefined) {
        matrix[y] = []
      }
    matrix[y][x] = color;
	  
  });
	
  //return dither(matrix)
	return matrix;
}

module.exports = {
  imageToMatrix
}

