/* goals 2019/07/19
* fix the scrolling problem
* try to incorporate the transition animation between pages and sections
* simplify coding
* colorful loading bar
* section name hover
* */
let journey_pg = document.getElementsByClassName("journey_pg");
let progress_buttons = document.getElementsByClassName("progress_button");
let section_titles = document.getElementsByClassName('section_title');
let journey_cont = document.getElementById("journey_cont");
//let journey_pgs = $(".journey_pg").height();
let vis_pg = document.getElementsByClassName("vis_pg");
let i;
let scrolling;
let pg_heights = [];
let pg_heights2 = [];
let h;

/*import VueMathjax from 'vue-mathjax'
    Vue.use(VueMathjax)*/


window.onload = function () {


    for (i = 0; i < journey_pg.length; i++) {
        //console.log(journey_pgs)
        pg_heights2.push($("#" + journey_pg[i].id).offset().top);
        h = 0;
        for (j = 0; j < (i + 1); j++) {
            //h+=parseFloat(journey_pg[j].scrollHeight)
            h += $("#" + journey_pg[j].id).height()
        }
        pg_heights.push(h);
        console.log('p:' + pg_heights);
        console.log('p2:'+ pg_heights2);
        console.log('h:' + h)
    }

    /*for (i=0 ; i < pg_heights.length; i++){
               if(){this.navBarFixed1 = true}
    }
    */
    /* re-calculate the height of each section after clicking to show the hidden content */
    $(function () {
        function updateHeight() {
            pg_heights=[];
            for (i = 0; i < journey_pg.length; i++) {
                //console.log(journey_pgs)
                //pg_heights2.push($("#" + journey_pg[i].id).offset().top);
                h = 0;
                for (j = 0; j < (i + 1); j++) {
                    //h+=parseFloat(journey_pg[j].scrollHeight)
                    h += $("#" + journey_pg[j].id).outerHeight()
                }
                pg_heights.push(h);
                console.log('newp:' + pg_heights);
        console.log('newh:' + h)

            }
        }
        // call the update function each time you click the button
        $(".derivation_collapse").on('click', () => {
            updateHeight()
        })

    });



    let app = new Vue({
        el: "#app",
        data: {
            pg_heights: pg_heights,
            scrolling: 0,
            // set the initial boolean value of the hidden contents
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            show6: false,
            show7: false,
            show8: false,
            show9: false,
            show10: false,
            showpage1: false,
            showpage2: false,
            showpage3: false,
            showpage4: false,
            showpage5: false,
            currentsec: 0,
            active1: false,
            active2: false,
            active3: false,
            active4: false,
            active5: false,
            lock: true,
            
        },
        methods: {
            OnScroll: function (event) {
                this.scrolling = parseFloat($(".container_journey").scrollTop());

                // need simplification

                if (this.scrolling < pg_heights[0]) {
                    if(this.lock){
                        this.currentsec=1;
                    }

                    progress_buttons[0].style = "background-color: #ccffff";//; color: white;";
                    /*progress_buttons[1].style = "background-color: white;" //"background-color: white; color: black;";
                    progress_buttons[2].style = "background-color: white;";
                    progress_buttons[3].style = "background-color: white;";*/

                    progress_buttons[1].style = "inherit";
                    progress_buttons[2].style = "inherit";
                    progress_buttons[3].style = "inherit";
                    progress_buttons[4].style = "inherit";
                    section_titles[0].style = "position: fixed;z-index: 999; top:0; display: block";
                    section_titles[3].style = "display: none";
                    section_titles[1].style = "display: none";
                    section_titles[2].style = "display: none";
                    section_titles[4].style = "display: none";


                } else if (this.scrolling <= pg_heights[1]) {
                    if(this.lock){
                        app.currentsec=2;
                    }

                    //progress_buttons[0].style = "background-color: white;";
                    progress_buttons[1].style = "background-color: #ccffff"; //; color: white;";
                    /*progress_buttons[2].style = "background-color: white;";
                    progress_buttons[3].style = "background-color: white;";
                    */
                    progress_buttons[0].style = "inherit";
                    progress_buttons[4].style = "inherit";
                    progress_buttons[2].style = "inherit";
                    progress_buttons[3].style = "inherit";
                    section_titles[0].style = "display: none";
                    section_titles[1].style = "position: fixed; top: 0; z-index: 998; display: block";
                    section_titles[4].style = "display: none";
                    section_titles[2].style = "display: none";
                    section_titles[3].style = "display: none";
                } else if (this.scrolling <= pg_heights[2]) {
                    if(this.lock){
                        app.currentsec=3;
                    }

                    /*progress_buttons[0].style = "background-color: white;";
                    progress_buttons[1].style = "background-color: white;";
                    */
                    progress_buttons[2].style = "background-color: #ccffff"; //; color: white;";
                    //progress_buttons[3].style = "background-color: white;";
                    progress_buttons[1].style = "inherit";
                    progress_buttons[0].style = "inherit";
                    progress_buttons[3].style = "inherit";
                    progress_buttons[4].style = "inherit";
                    section_titles[0].style = "display: none";
                    section_titles[1].style = "display: none";
                    section_titles[3].style = "display: none";
                    section_titles[4].style = "display: none";
                    section_titles[2].style = "position: fixed; top: 0; z-index: 997; display: block"

                } else if (this.scrolling <= pg_heights[3]) {
                    if(this.lock){
                        app.currentsec=4;
                    }

                    /*progress_buttons[0].style = "background-color: white;";
                    progress_buttons[1].style = "background-color: white;";
                    progress_buttons[2].style = "background-color: white;";
                   */
                    progress_buttons[3].style = "background-color: #ccffff"; //; color: white;";
                    progress_buttons[1].style = "inherit";
                    progress_buttons[2].style = "inherit";
                    progress_buttons[0].style = "inherit";
                    progress_buttons[4].style = "inherit";
                    section_titles[0].style = "display: none";
                    section_titles[1].style = "display: none";
                    section_titles[2].style = "display: none";
                    section_titles[4].style = "display: none";
                    section_titles[3].style = "position: fixed; top: 0; z-index: 996; display: block"

                } else if (this.scrolling <= pg_heights[4]) {
                    if(this.lock){
                        app.currentsec=5;
                    }

                    /*progress_buttons[0].style = "background-color: white;";
                    progress_buttons[1].style = "background-color: white;";
                    progress_buttons[2].style = "background-color: white;";
                   */
                    progress_buttons[4].style = "background-color: #ccffff"; //; color: white;";
                    progress_buttons[1].style = "inherit";
                    progress_buttons[2].style = "inherit";
                    progress_buttons[3].style = "inherit";
                    progress_buttons[0].style = "inherit";
                    section_titles[0].style = "display: none";
                    section_titles[1].style = "display: none";
                    section_titles[2].style = "display: none";
                    section_titles[3].style = "display: none";
                    section_titles[4].style = "position: fixed; top: 0; z-index: 996; display: block"

                }
            },
            unlock: function (event){
                if(app.currentsec==10){
                    app.currentsec=0;
                    this.lock = true;
                    document.getElementById("unlock").innerHTML="Unlock page";
                } else {
                    app.currentsec=10;
                    this.lock=false;
                    document.getElementById("unlock").innerHTML="Lock page";
                }


            },

            showinfo: function(event){
                let value = document.getElementById("fourierselect").value;
                    //show div
            if (value==1){
                $("#parabolic").show();
                //$('#parabolic').scrollIntoView({behavior: "smooth"});
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==2){
                $("#parabolic").hide();
                $("#delta").show();
                //setTimeout(function () {$('#delta').scrollIntoView({behavior: "smooth"});}, 500);
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==3){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").show();
                //setTimeout(function () {$('#square').scrollIntoView({behavior: "smooth"});}, 500);
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==4){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").show();
                //setTimeout(function () {$('#sawtooth').scrollIntoView({behavior: "smooth"});}, 500);
                $("#modx").hide();
            } else if (value==5){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").show();
                //setTimeout(function () {$('#modx').scrollIntoView({behavior: "smooth"});}, 500);
            }

            },

            /*OnScroll: function (event) {
                this.scrolling = parseFloat($(".container_journey").scrollTop());
                if (this.scrolling < pg_heights[0]) {
                    progress_buttons[0].style = "background-color: #ccffff"*/

            Scroll1: function (event) {
                journey_pg[0].scrollIntoView({behavior: "smooth"})
            },
            Scroll2: function (event) {
                journey_pg[1].scrollIntoView({behavior: "smooth"})
            },
            Scroll3: function (event) {
                journey_pg[2].scrollIntoView({behavior: "smooth"})
            },
            Scroll4: function (event) {
                journey_pg[3].scrollIntoView({behavior: "smooth"})
            },
            Scroll5: function (event) {
                journey_pg[4].scrollIntoView({behavior: "smooth"})
            },
            subScrollTo: function (event) {
            let scrollTarget = event.currentTarget;
            setTimeout(function () {scrollTarget.scrollIntoView({behavior: "smooth"});}, 500);
        },
            mouseOver1: function(){
            this.active1 = !this.active1;
        },
        mouseOver2: function(){
            this.active2 = !this.active2;
        },
        mouseOver3: function(){
            this.active3 = !this.active3;
        },
        mouseOver4: function(){
            this.active4 = !this.active4;
        },
        mouseOver5: function(){
            this.active5 = !this.active5;
        },
            /*checksec: function(){
                this.scrolling = parseFloat($(".container_journey").scrollTop());
                if(this.scrolling < pg_heights[0]){

                }
            }*/


        },
        mounted: function () {
            document.addEventListener('scroll', this.OnScroll)
        },
        /*mounted: () {
            document.addEventListener('scroll', this.watchScroll)
        },*/

        destroyed: function () {
            document.removeEventListener('scroll', this.OnScroll)
        },

    });

    /*--------------------------------------------------------------------------------------------------------------------------*/
// loading bar
    $(function () {

        function scroll_fn() {

            let heights = h - 600; //journey_pg[journey_pg.length-1]
            //$('#main-journey').height()//-$('#main-journey').offset().top;

            //var document_height = $(document).height();
            let scroll_so_far = $('#journey_cont').scrollTop();

            let scroll_percentage = scroll_so_far / (heights / 100);

            //$('#loading').width(scroll_percentage + '%');
            $('#loading').css('width', (scroll_percentage + '%'));
            //console.log('height:'+heights);
            //console.log('scroll:'+scroll_so_far);
            //console.log('window_height'+window_height);
            //console.log('percentage:'+scroll_percentage);
            //console.log('to bottom:'+ toBottom);

        }


        $('#journey_cont').scroll(function () {
            scroll_fn();
        });

        $(window).resize(function () {
            scroll_fn();
        });


        // to show the function content selected

        function showinfo() {
            let value = document.getElementById("fourierselect").value;
                    //show div
            if (value==1){
                $("#parabolic").show();
                //$('#parabolic').scrollIntoView({behavior: "smooth"});
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==2){
                $("#parabolic").hide();
                $("#delta").show();
                //setTimeout(function () {$('#delta').scrollIntoView({behavior: "smooth"});}, 500);
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==3){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").show();
                //setTimeout(function () {$('#square').scrollIntoView({behavior: "smooth"});}, 500);
                $("#sawtooth").hide();
                $("#modx").hide();
            } else if (value==4){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").show();
                //setTimeout(function () {$('#sawtooth').scrollIntoView({behavior: "smooth"});}, 500);
                $("#modx").hide();
            } else if (value==5){
                $("#parabolic").hide();
                $("#delta").hide();
                $("#square").hide();
                $("#sawtooth").hide();
                $("#modx").show();
                //setTimeout(function () {$('#modx').scrollIntoView({behavior: "smooth"});}, 500);
            }

        }

        /*function unlock(){
            let v1=document.querySelector('.container_vis');
            let v2=document.querySelector(".container_vis_2");
            v1.classList.toggle('hide');
            v2.classList.toggle('hide');

        }*/

    //console.log('executed')
        $("#fourierselect").on('click',() => {
            showinfo()
        });



    });
};

