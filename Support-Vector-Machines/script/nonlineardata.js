var layout = {
    width: 550, height: 550,
    margin: {l:30, r:30, t:30, b:30},
    hovermode: "closest",
    showlegend: false,
    xaxis: {range: [-10, 10], zeroline: true, title: "x"},
    yaxis: {range: [-10, 10], zeroline: true, title: "y"},
    aspectratio: {x:1, y:1}
};
var layout2 = {
  width: 550, height: 550,
  margin: {l:30, r:30, t:30, b:30},
  hovermode: "closest",
  showlegend: false,
  xaxis: {range: [-10, 10], zeroline: true, title: "x"},
  yaxis: {range: [-10, 10], zeroline: true, title: "y"},
  zaxis: {range: [-10, 10], zeroline: true, title: "z"},
  aspectratio: {x:1, y:1, z:1}
};
var layout3 = {
  width: 550, height: 550,
  margin: {l:30, r:30, t:30, b:30},
  hovermode: "closest",
  showlegend: false,
  xaxis: {range: [-100, 100], zeroline: true, title: "x"},
  yaxis: {range: [-100, 100], zeroline: true, title: "y"},
  zaxis: {range: [-100, 100], zeroline: true, title: "z"},
  aspectratio: {x:1, y:1, z:1}
};

var arrayXBlue = [7, 4, 5, 4, 7, 6, 9, -4, -5, -4, -3, -4, -9];
var arrayYBlue = [2, 2.5, 3, 8, 5, 6, 4, -7, -6, -7, -5, -4, -4];
var arrayXOrange = [8, 4, 7, 3, 8, 9, -7, -6, -3, -8, -6, -4, -6];
var arrayYOrange = [-3, -6, -7, -8, -3, -4, 5, 7, 8, 7, 4];

var arrayZ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var yVals = [];
var xVals = [];
var yVals1 = [];
var xVals1 = [];

for (i = -10; i < 0; i += 0.2) {
    yVals.push(i + 0.5)
    xVals.push(3 * (2 ** 0.5) / i + 0.5)
}
for (i = 0.2; i <= 10; i += 0.2) {
  yVals1.push(i - 0.6)
  xVals1.push(3 * (2 ** 0.5) / i - 0.5)
}


// Using traces = new Array(7); causes issues with plotly
var traces = [ 
  { // Blue Class Points
    name: 'Blue Class',
    x: arrayXBlue,
    y: arrayYBlue,
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(0,0,255)', size: 20}
  },
  { // Orange Class Points
    name: 'Orange Class',
    x: arrayXOrange,
    y: arrayYOrange,
    mode: 'markers',
    type: 'scatter',
    marker: {color: 'rgb(255,165,0)', size: 20}
  },
  {
    x: [-10, 2],
    y: [-3, 10],
    mode : 'lines',
    line: {color: 'rgb(0,100,0)'}
  },
  {
    x: [-4.3, 10],
    y: [10, -4.3],
    mode : 'lines',
    line: {color: 'rgb(0,255,255)'}
  },
  {
    x: [10, -5],
    y: [4, -10],
    mode : 'lines',
    line: {color: 'rgb(255,0, 255)'}
  },
  {
    x: [4, -10],
    y: [-10, 6],
    mode : 'lines',
    line: {color: 'rgb(255,0,0)'}
  },
  { // Blue Class Points
    name: 'Blue Class',
    x: arrayXBlue,
    y: arrayYBlue,
    z: arrayZ,
    mode: 'markers',
    type: 'scatter3d',
    marker: {color: 'rgb(0,0,255)', size: 14}
  },
  { // Orange Class Points
    name: 'Orange Class',
    x: arrayXOrange,
    y: arrayYOrange,
    z: arrayZ,
    mode: 'markers',
    type: 'scatter3d',
    marker: {color: 'rgb(255,165,0)', size: 14}
  },
  { // Blue Class Points
    name: 'Blue Class',
    x: arrayXBlue.map(el => el ** 2),
    y: arrayYBlue.map(el => el ** 2),
    z: arrayZ.map(function (el, i) {return (2 ** 0.5) * arrayXBlue[i] * arrayYBlue[i];}),
    mode: 'markers',
    type: 'scatter3d',
    marker: {color: 'rgb(0,0,255)', size: 14}
  },
  { // Orange Class Points
    name: 'Orange Class',
    x: arrayXOrange.map(el => el ** 2),
    y: arrayYOrange.map(el => el ** 2),
    z: arrayZ.map(function (el, i) {return (2 ** 0.5) * arrayXOrange[i] * arrayYOrange[i];}),
    mode: 'markers',
    type: 'scatter3d',
    marker: {color: 'rgb(255,165,0)', size: 14}
  },
  {
    x : [0, 0, 80, 80, 0],
    y : [0, 80, 80, 0, 0],
    z : [-14, -4, 6, -4, -14],
    type : 'mesh3d',
    opacity:0.8,
    color:'rgb(300,100,200)',
  },
  {
    x : [0, 0, 80, 80, 0],
    y : [0, 80, 80, 0, 0],
    z : [12, 22, 32, 22, 12],
    type : 'mesh3d',
    opacity:0.6,
    color:'rgb(200,200,200)',
  },
  {
    x : [0, 0, 80, 80, 0],
    y : [0, 80, 80, 0, 0],
    z : [-40, -30, -20, -30, -40],
    type : 'mesh3d',
    opacity:0.6,
    color:'rgb(200,200,200)',
  },
  {
    x: xVals,
    y: yVals,
    mode : 'lines',
    line: {color: 'rgb(255,0,0)'}
  },
  {
    x: xVals1,
    y: yVals1,
    mode : 'lines',
    line: {color: 'rgb(255,0,0)'}
  },
]

