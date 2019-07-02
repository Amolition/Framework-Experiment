let journey_pg = document.getElementsByClassName("journey_pg");
//let journey_pgs = $(".journey_pg").height();
let vis_pg = document.getElementsByClassName("vis_pg");
let i;
let scrolling;
let pg_heights=[];
let pg_heights2 = [];
let h;

window.onload = function() {
for (i=0; i<journey_pg.length; i++) {
    //console.log(journey_pgs)
    pg_heights2.push($("#"+journey_pg[i].id).offset().top);
    h=0
    for (j=0; j<(i+1); j++) {
        //h+=parseFloat(journey_pg[j].scrollHeight)
        h+=$("#"+journey_pg[j].id).outerHeight()
    }
    pg_heights.push(h)
    console.log(pg_heights)
    console.log(pg_heights2)
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