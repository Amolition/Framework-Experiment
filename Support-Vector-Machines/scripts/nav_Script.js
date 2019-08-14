
// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        firstLoad: 1,
        currentTitle: 1,
        currentSection: 1,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["SVMs Intro", "Good/Bad Classifiers", "Components", "Power Spectrum", "Overview"],
        sectionTitleShort: ["1","2","3","4","5"],
        sectionTitle: [],
        hoverTitle: false,
        n: 5,
        journeyHeightOld: "",
        journeyHeightNew: "",
        rightScripts: [
            ["scripts/linearlyseparableexample.js", "scripts/svm.js"],
            [],
            ["scripts/Components_of_a_Fourier_Series.js"],
            ["scripts/Power_Spectrum_of_a_Fourier_Series.js"],
            ["scripts/Generalised_Fourier_Decomposition.js"],
        ],
        firstRunDone: false,
        derivationSubSection: 0,
        derivationScripts: [
            ["scripts/Visualising_Simple_Periodic_Functions.js"],
            ["scripts/Derivation_of_a_Fourier_Series_duo.js"],
        ],
        prevState: false,
        nextState: false,
        /*----------------------------------------------Eliza code-----------------------------------------------------*/
        // active1: false,
        // active2: false,
        // active3: false,
        // active4: false,
        // active5: false,
        /*-------------------------------------------------------------------------------------------------------------*/
    },

    methods: {

        handleElement: function (section) {
            app.currentTitle = section;
        },

        // Updates number of title being hovered over in nav/progress bar in data
        hoverPosUpdate: function (event) {
            app.hoverPos = parseFloat(event.currentTarget.dataset.no)
        },

        // Updates if and what title show when hovering over nav/progress bar
        selectHover: function () {
            if (app.currentTitle !== app.hoverPos) {
                app.hoverTitle=app.sectionTitleLong[app.hoverPos-1]
            } else {
                app.hoverTitle=false
            }
        },

        // Updates x-position of mouse in data
        updateMouseX: function(event) {
            // pass event object, bound to mouse move with update
            app.mouseX = event.clientX -15;
        },

        changeTitle:  function () {
            for (let i=1; i<=app.n; i++) {
                app.handleElement(i)
            }
        },

        changeSec: debounce(function () {
          app.currentSection = app.currentTitle;
        }, 100),

        swapTitles: function (newValue, oldValue) {
            console.log("alive and well");
            for (let i=1; i<=app.n; i++) {
           // for (let i=1; i<=5; i++) {
                if (i !== newValue) {
                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];
                } else {
                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 20);
                    setTimeout (function () {app.$forceUpdate();}, 100);
                }
            }
        },

        // Function called every x seconds to check if section div sizes have changed and recalculate scroll positions if so
        // Div sizes may change if window re-sized or if a subsection is expanded/collapsed
        sectionPos: function () {
            this.$nextTick (function () {
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                for (let i=1; i<=app.n; i++) {
                    if (i<app.n) {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop - overallTop);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + document.querySelectorAll("#"+"sc"+i)[0].offsetHeight);
                    } else {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop - overallTop);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + document.querySelectorAll("#"+"sc"+i)[0].offsetHeight - document.querySelectorAll(".journey")[0].offsetHeight);
                    }
                }
            })
        },

        // Function activated when button in nav/progress bar clicked to scroll automatically to relevant section
        scrollTo: function (event) {
            document.querySelectorAll("#"+"sc"+event.currentTarget.dataset.no)[0].scrollIntoView({behavior: "smooth"});
        },

        // Same as above but for subsections
        // Delay added to allow time for div size changes
        subScrollTo: function (event) {
            let scrollTarget = event.currentTarget;
            if (scrollTarget.id === "ssh" + app.derivationSubSection) {
                    setTimeout(function () {scrollTarget.scrollIntoView({behavior: "smooth"});}, 10)
            }
        },

        visChanger: function (newValue,oldValue) {
            // Removes and adds scripts depending on which section is at top of visible part of journey
            document.querySelectorAll('.rightScriptSpace')[0].innerHTML = "";
            let addScript;
            for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {
                addScript = document.createElement("script");
                addScript.id ="rightScriptS" + newValue + "E" + i;
                addScript.src = (app.rightScripts[newValue-1][i-1]);
                addScript.async = false;
                document.querySelectorAll('.rightScriptSpace')[0].appendChild(addScript);
            }
        },

        /*--------------------------------------------------Eliza code-----------------------------------------------------------------*/
        // mouseOver1: function(){
        //     this.active1 = !this.active1;
        // },
        // mouseOver2: function(){
        //     this.active2 = !this.active2;
        // },
        // mouseOver3: function(){
        //     this.active3 = !this.active3;
        // },
        // mouseOver4: function(){
        //     this.active4 = !this.active4;
        // },
        // mouseOver5: function(){
        //     this.active5 = !this.active5;
        // },

        previous: function() {
            if (app.currentSection >= 2) {
                app.currentSection -= 1;
                app.currentTitle -=1;
            }
        },
        next: function() {
            if (app.currentSection <= 4) {
                app.currentSection += 1;
                app.currentTitle += 1;
            }
        }

        /*--------------------------------------------------------------------------------------------------------------------------*/
    },

    watch: {

        currentTitle: function (newValue, oldValue) {
        // Updates current section title to display in full in nav/progress bar whilst minimising other section titles
            app.swapTitles(newValue, oldValue)
        },

        currentSection: function (newValue, oldValue) {
            app.visChanger(newValue, oldValue)
        },
    },

    mounted () {

        // $nextTick ensures initial functions only run once Vue is initialised sufficiently
        this.$nextTick ( function () {            
            // calculates initial div section positions in journey with respect to the top
            this.sectionPos();
            app.firstRunDone = true;
            app.swapTitles(app.firstLoad);
            // sets initial right panel
            app.visChanger(app.currentSection);
            // checks if journey div height changes every x seconds
            // if it does change, re-runs sectionPos to calculate section div positions
            app.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
            window.setInterval(() => {
                app.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;
                if (app.journeyHeightOld !== app.journeyHeightNew) {
                    app.journeyHeightOld = app.journeyHeightNew;
                    this.sectionPos();
                }
            },2000);
            // re-runs mathJax on entire page once everything else has loaded
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
        }
    )},
});

