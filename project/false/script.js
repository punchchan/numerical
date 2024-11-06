// falsePosition.js

// Function to parse and evaluate the mathematical expression
function evaluateFunction(func, x) {
    // Replace '^' with '**' for exponentiation in JavaScript
    const expression = func.replace(/x/g, `(${x})`).replace(/\^/g, '**');
    return eval(expression);
  }
  
  // False Position Method function
  function falsePositionMethod(func, a, b, tolerance) {
    let iterations = 0;
    let c;
  
    // Check if a and b have opposite signs
    if (evaluateFunction(func, a) * evaluateFunction(func, b) >= 0) {
      return { root: null, message: "No root found in the given interval." };
    }
  
    // False Position method loop
    while (Math.abs(b - a) > tolerance) {
      c = (a * evaluateFunction(func, b) - b * evaluateFunction(func, a)) /
          (evaluateFunction(func, b) - evaluateFunction(func, a));
  
      const fC = evaluateFunction(func, c);
  
      if (Math.abs(fC) < tolerance) {
        // Root found within tolerance
        break;
      } else if (evaluateFunction(func, a) * fC < 0) {
        b = c;
      } else {
        a = c;
      }
      iterations++;
    }
  
    return { root: c.toFixed(6), iterations: iterations };  // Display root with 6 decimal places
  }
  
  // Form handling
  document.getElementById('false-position-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get input values
    const func = document.getElementById('function').value;
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);
  
    // Perform False Position Method
    const result = falsePositionMethod(func, a, b, tolerance);
  
    // Display result
    if (result.root !== null) {
      document.getElementById('root').textContent = `Root: ${result.root}`;
      document.getElementById('iterations').textContent = `Iterations: ${result.iterations}`;
    } else {
      document.getElementById('root').textContent = result.message;
      document.getElementById('iterations').textContent = "";
    }
  
    // Plot the graph
    plotGraph(func, a, b);
  });
  
  // Function to plot the graph using Chart.js
  function plotGraph(func, a, b) {
    const ctx = document.getElementById('graphCanvas').getContext('2d');
  
    // Generate x and y values for the graph
    const xValues = [];
    const yValues = [];
    for (let x = a; x <= b; x += 0.1) {  // Step size for smooth graph
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
  