/*--------------------------------------------------------------------------------------------------------------------------*/
/*
// welcome loading

$("#welcome").html("60秒后重新获取");
		var count = 60;

		var timeInterval = setInterval(function() {
			if (count > 1) {
				count--;
				$("#getVerifyCode").html(count + "秒后重新获取");

			} else {
				$("#getVerifyCode").html("获取验证码");
				//设置停止
				clearInterval(timeInterval);
			}

		}, 1000);
*/

/*-----------------------------------------------------------------------------------------------------------------------*/
/*

window.addEventListener('load', function() {
  MathJax.Hub.Queue(
    ["setRenderer",MathJax.Hub,"SVG"]
  );
  Plotly.d3.json('/{{https://cdn.plot.ly/plotly-latest.min.js}}', function(error, fig) {
    Plotly.plot('{{graph}}', fig.data, fig.layout);
  MathJax.Hub.Queue(
    ["setRenderer",MathJax.Hub,"HTMLCSS-output"]
  );
  });
});
*/

/*----------------------------------------------------------------------------------------------------------------------*/

/*$(document).ready(() => {
    $('#derive').on('click', () => {
        $('#derive-content').slideToggle();
    })
})*/

/*

$(document).ready(() => {
    $('.menu').on('click', () => {
        $('.menuContent').slideToggle();
    });
    console.log('shuru')
});*/
/*

new Vue({
  el: '.menu',
  data: {
    show: false
  }
})*/
