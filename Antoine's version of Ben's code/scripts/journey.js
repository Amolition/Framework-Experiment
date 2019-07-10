let journey_pg = document.getElementsByClassName("journey_pg");
let progress_buttons = document.getElementsByClassName("progress_button")
let journey_cont = document.getElementById("journey_cont")
//let journey_pgs = $(".journey_pg").height();
let vis_pg = document.getElementsByClassName("vis_pg");
let i;
let j;
let scrolling;
let pg_heights = [];
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


window.onload = function () {
    progress_buttons[0].style = "background-color: #003e74; color: white;"

    for (i = 0; i < journey_pg.length; i++) {
        //console.log(journey_pgs)
        h = 0
        for (j = 0; j < (i + 1); j++) {
            //h+=parseFloat(journey_pg[j].scrollHeight)
            h += $("#" + journey_pg[j].id).outerHeight()
        }
        pg_heights.push(h)
    }

    let app = new Vue({
        el: "#app",
        data: {
            pg_heights: pg_heights,
            scrolling: 0,
            isActive: false,
        },
        methods: {
            OnScroll: function (event) {
                this.scrolling = parseFloat($(".container_journey").scrollTop());
                if (this.scrolling < pg_heights[0]) {
                    progress_buttons[0].style = "background-color: #003e74; color: white;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                } else if (this.scrolling<pg_heights[1]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: #003e74; color: white;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                } else if (this.scrolling<pg_heights[2]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: #003e74; color: white;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                } else if (this.scrolling<pg_heights[3]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: #003e74; color: white;";
                }
            },
            Scroll1: function (event) {
                journey_pg[0].scrollIntoView({behavior:"smooth"});
            },
            Scroll2: function (event) {
                journey_pg[1].scrollIntoView({behavior:"smooth"});
                //setTimeout(function(){
                //document.getElementById("journey_cont").scrollTop += 10;
            //}, 800); 
            },
            Scroll3: function (event) {
                journey_pg[2].scrollIntoView({behavior:"smooth"});
            },
            Scroll4: function (event) {
                journey_pg[3].scrollIntoView({behavior:"smooth"});
            },
        },
        mounted: function () {
            document.addEventListener('scroll', this.OnScroll)
        },
        destroyed: function () {
            document.removeEventListener('scroll', this.OnScroll)
        }
    })
}
