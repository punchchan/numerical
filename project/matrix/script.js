// Function to create matrix inputs dynamically based on selected size
function createMatrixInputs() {
    const size = parseInt(document.getElementById("matrix-size").value);
    const matrixContainer = document.getElementById("matrix-container");

    // Clear any previous matrix inputs
    matrixContainer.innerHTML = '';

    let matrixInputs = '<table>';

    // Create matrix input fields
    for (let i = 0; i < size; i++) {
        matrixInputs += `<tr>`;
        for (let j = 0; j < size; j++) {
            matrixInputs += `<td><input type="number" id="a${i + 1}${j + 1}" step="0.01" required></td>`;
        }
        matrixInputs += `</tr>`;
    }

    matrixInputs += `</table>`;
    matrixContainer.innerHTML = matrixInputs;
}

// Function to handle the Matrix Inversion calculation
document.getElementById('matrix-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const size = parseInt(document.getElementById("matrix-size").value);
    const matrix = [];

    // Get matrix coefficients from input fields
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = parseFloat(document.getElementById(`a${i + 1}${j + 1}`).value) || 0;
        }
    }

    // Calculate the inverse matrix
    const inverseMatrix = matrixInverse(matrix);
    
    // Display the results
    displayResults(inverseMatrix);
    displayVariableValues(inverseMatrix); // Display values of x, y, z (or variables)
});

// Function to calculate the inverse of a matrix
function matrixInverse(matrix) {
    const size = matrix.length;
    let identityMatrix = [];
    
    // Create identity matrix
    for (let i = 0; i < size; i++) {
        identityMatrix[i] = [];
        for (let j = 0; j < size; j++) {
            identityMatrix[i][j] = (i === j) ? 1 : 0;
        }
    }

    // Augment the matrix with the identity matrix
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            identityMatrix[i][j] = matrix[i][j];
        }
    }

    // Perform Gauss-Jordan elimination to get the inverse matrix
    for (let i = 0; i < size; i++) {
        let diagonalElement = matrix[i][i];
        
        // Make the diagonal element 1
        for (let j = 0; j < size; j++) {
            matrix[i][j] /= diagonalElement;
            identityMatrix[i][j] /= diagonalElement;
        }

        // Eliminate all other elements in the column
        for (let k = 0; k < size; k++) {
            if (k !== i) {
                let factor = matrix[k][i];
                for (let j = 0; j < size; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                    identityMatrix[k][j] -= factor * identityMatrix[i][j];
                }
            }
        }
    }

    return identityMatrix;
}

// Function to display the inverse matrix in the result table
function displayResults(result) {
    const resultTable = document.getElementById("result-table");

    // Clear previous results
    resultTable.innerHTML = '';

    // Create table rows for the result
    for (let i = 0; i < result.length; i++) {
        let row = '<tr>';
        for (let j = 0; j < result[i].length; j++) {
            row += `<td>${result[i][j].toFixed(2)}</td>`;
        }
        row += '</tr>';
        resultTable.innerHTML += row;
    }
}

// Function to display calculated values (e.g., x, y, z) based on the inverse matrix
function displayVariableValues(inverseMatrix) {
    const variableValues = document.getElementById("variable-values");
    
    // Clear previous variable values
    variableValues.innerHTML = '<h3>Calculated Values:</h3>';

    // If the matrix size is 2x2, then we have 2 variables
    // For 3x3, we will calculate 3 variables (e.g., x, y, z)
    let size = inverseMatrix.length;
    let variableNames = ['x', 'y', 'z'];

    for (let i = 0; i < size; i++) {
        if (i < variableNames.length) {
            let value = inverseMatrix[i][0];  // Assuming we use the first column for variables
            variableValues.innerHTML += `<div>${variableNames[i]} = ${value.toFixed(2)}</div>`;
        }
    }
}