updatePlot = () => {
  let x = parseFloat(document.getElementById('number').value);
  console.log(x)

  switch(x) {
    case 0.0:
      Plotly.react('nonlinear', [traces[0], traces[1]], layout);
      document.getElementById("step").innerHTML = "First, we start out with out dataset that can't be classified using a linear classifier."
      document.getElementById("decrease").style.display = "none";
      document.getElementById("increase").style.display = "block";
      break;
    case 1.0:
      Plotly.react('nonlinear', [traces[0], traces[1], traces[2], traces[3], traces[4], traces[5]], layout);     
      document.getElementById("step").innerHTML = "You can see here that no matter how we try to split the data we cannot separate it with a linear classifier. We have to try a different approach." 
      document.getElementById("decrease").style.display = "block";
      document.getElementById("increase").style.display = "block";
      break;
    case 2.0:
      Plotly.react('nonlinear', [traces[6], traces[7]], layout2);   
      document.getElementById("step").innerHTML = "This approach involves projecting the plane from 2D to 3D. This will allow us to do the most important step."
      document.getElementById("decrease").style.display = "block";
      document.getElementById("increase").style.display = "block";
      break;
    case 3.0:
      Plotly.react('nonlinear', [traces[8], traces[9]], layout3);  
      document.getElementById("step").innerHTML = "That important step is to map each data point to another one in a higher dimension. There are many ways we could do this but we will use the following mapping: <br><img style=\"width:60%\" src=\"assets/mapping.PNG\"> <br>This is a simple mapping and it causes our data to become linearly separable!!"
      document.getElementById("decrease").style.display = "block";
      document.getElementById("increase").style.display = "block";
      break;
    case 4.0:
      Plotly.react('nonlinear', [traces[8], traces[9], traces[10], traces[11], traces[12]], layout3);
      document.getElementById("step").innerHTML = "Now that our data is linearly separable, we can carry use the SVM to find a plane that separates them."
      document.getElementById("decrease").style.display = "block";
      document.getElementById("increase").style.display = "block";
      break;
    case 5.0:
      Plotly.react('nonlinear', [traces[0], traces[1], traces[13], traces[14]], layout);
      document.getElementById("step").innerHTML = "The final step is to project the 3D plot back to 2D by and the final plot can be seen on the right. As you can see, a classifier has been found! Now you know the trick to using SVMs to classify not-linearly separable data, you just have to project it to a higher dimension where the data <b>IS</b> linearly separable. Create the SVM there, then project everything back to the original dimension."
      document.getElementById("decrease").style.display = "block";
      document.getElementById("increase").style.display = "none";
      break;
    default:
        break;
  }
}

function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
  updatePlot();
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
  updatePlot()
}

Plotly.newPlot('nonlinear', [traces[0], traces[1]], layout);
updatePlot();

document.getElementById("decrease").style.display = "none";
document.getElementById("increase").style.display = "block";
