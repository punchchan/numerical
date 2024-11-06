function createMatrix() {
  const size = document.getElementById("matrix-size").value;
  const matrixContainer = document.getElementById("matrix-container");
  const constantsContainer = document.getElementById("constants-container");
  
  matrixContainer.innerHTML = "";
  constantsContainer.innerHTML = "";
  
  let matrixTable = `<table>`;
  
  for (let i = 0; i < size; i++) {
      matrixTable += "<tr>";
      for (let j = 0; j < size; j++) {
          matrixTable += `<td><input type="number" id="a${i}${j}" placeholder="a${i+1}${j+1}"></td>`;
      }
      matrixTable += "</tr>";
  }
  
  matrixTable += "</table>";
  
  matrixContainer.innerHTML = matrixTable;

  let constantsInputs = `<h3>Enter constants:</h3>`;
  constantsInputs += `<div>`;
  for (let i = 0; i < size; i++) {
      constantsInputs += `<label for="b${i}">b${i+1}: </label><input type="number" id="b${i}" placeholder="b${i+1}"><br>`;
  }
  constantsInputs += `</div>`;
  
  constantsContainer.innerHTML = constantsInputs;
}

function calculate() {
  const size = document.getElementById("matrix-size").value;
  const matrix = [];
  const constants = [];
  
  for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
          matrix[i][j] = parseFloat(document.getElementById(`a${i}${j}`).value) || 0;
      }
  }

  for (let i = 0; i < size; i++) {
      constants[i] = parseFloat(document.getElementById(`b${i}`).value) || 0;
  }

  // คำนวณ Determinant (D) และ D_x, D_y, D_z (หากเป็น 3x3)
  const D = determinant(matrix);
  
  if (D === 0) {
      document.getElementById("result").innerHTML = "No unique solution (Determinant is 0)";
      return;
  }

  // คำนวณค่า Dx, Dy, Dz (หากเป็น 3x3)
  let solutions = `Determinant (D) = ${D}<br>`;
  for (let i = 0; i < size; i++) {
      let matrixCopy = JSON.parse(JSON.stringify(matrix));
      for (let j = 0; j < size; j++) {
          matrixCopy[j][i] = constants[j]; // แทนที่คอลัมน์ที่ i ด้วยค่า constants
      }
      const Dx = determinant(matrixCopy);
      solutions += `D_${i+1} = ${Dx}<br>`;
  }
  
  // คำนวณค่า x, y, z
  let solutionStr = "";
  for (let i = 0; i < size; i++) {
      let matrixCopy = JSON.parse(JSON.stringify(matrix));
      for (let j = 0; j < size; j++) {
          matrixCopy[j][i] = constants[j];
      }
      const Dx = determinant(matrixCopy);
      const value = Dx / D;
      solutionStr += `x${i+1} = ${value}<br>`;
  }

  document.getElementById("result").innerHTML = solutions + solutionStr;
}

// คำนวณ Determinant ของเมทริกซ์ (สำหรับกรณี 2x2 หรือ 3x3)
function determinant(matrix) {
  const size = matrix.length;

  // สำหรับ 2x2
  if (size === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  // สำหรับ 3x3
  if (size === 3) {
      return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])
          - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])
          + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
  }

  return 0;
}
