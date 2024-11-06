function generateInputFields() {
    const numPoints = document.getElementById("numPoints").value;
    const pointsInput = document.getElementById("pointsInput");
    pointsInput.innerHTML = "";
  
    for (let i = 0; i < numPoints; i++) {
      pointsInput.innerHTML += `
        <div>
          <label>X${i + 1}:</label>
          <input type="number" id="x${i}" step="0.01" required>
          <label>Y${i + 1}:</label>
          <input type="number" id="y${i}" step="0.01" required>
        </div>
      `;
    }
  }
  
  function calculatePolynomial() {
    const numPoints = document.getElementById("numPoints").value;
    const xValues = [];
    const yValues = [];
    
    for (let i = 0; i < numPoints; i++) {
      xValues.push(parseFloat(document.getElementById(`x${i}`).value));
      yValues.push(parseFloat(document.getElementById(`y${i}`).value));
    }
  
    const dividedDiff = [];
    for (let i = 0; i < numPoints; i++) {
      dividedDiff[i] = [];
      dividedDiff[i][0] = yValues[i];
    }
  
    for (let j = 1; j < numPoints; j++) {
      for (let i = 0; i < numPoints - j; i++) {
        dividedDiff[i][j] = (dividedDiff[i + 1][j - 1] - dividedDiff[i][j - 1]) / (xValues[i + j] - xValues[i]);
      }
    }
  
    let polynomial = `P(x) = ${dividedDiff[0][0]}`;
    let currentTerm = "";
    for (let j = 1; j < numPoints; j++) {
      currentTerm += `(x - ${xValues[j - 1]})`;
      polynomial += ` + ${dividedDiff[0][j]} * ${currentTerm}`;
    }
  
    document.getElementById("solutionSteps").innerHTML = `<h3>Solution Steps:</h3><pre>${displayDividedDifferences(dividedDiff, xValues)}</pre>`;
    document.getElementById("result").innerHTML = `<h3>Newton Polynomial:</h3><p>${polynomial}</p>`;
    
    plotGraph(xValues, yValues, dividedDiff);
  }
  
  function displayDividedDifferences(table, xValues) {
    let tableStr = "Divided Differences Table:\n";
    tableStr += "X\t";
    for (let j = 0; j < table[0].length; j++) {
      tableStr += `f[${" ,".repeat(j)}]\t`;
    }
    tableStr += "\n";
  
    for (let i = 0; i < table.length; i++) {
      tableStr += `${xValues[i]}\t`;
      for (let j = 0; j < table[i].length; j++) {
        tableStr += `${table[i][j].toFixed(4)}\t`;
      }
      tableStr += "\n";
    }
    return tableStr;
  }
  
  function plotGraph(xValues, yValues, dividedDiff) {
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    const polynomialPoints = [];
    for (let x = Math.min(...xValues) - 1; x <= Math.max(...xValues) + 1; x += 0.1) {
      let y = dividedDiff[0][0];
      let term = 1;
      for (let i = 1; i < dividedDiff.length; i++) {
        term *= (x - xValues[i - 1]);
        y += dividedDiff[0][i] * term;
      }
      polynomialPoints.push({ x: x, y: y });
    }
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: polynomialPoints.map(p => p.x.toFixed(1)),
        datasets: [
          {
            label: 'Newton Polynomial',
            data: polynomialPoints.map(p => p.y),
            fill: false,
            borderColor: '#a100e0',
            tension: 0.1
          },
          {
            label: 'Data Points',
            data: yValues,
            backgroundColor: 'red',
            type: 'scatter',
            pointRadius: 4,
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }
  