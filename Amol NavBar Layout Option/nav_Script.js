// Code for loading and unloading right panel as left panel is scrolled

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

// function for creating event handlers to listen for respective sections reaching (and leaving) top of screen in view
// then load respective right panel (overwriting previous screen) when a new section comes to top of screen
// hence only one right panel loaded at a time

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
                //console.log("section: "+section);
                //console.log(section + " top: " + top);
                //console.log(section + " bottom: " + bottom);
                //console.log("y: "+y);
                //console.log("x: "+x);
                //console.log("current: "+current);
            };
        } else {
            if (y < $("#sc1").offset().top) {
                x = section;
                //console.log(section + " bottom: " + $("#sc1").offset().top);
            }
        }
    };

    // iteration of function for all sections
    for(i=0; i<n; i++)
        handleElement(i);
};


function stickyfunc() {

    if(current1 !== x) {

        //stick appropriate heading on left hand panel
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
        /*if(x===0) {

            //label old heading to unstick
            let unstick = $("#s"+(current));
            current=x;

            unstick.css({
                position: "static"
            });
        }*/

        // if x changes then old right panel changed to appropriate new right panel
        /*
        console.log("x: "+x);
        console.log("current: "+current);

        $("#loadspace").fadeOut(600, function() {loadspace.load("loadout.html #loadout" + current);});
        //loadspace.html("");
        //loadspace.load("test_div_" + "p" + current + ".html");
        $("#loadspace").fadeIn(600);
        */

    };
};

function loadfunc() {

    if (current2 !== x) {
        console.log("x: " + x);
        console.log("current2: " + current2);

        current2 = x;

        $("#loadspace").fadeOut(600, function () {
            loadspace.load("loadout.html #loadout" + current2);
        });
        //loadspace.html("");
        //loadspace.load("test_div_" + "p" + current + ".html");
        $("#loadspace").fadeIn(600);

    };
};


$(".journey").scroll(scrollfunc);
$(".journey").scroll($.throttle(stickyfunc, 50));
$(".journey").scroll($.throttle(loadfunc, 1000));

// legacy code - had issues with reloading right div for every scroll - fixed in above code

/*

});

$(document).scroll(function () {
    let y = $(this).scrollTop();
    // Show element after user scrolls past
    // the top edge of its parent
    $('#p1').each(function () {

        let top = $(this).offset().top;
        let bottom = top + $(this).outerHeight();
        if (y > top && y < bottom) {
            //$(x).fadeIn();
            loadspace.load("test_div_" + this.id + ".html");
        } else {
            //$(x).fadeOut();
            loadspace.html("");
        }
        //console.log(this.id)

    });
});

*/