/*--------------------------------------------------Eliza code------------------------------------------------------------------*/

// let app2= new Vue({
//     el: '#app2'
//
//
// });
//
//
// $(document).ready(function() {
// 		$(window).resize(function(){
// 			re();
// 		});
// 		var tp4=true;
//     function begin(){
// 			if(tp4){
// 				if(!b.c){
// 					color+=.1;
// 					color2 = 'hsl('+color+',100%,80%)';
// 				}
// 				ctx.globalAlpha = 1;
// 				ctx.fillStyle = b.bc;
// 				ctx.fillRect(0,0,w,h);
// 				for(var i=0;i<y1.length;i++){
// 					ctx.globalAlpha = y1[i].o;
// 					ctx.fillStyle = color2;
// 					ctx.beginPath();
// 					ctx.shadowBlur=20;
// 					ctx.shadowColor=color2;
// 					y1[i].vx2 += (cx - y1[i].wx)/1000;
// 					y1[i].vy2 += (cy - y1[i].wy)/1000;
// 					y1[i].wx+=y1[i].vx2;
// 					y1[i].wy+=y1[i].vy2;
// 					y1[i].o-=b.o/2;
// 					y1[i].r=10;
// 					ctx.arc(y1[i].wx,y1[i].wy,y1[i].r,0,Math.PI*2);
// 					ctx.closePath();
// 					ctx.fill();
// 					ctx.shadowBlur=0;
// 					if(y1[i].o<=0){
// 						y1.splice(i,1);
// 						i--;
// 					};
//
// 				}
// 			}
// 			window.requestAnimationFrame(begin);
// 		}
// 		function re(){
// 			w = window.innerWidth;
// 			h = window.innerHeight;
// 			canvas.width = w;
// 			canvas.height = h;
// 			cx = w/2;
// 			cy = h/2;
// 		};
// 		c.mousemove(function(e){
// 			cx = e.pageX-c.offset().left;
// 			cy = e.pageY-c.offset().top;
// 			if(tp4){
// 				if(Math.random()<=.5){
// 					if(Math.random()<=.5){
// 						bx = -10;
// 					}else{
// 						bx = w+10;
// 					}
// 					by = Math.random()*h;
// 				}else{
// 					if(Math.random()<=.5){
// 						by = -10;
// 					}else{
// 						by = h+10;
// 					}
// 					bx = Math.random()*w;
// 				}
// 				vx = (Math.random()-.5)*8;
// 				vy = (Math.random()-.5)*8;
// 			}
// 			if(tp4){
// 				y1.push({x:cx,y1:cy,r:b.r,o:1,v:0,wx:bx,wy:by,vx2:vx,vy2:vy});
// 			}
// 		});
// 		/*c.mousedown(function(){
// 			c.on('mousemove',function(e){
// 				cx = e.pageX-c.offset().left;
// 				cy = e.pageY-c.offset().top;
// 				y.push({x:cx,y:cy,r:b.r,o:1});
// 			});
// 			c.on('mouseup',function(){
// 				c.off('mouseup');
// 				c.off('mousemove');
// 				c.off('moseleave');
// 			});
// 			c.on('mouseleave',function(){
// 				c.off('mouseup');
// 				c.off('mousemove');
// 				c.off('moseleave');
// 			});
// 		});*/
//
// 		(function() {
// 			var lastTime = 0;
// 			var vendors = ['webkit', 'moz'];
// 			for(var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
// 				window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
// 				window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
// 											  window[vendors[xx] + 'CancelRequestAnimationFrame'];
// 			}
//
// 			if (!window.requestAnimationFrame) {
// 				window.requestAnimationFrame = function(callback, element) {
// 					var currTime = new Date().getTime();
// 					var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
// 					var id = window.setTimeout(function() {
// 						callback(currTime + timeToCall);
// 					}, timeToCall);
// 					lastTime = currTime + timeToCall;
// 					return id;
// 				};
// 			}
// 			if (!window.cancelAnimationFrame) {
// 				window.cancelAnimationFrame = function(id) {
// 					clearTimeout(id);
// 				};
// 			}
// 		}());
// 		begin();
// 	});