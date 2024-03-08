loomDriver = require('./loomDriver.js');



driver = new loomDriver.LoomDriver('/dev/cu.usbmodem14101');



async function initialize() {
  console.log("Driver initializing");
  await driver.open();
}

async function drawMatrix(matrix, row) {
  let elements = matrix.getRow(row).contents;
  let size = elements.length
  if(size != 40) {
    return false;
  }
  
  for(let i = 0; i < size; i++) {
    if(elements[i] == 1) {
	console.log(i);
      await driver.move_to_heddle(i);
      await driver.strike();
    }
  }
  await driver.serial.send('G28');
  return true;
}


module.exports = {
  initialize,
  drawMatrix
}