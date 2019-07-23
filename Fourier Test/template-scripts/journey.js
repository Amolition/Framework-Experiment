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
    };

    let app = new Vue({
        el: "#app",
        data: {
            pg_heights: pg_heights,
            scrolling: 0,
            isActive: {
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
            current: 1,
        },
        methods: {
            OnScroll: function (event) {
                this.scrolling = parseFloat($(".container_journey").scrollTop());
                if (this.scrolling < this.pg_heights[0]) {
                    progress_buttons[0].style = "background-color: #003e74; color: white;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                    if (this.current!==1) {
                        main_0();
                        this.current = 1;
                    }
                } else if (this.scrolling<this.pg_heights[1]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: #003e74; color: white;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                    if (this.current!==2) {
                        main_1();
                        this.current = 2;
                    }
                } else if (this.scrolling<this.pg_heights[2]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: #003e74; color: white;";
                    progress_buttons[3].style = "background-color: white; color: black;";
                    if (this.current!==3) {
                        this.current = 3;
                    }
                } else if (this.scrolling<this.pg_heights[3]) {
                    progress_buttons[0].style = "background-color: white; color: black;";
                    progress_buttons[1].style = "background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: white; color: black;";
                    progress_buttons[3].style = "background-color: #003e74; color: white;";
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
                
            },
            OnClick: function (section) {
                this.isActive[section] = !this.isActive[section]   
            },
            Scroll: function (numb) {
                journey_pg[numb-1].scrollIntoView({behavior:'smooth'})
            },
        },
        mounted: function () {
            document.addEventListener('scroll', this.OnScroll);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
        },
        destroyed: function () {
            document.removeEventListener('scroll', this.OnScroll)
        }
    })
}
