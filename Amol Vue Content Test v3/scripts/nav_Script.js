
// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        scrollPos: 0,
        currentTitle: 0,
        currentSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Orthogonality", "Derivation", "Components", "Power Spectrum", "Overview"],
        sectionTitleShort: ["1","2","3","4","5"],
        sectionTitle: [],
        n: "",
        journeyHeightOld: "",
        journeyHeightNew: "",
        rightScripts: [
            ["scripts/orthogonality_object.js", "scripts/0Orthogonality.js"],
            [],
            ["scripts/Components_of_a_Fourier_Series.js"],
            ["scripts/Power_Spectrum_of_a_Fourier_Series.js"],
            ["scripts/Generalised_Fourier_Decomposition.js"],
        ],
        removeScript: "",
        addScript: "",
        firstRunDone: false,
        derivationSubSection: 0,
        derivationScripts: [
            ["scripts/Visualising_Simple_Periodic_Functions.js"],
            ["scripts/Derivation_of_a_Fourier_Series_duo.js"],
        ],
        showEq: true,
        equationID: "triangular",
        locked: true,
        /*----------------------------------------------Eliza code-----------------------------------------------------*/
        active1: false,
            active2: false,
            active3: false,
            active4: false,
            active5: false,
        /*-------------------------------------------------------------------------------------------------------------*/
    },

    methods: {

        // Function called on scrolling of of left panel to indicate distance scrolled down journey content div
        scrollFunc: function () {
            // function only works once sectionPos has run at least once (in mounted)
            if (app.firstRunDone === true) {
                app.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;

                function handleElement(section) {
                    // update currentSection variable if user scrolls past the top edge of its corresponding section on left side
                    let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop - 2;
                    let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight - 2;
                    if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                        app.currentSection = section;
                    }
                }
                for (let i=1; i<=app.n; i++) {
                handleElement(i)}

                app.changeTitle();
                app.changeSec();
            }
        },

        handleElement: function (section) {
            // update currentSection variable if user scrolls past the top edge of its corresponding section on left side
            let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop - 2;
            let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight - 2;
            if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                app.currentTitle = section;
            }
        },

        changeTitle:  function () {
            for (let i=1; i<=app.n; i++) {
                app.handleElement(i)
            }},

        changeSec: debounce(function () {
          app.currentSection = app.currentTitle;
        }, 100),

        swapTitles: function (newValue, oldValue) {
            for (let i=1; i<=app.n; i++) {
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

        // Updates derivationSubSection variable to reflect active subsection in derivatives section
        updateSubSection: function (newSubSection) {
            if (app.derivationSubSection !== newSubSection) {
                app.derivationSubSection = newSubSection;
            } else {
                app.derivationSubSection = 0;
            }
            app.$forceUpdate();
        },

        /*--------------------------------------------------Eliza code-----------------------------------------------------------------*/
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

        previous: function() {
            if (app.currentSection >= 1) {
                app.currentSection -= 1
            }
        },
        next: function() {
            if (app.currentSection <= 4) {
                app.currentSection += 1
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

            if (app.locked===true) {
                // Removes and adds scripts depending on which section is at top of visible part of journey
                document.querySelectorAll('.rightScriptSpace')[0].innerHTML = "";
                for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {
                    app.addScript = document.createElement("script");
                    app.addScript.id ="rightScriptS" + newValue + "E" + i;
                    app.addScript.src = (app.rightScripts[newValue-1][i-1]);
                    app.addScript.async = false;
                    document.querySelectorAll('.rightScriptSpace')[0].appendChild(app.addScript);
                }
                // Code to deal with loading / unloading appropriate scripts when entering / leaving section 2 as the scripts depend on which subsection is active
                if (oldValue === 2) {
                    document.querySelectorAll('.derivationScriptSpace')[0].innerHTML = "";
                }
                if (newValue === 2) {
                    if (app.derivationSubSection !==3) {
                        for (let i=1; i<=app.derivationScripts[0].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                            app.addScript.src = (app.derivationScripts[0][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                        setTimeout(function () {
                            if (app.derivationSubSection > 3) {
                                document.querySelectorAll('#opt' + (app.derivationSubSection - 3))[0].setAttribute("selected", "true");
                                document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                                console.log(document.querySelectorAll("#SelectSec2Sub1")[0].value);
                                document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                                setTimeout(function () {
                                    selectorFuncSec2Sub0();
                                    document.querySelectorAll("#subSecTitle")[0].innerHTML=document.querySelectorAll("#opt"+(app.derivationSubSection-3))[0].title;
                                    document.querySelectorAll("#subSecTitle")[0].style.display="block";
                                }, 200);
                            }
                        }, 200);
                    } else {
                        for (let i=1; i<=app.derivationScripts[1].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 1 + "E" + i;
                            app.addScript.src = (app.derivationScripts[1][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                    }
                }
                // runs mathJax re-display equation when section 3 entered
                if (newValue === 3) {setTimeout(function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
                    }, 50)
                }
            }
        },

        derivationSubSection: function (newValue, oldValue) {
            // Removes and adds scripts depending on which subsection is active when on section 2
            if (app.locked===true) {
                document.querySelectorAll('.derivationScriptSpace')[0].innerHTML = "";
                if (app.currentSection === 2) {
                    if (newValue !==3) {
                        for (let i=1; i<=app.derivationScripts[0].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                            app.addScript.src = (app.derivationScripts[0][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                        // locks function displayed to show only specific example if subsection about specific function is active
                        setTimeout(function () {
                            if (oldValue > 3) {
                                document.querySelectorAll('#opt' + (oldValue - 3))[0].removeAttribute("selected");
                                document.querySelectorAll('#SelectSec2Sub1')[0].removeAttribute("disabled");
                                document.querySelectorAll("#subSecTitle")[0].style.display = "none";
                                document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "block";
                            }
                            if (newValue > 3) {
                                document.querySelectorAll('#opt' + (newValue - 3))[0].setAttribute("selected", "true");
                                document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                                console.log(document.querySelectorAll("#SelectSec2Sub1")[0].value);
                                document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                                setTimeout(function () {
                                    selectorFuncSec2Sub0();
                                    document.querySelectorAll("#subSecTitle")[0].innerHTML=document.querySelectorAll("#opt"+(newValue-3))[0].title;
                                    document.querySelectorAll("#subSecTitle")[0].style.display="block";
                                }, 200);
                            }
                        }, 200);
                    } else {
                        for (let i=1; i<=app.derivationScripts[1].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 1 + "E" + i;
                            app.addScript.src = (app.derivationScripts[1][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                    }
                    if (oldValue !== 0) {
                        document.querySelectorAll("ssh" + oldValue)
                    }
                }
            }
        },

        equationID: function () {
            // changes to correct equation to display in section 4 (depending on dropdown selection) and re-runs mathJax
            app.showEq=false;
            setTimeout(
                function () {app.showEq=true
            }, 50);
            setTimeout(
                function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
            }, 100)
        },

        locked: function () {
            // clear script spaces
            document.querySelectorAll('.rightScriptSpace')[0].innerHTML = "";
            document.querySelectorAll('.derivationScriptSpace')[0].innerHTML = "";
            if (app.locked===true) {
                // adds scripts for current section when returning to locked mode
                for (let i=1; i<=app.rightScripts[app.currentSection-1].length; i++) {
                    app.addScript = document.createElement("script");
                    app.addScript.id ="rightScriptS" + app.currentSection + "E" + i;
                    app.addScript.src = (app.rightScripts[app.currentSection-1][i-1]);
                    app.addScript.async = false;
                    document.querySelectorAll('.rightScriptSpace')[0].appendChild(app.addScript);
                }
                // Code to deal with loading / unloading appropriate scripts when entering / leaving section 2 as the scripts depend on which subsection is active
                if (app.currentSection === 2) {
                    if (app.derivationSubSection !==3) {
                        for (let i=1; i<=app.derivationScripts[0].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                            app.addScript.src = (app.derivationScripts[0][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                        setTimeout(function () {
                            if (app.derivationSubSection > 3) {
                                document.querySelectorAll('#opt' + (app.derivationSubSection - 3))[0].setAttribute("selected", "true");
                                document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                                console.log(document.querySelectorAll("#SelectSec2Sub1")[0].value);
                                document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                                setTimeout(function () {
                                    selectorFuncSec2Sub0();
                                    document.querySelectorAll("#subSecTitle")[0].innerHTML=document.querySelectorAll("#opt"+(app.derivationSubSection-3))[0].title;
                                    document.querySelectorAll("#subSecTitle")[0].style.display="block";
                                }, 200);
                            }
                        }, 200);
                    } else {
                        for (let i=1; i<=app.derivationScripts[1].length; i++) {
                            app.addScript = document.createElement("script");
                            app.addScript.id ="derivationScriptS" + 1 + "E" + i;
                            app.addScript.src = (app.derivationScripts[1][i-1]);
                            app.addScript.async = false;
                            document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                        }
                    }
                }
                // runs mathJax re-display equation when section 3 entered
                if (app.currentSection === 3) {setTimeout(function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
                    }, 50)
                }
            } else {
                // load all scripts simultaneously for unlocked mode
                for (let j=1; j<=app.rightScripts.length; j++) {
                        for (let i=1; i<=app.rightScripts[j-1].length; i++) {
                            setTimeout ( function () {
                                app.addScript = document.createElement("script");
                                app.addScript.id ="rightScriptS" + j + "E" + i;
                                app.addScript.src = (app.rightScripts[j-1][i-1]);
                                app.addScript.async = false;
                                document.querySelectorAll('.rightScriptSpace')[0].appendChild(app.addScript);
                            }, 100)
                        }
                }
                for (let i=1; i<=app.derivationScripts[0].length; i++) {
                    setTimeout ( function () {
                        app.addScript = document.createElement("script");
                        app.addScript.id ="derivationScriptS" + 0 + "E" + i;
                        app.addScript.src = (app.derivationScripts[0][i-1]);
                        app.addScript.async = false;
                        document.querySelectorAll('.derivationScriptSpace')[0].appendChild(app.addScript);
                    }, 100)
                }
                setTimeout(
                    function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
                    }, 100)
            }
        }
    },

    mounted () {

        // $nextTick ensures initial functions only run once Vue is initialised sufficiently
        this.$nextTick ( function () {
            // makes n equal to total number of sections
            app.n = document.querySelectorAll(".section-container").length;
            // calculates initial div section positions in journey with respect to the top
            this.sectionPos();
            app.firstRunDone = true;
            // runs scrollFunc once on loading in case page does not load with top of journey in view
            app.scrollFunc();
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

window.onload=function(){
	let oBox=document.getElementById("lock-container");
	console.log("lockL1:"+oBox.style.left)
	let RL=0;
	let RT=0;
	oBox.onmousedown=function(ev){

	     /*RL=ev.clientX-oBox.offsetLeft;
	     RT=ev.clientY-oBox.offsetTop;
	     document.onmousemove=function(ev){

                  var L=ev.clientX-RL;
	          var T=ev.clientY-RT;*/
	     RL=ev.screenX-oBox.offsetLeft;
	     RT=ev.screenY-oBox.offsetTop;
	     document.onmousemove=function(ev){

                  var L=ev.screenX-RL;
	          var T=ev.screenY-RT;

	          oBox.style.left=L+"px";
	          oBox.style.top=T+"px";

	          oBox.style.left=L+"px";
	          oBox.style.top=T+"px";
	          console.log("RL:"+RL);
             console.log("RT:"+RT);
             console.log("L:"+L);
             console.log("R:"+T);
             console.log("lockL:"+oBox.style.left)
	      }
	};
	oBox.onmouseup=function(){
	        document.onmousemove=null;
	}
};
/*

let app2= new Vue({
    el: '#app2'


});

*/
$(document).ready(function() {
		var canvas = document.getElementById("c");
		var ctx = canvas.getContext("2d");
		var c = $("#c");
		var x,y1,w,h,cx,cy,l;
		var y1 = [];
		var b = {
			n:100,
			c:false,    //  random color
			bc:'white',   //  background color
			r:0.9,
			o:0.05,
			a:1,
			s:20,
		};
		var bx = 0,by = 0,vx = 0,vy = 0;
		var td = 0;
		var p = 0;
		var hs = 0;
		re();
		var color,color2;
		if(b.c){
			color2 = b.c;
		}else{
			color = Math.random()*360;
		}

		$(window).resize(function(){
			re();
		});
		var tp4=true;
    function begin(){
			if(tp4){
				if(!b.c){
					color+=.1;
					color2 = 'hsl('+color+',100%,80%)';
				}
				ctx.globalAlpha = 1;
				ctx.fillStyle = b.bc;
				ctx.fillRect(0,0,w,h);
				for(var i=0;i<y1.length;i++){
					ctx.globalAlpha = y1[i].o;
					ctx.fillStyle = color2;
					ctx.beginPath();
					ctx.shadowBlur=20;
					ctx.shadowColor=color2;
					y1[i].vx2 += (cx - y1[i].wx)/1000;
					y1[i].vy2 += (cy - y1[i].wy)/1000;
					y1[i].wx+=y1[i].vx2;
					y1[i].wy+=y1[i].vy2;
					y1[i].o-=b.o/2;
					y1[i].r=10;
					ctx.arc(y1[i].wx,y1[i].wy,y1[i].r,0,Math.PI*2);
					ctx.closePath();
					ctx.fill();
					ctx.shadowBlur=0;
					if(y1[i].o<=0){
						y1.splice(i,1);
						i--;
					};

				}
			}
			window.requestAnimationFrame(begin);
		}
		function re(){
			w = window.innerWidth;
			h = window.innerHeight;
			canvas.width = w;
			canvas.height = h;
			cx = w/2;
			cy = h/2;
		};
		c.mousemove(function(e){
			cx = e.pageX-c.offset().left;
			cy = e.pageY-c.offset().top;
			if(tp4){
				if(Math.random()<=.5){
					if(Math.random()<=.5){
						bx = -10;
					}else{
						bx = w+10;
					}
					by = Math.random()*h;
				}else{
					if(Math.random()<=.5){
						by = -10;
					}else{
						by = h+10;
					}
					bx = Math.random()*w;
				}
				vx = (Math.random()-.5)*8;
				vy = (Math.random()-.5)*8;
			}
			if(tp4){
				y1.push({x:cx,y1:cy,r:b.r,o:1,v:0,wx:bx,wy:by,vx2:vx,vy2:vy});
			}
		});
		/*c.mousedown(function(){
			c.on('mousemove',function(e){
				cx = e.pageX-c.offset().left;
				cy = e.pageY-c.offset().top;
				y.push({x:cx,y:cy,r:b.r,o:1});
			});
			c.on('mouseup',function(){
				c.off('mouseup');
				c.off('mousemove');
				c.off('moseleave');
			});
			c.on('mouseleave',function(){
				c.off('mouseup');
				c.off('mousemove');
				c.off('moseleave');
			});
		});*/

		(function() {
			var lastTime = 0;
			var vendors = ['webkit', 'moz'];
			for(var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
				window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
											  window[vendors[xx] + 'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame) {
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
					var id = window.setTimeout(function() {
						callback(currTime + timeToCall);
					}, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}
			if (!window.cancelAnimationFrame) {
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			}
		}());
		begin();
	});