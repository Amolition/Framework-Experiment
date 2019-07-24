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
let n = 0;





//When the page loads this sets all the buttons to inactive and calculates the height of each section.
window.onload = function () {
    progress_buttons[0].style = "background-color: #003e74; color: white;"

    for (i = 0; i < journey_pg.length; i++) {
        //console.log(journey_pgs)
        h = 0;
        n++;
        for (j = 0; j < (i + 1); j++) {
            //h+=parseFloat(journey_pg[j].scrollHeight)
            h += $("#" + journey_pg[j].id).outerHeight()
        }
        pg_heights.push(h)
    };

    let app = new Vue({
        el: "#app",
        data: {
            pg_heights: pg_heights,
            scrolling: 0, //position of the scrollbar
            isActive: {   //true for any active collapsable box
                'derivation_regroup': false, 
                'triangular': false,
                'triangular_byParts': false,
                'parabola': false,
                'parabola_byParts1': false,
                'parabola_byParts2': false,
                'dirac': false,
                'dirac_derivation': false,
                'square': false,
                'sawtooth': false,
                'sawtooth_byParts': false,
                'mod': false,
                'mod_byParts': false,
            },
            subVis: {
                'triangular': false,
                'parabola': false,
                'dirac': false,
                'square': false,
                'sawtooth': false,  
                'mod': false,
            },
           // boolean: false,
            current: 1,  //keeps track of the current section
        },
        methods: {
            OnScroll: function (event) {  //method called onScroll to check the section heights 
                                          //and change the colors of the buttons according to the position
                                          //on the page
                this.scrolling = parseFloat($(".container_journey").scrollTop());
                if (this.scrolling < this.pg_heights[0]) {
                    for (i=0;i<n;i++) {
                        if (i===0) {
                            progress_buttons[i].style = "background-color: #003e74; color: white;";
                        } else {
                            progress_buttons[i].style = "background-color: white; color: black;";
                        }
                    };
                    if (this.current!==1) {  //calls the function that draws the plotly graph for this section
                        main_0();
                        this.current = 1;
                    }
                } else if (this.scrolling<this.pg_heights[1]) {
                    for (i=0;i<n;i++) {
                        if (i===1) {
                            progress_buttons[i].style = "background-color: #003e74; color: white;";
                        } else {
                            progress_buttons[i].style = "background-color: white; color: black;";
                        }
                    };
                    if (this.current!==2) {
                        main_1();
                        this.current = 2;
                    }
                } else if (this.scrolling<this.pg_heights[2]) {
                    for (i=0;i<n;i++) {
                        if (i===2) {
                            progress_buttons[i].style = "background-color: #003e74; color: white;";
                        } else {
                            progress_buttons[i].style = "background-color: white; color: black;";
                        }
                    };
                    if (this.current!==3) {
                        this.current = 3;
                    }
                } else if (this.scrolling<this.pg_heights[3]) {
                    for (i=0;i<n;i++) {
                        if (i===3) {
                            progress_buttons[i].style = "background-color: #003e74; color: white;";
                        } else {
                            progress_buttons[i].style = "background-color: white; color: black;";
                        }
                    }
                    if (this.current!==4) {
                        this.current = 4;
                    }
                }
                this.pg_heights = []
                for (i = 0; i < journey_pg.length; i++) {
                    //console.log(journey_pgs)
                    h = 0
                    for (j = 0; j < (i + 1); j++) {
                        //h+=parseFloat(journey_pg[j].scrollHeight)
                        h += $("#" + journey_pg[j].id).outerHeight()
                    }
                    this.pg_heights.push(h)
                };
                //for (let key in this.subVis) {
                  //  this.boolean = this.boolean || subVis[key];
                  //  top = getElementById(key).scrollTop()
                  //  height = getElementById(key).outerHeight()
                //}
         
                
            },
            OnClick: function (section) {  //function to toggle collapsable divs on click
                this.isActive[section] = !this.isActive[section]   
            },
            Scroll: function (numb) {  //scroll to the right section
                journey_pg[numb-1].scrollIntoView({behavior:'smooth'})
            },
        },
        mounted: function () {
            document.addEventListener('scroll', this.OnScroll);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]); //reloads mathjax 
        },
        destroyed: function () {
            document.removeEventListener('scroll', this.OnScroll)
        }
    })
}



