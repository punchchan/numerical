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
  
  function calculateRegression() {
    const numPoints = document.getElementById("numPoints").value;
    const xValues = [];
    const yValues = [];
  
    for (let i = 0; i < numPoints; i++) {
      xValues.push(parseFloat(document.getElementById(`x${i}`).value));
      yValues.push(parseFloat(document.getElementById(`y${i}`).value));
    }
  
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
  
    document.getElementById("solutionSteps").innerHTML = `
      <h3>Solution Steps:</h3>
      <p><strong>Sum of X:</strong> ${sumX}</p>
      <p><strong>Sum of Y:</strong> ${sumY}</p>
      <p><strong>Sum of X*Y:</strong> ${sumXY}</p>
      <p><strong>Sum of X^2:</strong> ${sumX2}</p>
      <p><strong>Slope (m):</strong> ${slope.toFixed(4)}</p>
      <p><strong>Intercept (b):</strong> ${intercept.toFixed(4)}</p>
    `;
  
    document.getElementById("result").innerHTML = `
      <h3>Linear Regression Equation:</h3>
      <p>y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}</p>
    `;
  
    plotGraph(xValues, yValues, slope, intercept);
  }
  
  function plotGraph(xValues, yValues, slope, intercept) {
    const ctx = document.getElementById('graphCanvas').getContext('2d');
    const regressionLine = xValues.map(x => ({
      x: x,
      y: slope * x + intercept
    }));
  
    const chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Data Points',
            data: xValues.map((x, i) => ({ x: x, y: yValues[i] })),
            backgroundColor: 'red',
            pointRadius: 5
          },
          {
            label: 'Regression Line',
            data: regressionLine,
            type: 'line',
            fill: false,
            borderColor: '#a100e0',
            tension: 0
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
  