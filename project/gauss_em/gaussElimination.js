// Function to create matrix inputs dynamically based on selected size
function createMatrixInputs() {
  const size = parseInt(document.getElementById("matrix-size").value);
  const matrixContainer = document.getElementById("matrix-container");
  
  // Clear any previous matrix inputs
  matrixContainer.innerHTML = '';

  let matrixInputs = '<table>';

  // Create headers for matrix and constants (b)
  matrixInputs += `<thead><tr><th>Matrix Coefficients</th><th>Constants</th></tr></thead><tbody>`;

  // Create matrix input fields
  for (let i = 0; i < size; i++) {
      matrixInputs += `<tr>`;
      for (let j = 0; j < size; j++) {
          matrixInputs += `<td><input type="number" id="a${i + 1}${j + 1}" step="0.01" required></td>`;
      }
      matrixInputs += `<td><input type="number" id="b${i + 1}" step="0.01" required></td>`;
      matrixInputs += `</tr>`;
  }

  matrixInputs += `</tbody></table>`;
  matrixContainer.innerHTML = matrixInputs;
}

// Function to handle the Gauss Elimination method calculation
document.getElementById('gauss-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const size = parseInt(document.getElementById("matrix-size").value);
  const matrix = [];
  const constants = [];

  // Get matrix coefficients and constants from input fields
  for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
          matrix[i][j] = parseFloat(document.getElementById(`a${i + 1}${j + 1}`).value) || 0;
      }
      constants[i] = parseFloat(document.getElementById(`b${i + 1}`).value) || 0;
  }

  // Solve using Gauss Elimination Method
  const result = gaussElimination(matrix, constants);
  
  // Display the results
  displayResults(result);
});

// Gauss Elimination Method function
function gaussElimination(matrix, constants) {
  const size = matrix.length;

  // Augment matrix with constants (form the augmented matrix)
  for (let i = 0; i < size; i++) {
      matrix[i].push(constants[i]);
  }

  // Perform Gauss Elimination
  for (let i = 0; i < size; i++) {
      // Make the diagonal element 1
      let diagonalElement = matrix[i][i];
      for (let j = 0; j <= size; j++) {
          matrix[i][j] /= diagonalElement;
      }

      // Eliminate all other elements in the column
      for (let k = 0; k < size; k++) {
          if (k !== i) {
              let factor = matrix[k][i];
              for (let j = 0; j <= size; j++) {
                  matrix[k][j] -= factor * matrix[i][j];
              }
          }
      }
  }

  // Extract the solution from the augmented matrix (last column)
  const solutions = [];
  for (let i = 0; i < size; i++) {
      solutions.push(matrix[i][size].toFixed(2)); // Extract solutions
  }

  return solutions;
}

// Function to display results in the result table
function displayResults(results) {
  const xValue = document.getElementById("x-value");
  const yValue = document.getElementById("y-value");
  const zValue = document.getElementById("z-value");

  // Clear previous results
  xValue.innerHTML = '';
  yValue.innerHTML = '';
  zValue.innerHTML = '';

  // Display the results in table cells
  if (results.length >= 1) xValue.innerHTML = results[0];
  if (results.length >= 2) yValue.innerHTML = results[1];
  if (results.length >= 3) zValue.innerHTML = results[2];
}
