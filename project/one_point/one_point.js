// onePointIteration.js

// Function to parse and evaluate the mathematical expression
function evaluateFunction(func, x) {
    const expression = func.replace(/x/g, `(${x})`).replace(/\^/g, '**');
    return eval(expression);
  }
  
  // One-Point Iteration Method function
  function onePointIteration(func, initialGuess, tolerance) {
    let x0 = initialGuess;
    let iterations = 0;
    let x1;
  
    while (true) {
      x1 = evaluateFunction(func, x0);
      iterations++;
  
      // Check if the difference is within tolerance
      if (Math.abs(x1 - x0) < tolerance) {
        return { fixedPoint: x1.toFixed(6), iterations: iterations };  // Display root with 6 decimal places
      }
  
      x0 = x1;
    }
  }
  
  // Form handling
  document.getElementById('one-point-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const func = document.getElementById('function').value;
    const initialGuess = parseFloat(document.getElementById('initial-guess').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);
  
    // Perform One-Point Iteration
    const result = onePointIteration(func, initialGuess, tolerance);
  
    // Display result
    document.getElementById('fixed-point').textContent = `Fixed Point: ${result.fixedPoint}`;
    document.getElementById('iterations').textContent = `Iterations: ${result.iterations}`;
  
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
          label: `g(x) = ${func}`,
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
            title: { display: true, text: 'g(x)' }
          }
        }
      }
    });
  }
  