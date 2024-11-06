// Create the matrix inputs based on selected size
function createMatrixInputs() {
  const size = parseInt(document.getElementById("matrix-size").value);
  const matrixContainer = document.getElementById("matrix-container");
  
  // Clear the previous content
  matrixContainer.innerHTML = '';

  let matrixInputs = '<table>';

  // Create headers for matrix and constants (b)
  matrixInputs += `<thead><tr><th>Matrix Coefficients</th><th>Constants</th></tr></thead><tbody>`;

  for (let i = 0; i < size; i++) {
      matrixInputs += `<tr>`;
      for (let j = 0; j < size; j++) {
          matrixInputs += `<td><label>a${i + 1}${j + 1}: </label><input type="number" id="a${i + 1}${j + 1}" step="0.01" required></td>`;
      }
      matrixInputs += `<td><label>b${i + 1}: </label><input type="number" id="b${i + 1}" step="0.01" required></td>`;
      matrixInputs += `</tr>`;
  }

  matrixInputs += `</tbody></table>`;
  matrixContainer.innerHTML = matrixInputs;
}

// Handle the Gauss-Jordan method calculation
document.getElementById('gauss-jordan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const size = parseInt(document.getElementById("matrix-size").value);
  const matrix = [];
  const constants = [];

  // Get coefficients from the input fields
  for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
          matrix[i][j] = parseFloat(document.getElementById(`a${i + 1}${j + 1}`).value) || 0;
      }
      constants[i] = parseFloat(document.getElementById(`b${i + 1}`).value) || 0;
  }

  // Solve the system using Gauss-Jordan method
  const result = gaussJordan(matrix, constants);
  
  // Display the result
  displayResults(result);
});

// Gauss-Jordan elimination method to solve system of equations
function gaussJordan(matrix, constants) {
  const size = matrix.length;

  // Augment the matrix with constants
  for (let i = 0; i < size; i++) {
      matrix[i].push(constants[i]);
  }

  // Perform Gauss-Jordan elimination
  for (let i = 0; i < size; i++) {
      // Make the diagonal element 1
      let diagonalElement = matrix[i][i];
      for (let j = 0; j <= size; j++) {
          matrix[i][j] /= diagonalElement;
      }

      // Make all other elements in the column 0
      for (let k = 0; k < size; k++) {
          if (k !== i) {
              let factor = matrix[k][i];
              for (let j = 0; j <= size; j++) {
                  matrix[k][j] -= factor * matrix[i][j];
              }
          }
      }
  }

  // The result is now in the last column of the matrix
  const solutions = [];
  for (let i = 0; i < size; i++) {
      solutions.push(matrix[i][size]); // Extract the solutions
  }

  return solutions;
}

// Display the results in the table
function displayResults(results) {
  const resultTable = document.getElementById("result-table");
  const xValue = document.getElementById("x-value");
  const yValue = document.getElementById("y-value");
  const zValue = document.getElementById("z-value");

  // Clear the previous results
  xValue.innerHTML = '';
  yValue.innerHTML = '';
  zValue.innerHTML = '';

  // Populate the results
  if (results.length >= 1) xValue.innerHTML = results[0].toFixed(2);
  if (results.length >= 2) yValue.innerHTML = results[1].toFixed(2);
  if (results.length >= 3) zValue.innerHTML = results[2].toFixed(2);
}
