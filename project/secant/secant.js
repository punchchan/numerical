// secantMethod.js

// Function to parse and evaluate the mathematical expression
function evaluateFunction(func, x) {
    // Replace '^' with '**' for exponentiation in JavaScript
    const expression = func.replace(/x/g, `(${x})`).replace(/\^/g, '**');
    return eval(expression);
  }
  
  // Secant Method function
  function secantMethod(func, x0, x1, tolerance) {
    let iterations = 0;
    let x2;
  
    // Secant method loop
    while (true) {
      const fX0 = evaluateFunction(func, x0);
      const fX1 = evaluateFunction(func, x1);
  
      if (Math.abs(fX1 - fX0) < tolerance) {
        return { root: null, message: "Function values too close. No root found." };
      }
  
      x2 = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
      iterations++;
  
      if (Math.abs(x2 - x1) < tolerance) {
        break;
      }
  
      x0 = x1;
      x1 = x2;
    }
  
    return { root: x2.toFixed(6), iterations: iterations };  // Display root with 6 decimal places
  }
  
  // Form handling
  document.getElementById('secant-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const func = document.getElementById('function').value;
    const x0 = parseFloat(document.getElementById('x0').value);
    const x1 = parseFloat(document.getElementById('x1').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);
  
    // Perform Secant Method
    const result = secantMethod(func, x0, x1, tolerance);
  
    // Display result
    if (result.root !== null) {
      document.getElementById('root').textContent = `Root: ${result.root}`;
      document.getElementById('iterations').textContent = `Iterations: ${result.iterations}`;
    } else {
      document.getElementById('root').textContent = result.message;
      document.getElementById('iterations').textContent = "";
    }
  
    // Plot the graph
    plotGraph(func, x0 - 10, x1 + 10);
  });
  
  // Function to plot the graph using Chart.js
  function plotGraph(func, xMin, xMax) {
    const ctx = document.getElementById('graphCanvas').getContext('2d');
  
    // Generate x and y values for the graph
    const xValues = [];
    const yValues = [];
    for (let x = xMin; x <= xMax; x += 0.1) {  // Step size for smooth graph
      xValues.push(x.toFixed(2));  // Two decimal places for x axis labels
      yValues.push(evaluateFunction(func, x).toFixed(6));  // Six decimal places for y values
    }
  
    // Destroy the previous chart if it exists
    if (window.chart) {
      window.chart.destroy();
    }
  
    // Create new chart
    window.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: `f(x) = ${func}`,
          data: yValues,
          borderColor: '#a100e0',
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            title: { display: true, text: 'x' }
          },
          y: {
            title: { display: true, text: 'f(x)' }
          }
        }
      }
    });
  }
  