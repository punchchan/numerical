// newtonRaphson.js

// Function to parse and evaluate the mathematical expression
function evaluateFunction(func, x) {
    // Replace '^' with '**' for exponentiation in JavaScript
    const expression = func.replace(/x/g, `(${x})`).replace(/\^/g, '**');
    return eval(expression);
  }
  
  // Newton-Raphson Method function
  function newtonRaphsonMethod(func, derivative, initialGuess, tolerance) {
    let iterations = 0;
    let x0 = initialGuess;
    let x1;
  
    // Newton-Raphson method loop
    while (true) {
      const fX0 = evaluateFunction(func, x0);
      const fPrimeX0 = evaluateFunction(derivative, x0);
  
      if (Math.abs(fPrimeX0) < tolerance) {
        return { root: null, message: "Derivative too small. No root found." };
      }
  
      x1 = x0 - fX0 / fPrimeX0;
      iterations++;
  
      if (Math.abs(x1 - x0) < tolerance) {
        break;
      }
  
      x0 = x1;
    }
  
    return { root: x1.toFixed(6), iterations: iterations };  // Display root with 6 decimal places
  }
  
  // Form handling
  document.getElementById('newton-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const func = document.getElementById('function').value;
    const derivative = document.getElementById('derivative').value;
    const initialGuess = parseFloat(document.getElementById('initialGuess').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);
  
    // Perform Newton-Raphson Method
    const result = newtonRaphsonMethod(func, derivative, initialGuess, tolerance);
  
    // Display result
    if (result.root !== null) {
      document.getElementById('root').textContent = `Root: ${result.root}`;
      document.getElementById('iterations').textContent = `Iterations: ${result.iterations}`;
    } else {
      document.getElementById('root').textContent = result.message;
      document.getElementById('iterations').textContent = "";
    }
  
    // Plot the graph
    plotGraph(func, initialGuess - 10, initialGuess + 10);
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
  