// Code for navigation functionality in visualisations main screen

// uses jQuery .load method instead of vue to load the one appropriate right panel with respect to paragraph on left panel
// right panels stored in separate html files which are called into main html as appropriate
// previous right panel is unloaded by overwriting right div

// import right div as jQuery object
let loadspace = $('#loadspace');
console.log(loadspace);

// declare global variables needed
let n=0;
let i;
let x=0;
let current1=0;
let current2=0;

// load first screen when web page first accessed
loadspace.load("loadout.html #loadout" + current1);

// calculate number of sections in left div
$(".section-container").each(function () {
    n++
});

console.log("n: "+n);

// function for creating event handlers to listen for respective sections reaching (and leaving) top of screen

function scrollfunc () {
    // measures top of journey div
    let y = $("#vis-title").outerHeight();
    // function to return and assign number of section at top of screen to x
    function handleElement(section) {

        // update x if user scrolls past
        // the top edge of its corresponding paragraph on left side
        if (section!==0) {
            let top = $("#"+"sc"+section).offset().top;
            let bottom = top + $("#"+"sc"+section).outerHeight();
            if (y > top && y < bottom) {
                //$(x).fadeIn();
                x = section;
            };
        } else {
            if (y < $("#sc1").offset().top) {
                x = section;
            }
        }
    };

    // iteration of function for all sections
    for(i=0; i<n; i++)
        handleElement(i);
};

// function to stick and unstick headers for each section
function stickyfunc() {

    if(current1 !== x) {

        if(x>=0) {

            //label old heading to unstick
            let unstick = $("#s"+(current1));
            current1=x;
            //label new heading to stick
            let stick = $("#s"+(x));

            unstick.css({
                position: "static"
            });
            stick.css({
                position: "fixed",
                top: "60px",
                width: "33vw"
            });
        };
    };
};

// function to load right panel for each section
function loadfunc() {

    if (current2 !== x) {
        console.log("x: " + x);
        console.log("current2: " + current2);

        current2 = x;

        $("#loadspace").fadeOut(600, function () {
            loadspace.load("loadout.html #loadout" + current2);
        });

        $("#loadspace").fadeIn(600);
    };
};

// call to functions on left "journey" panel with throttling/debouncing to prevent repeated calls
$(".journey").scroll(scrollfunc);
$(".journey").scroll($.throttle(stickyfunc, 10));
$(".journey").scroll($.debounce(loadfunc, 100));