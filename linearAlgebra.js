class Vector {
  constructor(contents) {
    this.contents = contents;
  }

  getElement(index) {
    return this.contents[index];
  }

  dotProduct(vector) {
    let sum = 0;
    for(let i = 0; i < this.contents.length; i++) {
      sum += this.contents[i] * vector.getElement(i);
    }
    return sum;
  }
}




class Matrix {
  constructor(contents) {
    // [
    //   [item1, item2, item3],
    //   [item4, item5, item6]
    // ... 
    // ]
    this.contents = contents;
    this.height = contents.length;
    this.width = contents[0].length;
  }

  getElement(row, column) {
    return this.contents[column][row];
  }

  getRow(row) {
    return new Vector(this.contents[row]);
  }

  getColumn(column) {
    let columnContents = [];
    for(let i = 0; i < this.contents.length; i++) {
      columnContents.push(this.contents[i][column])
    }
    return new Vector(columnContents);
  }

  multiply(matrix) {

    let newMatrix = [];
    for(let i = 0; i < this.height; i++) {
      let newRow = []
      let currentRow = this.getRow(i)
      for(let j = 0; j < this.width; j++) {
        newRow.push(currentRow.dotProduct(matrix.getColumn(j)));
      }
      newMatrix.push(newRow);
    }
    return new Matrix(newMatrix);
  }

  transpose() {
    let newMatrix = [];
    for(let i = 0; i < this.width; i++) {
      let newRow = [];
      for(let j = 0; j < this.height; j++) {
        newRow.push(this.getElement(i, j));
      }
      newMatrix.push(newRow);
    }
    return new Matrix(newMatrix);
  }

  str() {
    let string = "";
    for(let i = 0; i < this.contents.length; i++) {
      string = string.concat(this.contents[i].toString()).concat('\n');
    }
    return string;
  }
}


function IdentityMatrix(i) {
  let contents = []

  for(let j = 0; j < i; j++) {
    let row = [];
    for(let k = 0; k < i; k++) {
      if(j == k) {
        row.push(1);
      }
      else {
        row.push(0);
      }
    }
    contents.push(row);
  }
  return new Matrix(contents);
}

function ZeroMatrix(i) {
  let contents = []

  for(let j = 0; j < i; j++) {
    let row = [];
    for(let k = 0; k < i; k++) {
      row.push(0);
    }
    contents.push(row);
  }
  return new Matrix(contents);
}



module.exports = {
  Vector,
  Matrix,
  IdentityMatrix,
  ZeroMatrix
}