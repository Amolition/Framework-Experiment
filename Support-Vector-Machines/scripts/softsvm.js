// hardsvm.js
// Interative visualisation that demonstrates how a hard SVM works

var c  = 1.0;
var cValues = [0.01, 0.013, 0.018, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.3, 1.6, 2.0, 2.5, 3, 3.5, 4.0, 4.5, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 15.0, 20.0, 25.0, 30.0, 35.0, 40.0, 50.0, 60.0, 70.0, 80.0, 90.0, 100];
var ALPHA_LIMIT = 1e-4;
var mouseX = 0.0;
var mouseY = 0.0;
var shiftKeyDown = false;
var ctrlKeyDown = false; // For debugging
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
    x: [-3.8, 7, 2, 5, 6, 5, 9, 4, -5, -3, -7, -1, -3, -7, -1, -5.7, -1.34, 1.86, 2.79, 5.73, 9.86, 2.43, -2.39, -3.18, -0.94, 3.93, 3.67, 0.50, -4.41, -6.08, 7.67, 5.16, 3.31, -6.26, -1.91, -0.28, 3.89, 6.70, -3.62, -1.82, 2.08,-7.71],
    y: [-2.3, 6, 5, 3, 7, 2, 6, 2, 6, 8, 5, 8,8, 5, 8, 2.57, 0.98, -0.02, -0.85, -0.98, -2.043, -1.78, -0.32, 1.47, 2, 0.54, -3.14, -2.13, 0.11, 1.20, -3.18, -1.78, -1.69, 1.42, -1.16, -1.86, -3.62, -4.19, 2.48, 5.29, 1.95, 2.35],
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(0,0,255)'}
  },
  { // Orange Class Points
    name: 'Orange Class',
    x: [-1, 6, -6, -4, -4, -6, -7, -8, -1, 5, 8, 3, 1-4.94, -1.82, -3.01, -6.17, -7.53, -4.98,  3.71, 4.94, 2.70, 1.12, -2, -3.31, -6.39, -7.97, -0.15, 1.95, 4.06, 3.31, -0.46, -8.76, -6.35, 1.47, 6.35, 7.62, 7.97, 6.26, 3.23, -3.40, -1.73],
    y: [-1, -3, -7, -5, -4, -7.5, -1, -6, -5, -6.5, -8, -5, -8-1.64, -2.92, -5.64, -5.20, -3.71, -2.74, -4.90, -4.85, -4.02, -3.27, -2.17, -1.51, -0.85, -0.54, -4.11, -5.38, -6.26, -8.02, -6.57, -1.25, -2.65, -5.95, -5.78, -5.78, -7.45, -8.10, -7.14, -3.40, -4.32],
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(255,165,0)'},
  },
  {}, // wx + b = 0 line
  {}, // wx + b = 1 line
  {}, // wx + b = -1 line
  {}, // Blue Support Vector Points
  {}, // Orange Support Vector Points
]
var softSVMPlot = document.getElementById('softSVMPlot')

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
    if (c > 2) { // When c is high, it is more computationally complex so reduce number of iterations
      svm.train(data, labels, {C: c, numpasses: 20});
    } else {
      svm.train(data, labels, {C: c, numpasses: 100}); 
    }
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
      findSupportVectors(svm, dataBlue, dataOrange);
      if (ctrlKeyDown === true) {
        // Debug Stuff for viewing the alpha for each point
        let data = dataBlue.concat(dataOrange).map((el, i) => [el, svm.alpha[i]]);
        document.getElementById("alphas").innerHTML = data.map(el => (el[1] > ALPHA_LIMIT) ? "<br><b>Coordinates: (" + String([Math.round(el[0][0] *100) / 100, Math.round(el[0][1] *100) / 100]) + "), Alpha: " + String(Math.round(el[1] * 100000) / 100000) + "</b>" : "<br>Coordinates: (" + String([Math.round(el[0][0] *100) / 100, Math.round(el[0][1] *100) / 100]) + "), Alpha: " + String(Math.round(el[1] * 100000) / 100000)) ;
      } else {
        document.getElementById("alphas").innerHTML = "";
      }
      return traces;
    } else {
      return traces;
    }
}

// Creates the plot
$("#CSlider").val(38);
$("#CSliderDisplay").text(1.0);
Plotly.newPlot('softSVMPlot', runSVM(traces), layout);

// Checks whether a number is between two values
Number.prototype.between = function (min, max) {
  return this >= min && this <= max;
};

// Updates the plot
updatePlot = (traces) => {
    data = runSVM(traces);
    Plotly.animate(
        'softSVMPlot',
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
  if (x.between(softSVMPlot.layout.xaxis.range[0], softSVMPlot.layout.xaxis.range[1]) &&
    y.between(softSVMPlot.layout.yaxis.range[0], softSVMPlot.layout.yaxis.range[1])) {
      console.log('shift key down: ',shiftKeyDown)
      if (shiftKeyDown)  {
          Plotly.extendTraces(softSVMPlot, {x: [[x]], y: [[y]]}, [0]);
          updatePlot(traces);
      } else {
          Plotly.extendTraces(softSVMPlot, {x: [[x]], y: [[y]]}, [1]);
          updatePlot(traces);
      }
  }
});

// Whenever the mouse moves, it updates the mouseX and mouseY variables.
Plotly.d3.select(".plotly").on('mousemove', function(d, i) {
  let e = Plotly.d3.event;
  let bg = document.getElementsByClassName('nsewdrag drag')[0];
  mouseX = ((e.layerX - bg.attributes['x'].value + 4) / (bg.attributes['width'].value)) * (softSVMPlot.layout.xaxis.range[1] - softSVMPlot.layout.xaxis.range[0]) + softSVMPlot.layout.xaxis.range[0];
  mouseY = ((e.layerY - bg.attributes['y'].value + 4) / (bg.attributes['height'].value)) * (softSVMPlot.layout.yaxis.range[0] - softSVMPlot.layout.yaxis.range[1]) + softSVMPlot.layout.yaxis.range[1];
});

// Listens for whether the Shift Key is held down
$(document).on('keyup keydown', function(e){shiftKeyDown = e.shiftKey} );

// Listens for whether the Control Key is held down
$(document).on('keyup keydown', function(e){ctrlKeyDown = e.ctrlKey} );

// Update plot when slider is changed
$("input").each(function () {
  $(this).on('input', function(){
      $("#"+$(this).attr("id") + "Display").text( $(this).val() + $("#"+$(this).attr("id") + "Display").attr("data-unit") );
      c = cValues[parseFloat(document.getElementById('CSlider').value)];
      $("#CSlider").val(parseFloat(document.getElementById('CSlider').value));
      $("#CSliderDisplay").text(c);
      updatePlot(traces);
  });
});

$(function() {
  $('ul.tab-nav li a.button').click(function() {
      var href = $(this).attr('href');
      $('li a.active.button', $(this).parent().parent()).removeClass('active');
      $(this).addClass('active');
      $('.tab-pane.active', $(href).parent()).removeClass('active');
      $(href).addClass('active');

      updatePlot(traces); //re-initialise when tab is changed
      return false;
  });
});