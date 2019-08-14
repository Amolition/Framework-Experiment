// hardsvm.js
// Interative visualisation that demonstrates how a hard SVM works

var ALPHA_LIMIT = 1e-4;
var mouseX = 0.0;
var mouseY = 0.0;
var shiftKeyDown = false;
var layout = {
    width: 500, height: 500,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-10, 10], zeroline: true, title: "x"},
    yaxis: {range: [-10, 10], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
// Using traces = new Array(7); causes issues with plotly
var traces = [ 
  { // Blue Class Points
    name: 'Blue Class',
    x: [6, 3, 5, 8, 5, 9, 2, -5, -7, -2, -1],
    y: [6, 6, 3, 7, 2, 6, 5, 6, 9, 4, 8],
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(0,0,255)'}
  },
  { // Orange Class Points
    name: 'Orange Class',
    x: [-6, -3, -4, -6, -7, -2, -1, 4, 8, 3, 0],
    y: [-5, -5, -4, -7.5, -2, -6, -5, -6, -9, -4, -8],
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(255,165,0)'}
  },
  {}, // wx + b = 0 line
  {}, // wx + b = 1 line
  {}, // wx + b = -1 line
  {}, // Blue Support Vector Points
  {}, // Orange Support Vector Points
]
var hardSVMPlot = document.getElementById('hardSVMPlot')

// Takes the blue and orange data points and the svm and finds the support vectors
findSupportVectors = (svm, dataBlue, dataOrange) => {
  let supportVectorsBlue = [];
  let supportVectorsOrange = [];
  let supportVectorsBlueX = [];
  let supportVectorsBlueY = [];
  let supportVectorsOrangeX = [];
  let supportVectorsOrangeY =[];
  for (i = 0; i < dataBlue.length; i++) {
    if(svm.alpha[i]>ALPHA_LIMIT) {
      supportVectorsBlue.push([dataBlue[i][0], dataBlue[i][1]]);
    } 
  }
  for (i = 0; i < dataOrange.length; i++) {
    if(svm.alpha[dataBlue.length + i]>ALPHA_LIMIT) {
      supportVectorsOrange.push([dataOrange[i][0], dataOrange[i][1]]);
    } 
  }
  for (i = 0; i < supportVectorsBlue.length; i++) {
    supportVectorsBlueX.push(supportVectorsBlue[i][0]);
    supportVectorsBlueY.push(supportVectorsBlue[i][1]);
  }
  for (i = 0; i < supportVectorsOrange.length; i++) {
    supportVectorsOrangeX.push(supportVectorsOrange[i][0]);
    supportVectorsOrangeY.push(supportVectorsOrange[i][1]);
  }
  traces[5] = {
    name: 'Support Vector',
    x: supportVectorsBlueX,
    y: supportVectorsBlueY,
    mode: 'markers',
    type: 'scatter',
    marker: {size: 15, opacity: 1.0, color: 'rgb(0,0,255)'},
    opacity: 1.0
  }
  traces[6] = {
    name: 'Support Vector',
    x: supportVectorsOrangeX,
    y: supportVectorsOrangeY,
    mode: 'markers',
    type: 'scatter',
    marker: {size: 15, opacity: 1.0, color: 'rgb(255,165,0)'},
    opacity: 1.0
  }
  return;
}

// Trains the SVM using the data from the curent traces and draws the margins
runSVM = (traces) => {
  let xTermsBlue = traces[0].x;
  let yTermsBlue = traces[0].y;
  let xTermsOrange = traces[1].x;
  let yTermsOrange = traces[1].y;
  let labels = [];
  let dataBlue = xTermsBlue.map(function (e, i) { 
    return [e, yTermsBlue[i]];
  })
  let dataOrange = xTermsOrange.map(function (e, i) { 
    return [e, yTermsOrange[i]];
  })
  for (i = 0; i < dataBlue.length; i++) {
    labels.push(1);
  }
  for (i = 0; i < dataOrange.length; i++){
    labels.push(-1);
  }
  data = dataBlue.concat(dataOrange);
  if (dataBlue.length > 0 && dataOrange.length > 0) {
    let svm = new svmjs.SVM();
    svm.train(data, labels, {C: 0.0, numpasses: 100}); // C is a parameter to SVM
    console.log('Alphas:', svm.alpha);
    let wb = svm.getWeights();
    let xs= [-10, 10];
    let ys= [0, 0];
    let ys1 = [0, 0];
    let ysn1 = [0, 0];
    // wx + b = 0 line
    ys[0]= (-wb.b - wb.w[0] * xs[0]) / wb.w[1]; 
    ys[1]= (-wb.b - wb.w[0] * xs[1]) / wb.w[1];
    traces[2] = {
        x: [xs[0], xs[1]],
        y: [ys[0], ys[1]],
        mode: 'lines',
        type: 'scatter',
        line: {simplify: false, color: 'rgb(0,0,0)', width: 3},
        opacity: 0.55
      }
    // wx + b = 1 line
    ys1[0] = ys[0] - 1.0 / wb.w[1];
    ys1[1] = ys[1] - 1.0 / wb.w[1];
    traces[3] = {
        x: [xs[0], xs[1]],
        y: [ys1[0], ys1[1]],
        mode: 'lines',
        type: 'scatter',
        line: {simplify: false, color: 'rgb(0,0,0)', width: 3},
        opacity: 0.25
      }
    // wx + b = -1 line
    ysn1[0] = ys[0] + 1.0 / wb.w[1];
    ysn1[1] = ys[1] + 1.0 / wb.w[1];
    traces[4] = { 
        x: [xs[0], xs[1]],
        y: [ysn1[0], ysn1[1]],
        mode: 'lines',
        type: 'scatter',
        line: {simplify: false, color: 'rgb(0,0,0)', width: 3},
        opacity: 0.25
      }
      // Mark the Support Vectors so they are clearly identifiable (actually just puts a bigger marker on top of the existing ones.)
      console.log(dataBlue, dataOrange)
      findSupportVectors(svm, dataBlue, dataOrange);
      return traces;
    } else {
      return traces;
    }
}

// Creates the plot
Plotly.newPlot('hardSVMPlot', runSVM(traces), layout);

// Checks whether a number is between two values
Number.prototype.between = function (min, max) {
  return this >= min && this <= max;
};

// Updates the plot
updatePlot = (traces) => {
    data = runSVM(traces);
    console.log('Blue:', data[0], 'Orange:', data[1]);
    Plotly.animate(
        'hardSVMPlot',
        {data: data},
        {
            fromcurrent: true,
            transition: {duration: 0,},
            frame: {duration: 0, redraw: false,},
            mode: "afterall"
        }
    );
}

// On a click this function adds the x and y to either the blue or orange trace array
Plotly.d3.select(".plotly").on('click', function(d, i) {
  let x = mouseX;
  let y = mouseY;
  console.log("Click at X:"+x+" Y"+y);
  if (x.between(hardSVMPlot.layout.xaxis.range[0], hardSVMPlot.layout.xaxis.range[1]) &&
    y.between(hardSVMPlot.layout.yaxis.range[0], hardSVMPlot.layout.yaxis.range[1])) {
      console.log('shift key down: ',shiftKeyDown)
      if (shiftKeyDown)  {
          Plotly.extendTraces(hardSVMPlot, {x: [[x]], y: [[y]]}, [0]);
          updatePlot(traces);
      } else {
          Plotly.extendTraces(hardSVMPlot, {x: [[x]], y: [[y]]}, [1]);
          updatePlot(traces);
      }
  }
});

// Whenever the mouse moves, it updates the mouseX and mouseY variables.
Plotly.d3.select(".plotly").on('mousemove', function(d, i) {
  let e = Plotly.d3.event;
  let bg = document.getElementsByClassName('nsewdrag drag')[0];
  mouseX = ((e.layerX - bg.attributes['x'].value + 4) / (bg.attributes['width'].value)) * (hardSVMPlot.layout.xaxis.range[1] - hardSVMPlot.layout.xaxis.range[0]) + hardSVMPlot.layout.xaxis.range[0];
  mouseY = ((e.layerY - bg.attributes['y'].value + 4) / (bg.attributes['height'].value)) * (hardSVMPlot.layout.yaxis.range[0] - hardSVMPlot.layout.yaxis.range[1]) + hardSVMPlot.layout.yaxis.range[1];
});

// Listens for whether the Shift Key is held down
$(document).on('keyup keydown', function(e){shiftKeyDown = e.shiftKey} );
