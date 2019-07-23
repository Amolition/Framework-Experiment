// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {

        scrollPos: 0,
        currentSection: 0,
        previousSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Orthogonality", "Derivation", "Components", "Power Spectrum", "Overview"],
        sectionTitleShort: ["1","2","3","4","5","6"],
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
        firstRunDone: "false",
        derivationSubSection: 0,
        derivationScripts: [
            ["scripts/Visualising_Simple_Periodic_Functions.js"],
            ["scripts/Derivation_of_a_Fourier_Series_duo.js"],
        ],
        showEq: true,
        equationID: "triangular",
    },

    methods: {

        scrollFunc: function () {

            if (app.firstRunDone === true) {

                //let topSpace =  document.querySelectorAll("#vis-title")[0].offsetHeight;

                app.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;

                // console.log("scrollPos: " + app.scrollPos);

                function handleElement(section) {

                    // update currentSection if user scrolls past
                    // the top edge of its corresponding paragraph on left side
                    let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop - 2;
                    let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight - 2;
                    if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                        app.currentSection = section;
                        // console.log(app.currentSection);
                    };

                };

                for(let i=1; i<=app.n; i++) {
                handleElement(i)};
            }
        },

        sectionPos: function () {
            this.$nextTick (function () {
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                console.log(overallTop);
                console.log("resized");

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

        scrollTo: function (event) {
            document.querySelectorAll("#"+"sc"+event.currentTarget.dataset.no)[0].scrollIntoView({behavior: "smooth"});
        },

        subScrollTo: function (event) {
            let scrollTarget = event.currentTarget;

            console.log(scrollTarget);

            setTimeout(function () {
                if (document.querySelectorAll(scrollTarget.dataset.target)[0].classList.contains("show")===true) {
                    scrollTarget.scrollIntoView({behavior: "smooth"});
                    }},
                500);
        },

        updateSubSection: function (newSubSection) {
            if (app.derivationSubSection !== newSubSection) {
                app.derivationSubSection = newSubSection;
            } else {
                app.derivationSubSection = 0;
            }
            app.$forceUpdate();
        },
    },

    watch: {

        currentSection: function (newValue, oldValue) {

            document.querySelectorAll('.rightScriptSpace')[0].innerHTML = "";

            for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {

                app.addScript = document.createElement("script");
                app.addScript.id ="rightScriptS" + newValue + "E" + i;
                app.addScript.src = (app.rightScripts[newValue-1][i-1]);
                app.addScript.async = false;
                document.querySelectorAll('.rightScriptSpace')[0].appendChild(app.addScript);
            }

            for (let i=1; i<=app.n; i++) {

                if (i !== newValue) {

                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];

                } else {

                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 20);
                    setTimeout (function () {app.$forceUpdate();}, 100);
                }
            }

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

                                selectorFunc();
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

            if (newValue === 3) {setTimeout(function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
                }, 50)
            }
        },

        derivationSubSection: function (newValue, oldValue) {

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

                                selectorFunc();
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
            }
        },

        equationID: function () {

            app.showEq=false;

            setTimeout(
                function () {app.showEq=true
            }, 50);

            setTimeout(
                function () {MathJax.Hub.Queue(["Typeset",MathJax.Hub,"equationSpace"]);
            }, 100)
        },
    },

    mounted () {

        //window.addEventListener('resizeTest', this.test());
        this.$nextTick( function () {
            app.n = document.querySelectorAll(".section-container").length;
            this.sectionPos();
            setTimeout(function () {
                app.firstRunDone = true;
                app.scrollFunc();
            }, 0);
            app.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
            window.setInterval(() => {
                app.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;

                if (app.journeyHeightOld !== app.journeyHeightNew) {

                    app.journeyHeightOld = app.journeyHeightNew;

                    this.sectionPos();
                }
            },2000);

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
        }
    )},

});