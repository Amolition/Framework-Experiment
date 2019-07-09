let journey_pg = document.getElementsByClassName("journey_pg");
//let journey_pgs = $(".journey_pg").height();
let vis_pg = document.getElementsByClassName("vis_pg");
let i;
let j;
let scrolling;
let pg_heights=[];
let pg_heights2 = [];
let h;
let n;
let current = 0;

for (i=0; i<journey_pg.length; i++) {
    //console.log(journey_pgs)
    h=0;
    for (j=0; j<(i+1); j++) {
        //h+=parseFloat(journey_pg[j].scrollHeight)
        h+=$("#"+journey_pg[j].id).outerHeight()
    }
    pg_heights2.push(h);
    n++;
}





$(".container_journey").scroll(function () {
    alert('Hello World')
let y = $(this).scrollTop()//+ $("nav").outerHeight();

// function to return and assign number of paragraph at top of screen to x
function handleElement(para) {

    // update x if user scrolls past
    // the top edge of its corresponding paragraph on left side
    let top = $("#"+"section_"+para).offset().top;
    let bottom = top + $("#"+"section_"+para).outerHeight();
    if (y > top && y < bottom) {
        //$(x).fadeIn();
        x=para;
        //('.progress-bar').on('mouseenter', () => {
        $("#" + "sec" + para + "btn").css({
            backgroundColor: "#4afe82"
        //})
    })
    } else{
        $("#" + "sec" + para + "btn").css({
            backgroundColor: "#efefef"
    })}
    }


// iteration of function for all paragraphs
for(i=0; i<=n; i++)
handleElement(i);




});

window.onload = function() {
for (i=0; i<journey_pg.length; i++) {
    //console.log(journey_pgs)
    h=0;
    for (j=0; j<(i+1); j++) {
        //h+=parseFloat(journey_pg[j].scrollHeight)
        h+=$("#"+journey_pg[j].id).outerHeight()
    }
    pg_heights.push(h)
    console.log(pg_heights)
    if (i%2===1) {
        journey_pg[i].style = "background-color: #e3eae6";
    } else {
        //journey_pg[i].style = "background-color: #f7f7f7";
        journey_pg[i].style = "background-color:  #878787"
    }
}



let app = new Vue({
    el: "#app",
    data: {
        pg_heights: pg_heights,
        scrolling: 0,
    },
    methods: {
        OnScroll: function(event){
            this.scrolling = parseFloat($(".container_journey").scrollTop());
        }
    },
    mounted: function() {
        document.addEventListener('scroll', this.OnScroll)
      },
    destroyed: function() {
        document.removeEventListener('scroll', this.test)
    }
})
}

