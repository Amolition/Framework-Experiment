// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {

        scrollPos: 0,
        currentSection: 0,
        previousSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Orthogonality", "Derivation", "Section 3", "Section 4", "Section 5", "Section 6"],
        sectionTitleShort: ["1","2","3","4","5","6"],
        sectionTitle: [],
        n: "",
        journeyHeightOld: "",
        journeyHeightNew: "",
        rightScripts: [
            ["scripts/orthogonality_object.js", "scripts/0Orthogonality.js"],
            ["scripts/Derivation_of_a_Fourier_Series_duo.js"],
            [],
            [],
            [],
            [],
        ],
        removeScript: "",
        addScript: "",
        firstRunDone: "false",
        derivationSubSection: 0,
        derivationScripts: [],
    },

    methods: {

        scrollFunc: function () {

            if (app.firstRunDone === true) {

                //let topSpace =  document.querySelectorAll("#vis-title")[0].offsetHeight;

                app.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;

                console.log("scrollPos: " + app.scrollPos);

                function handleElement(section) {

                    // update currentSection if user scrolls past
                    // the top edge of its corresponding paragraph on left side
                    let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop - 2;
                    let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight - 2;
                    if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                        app.currentSection = section;
                        console.log(app.currentSection);
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
            setTimeout(function () {scrollTarget.scrollIntoView({behavior: "smooth"});}, 500);
        },

        updateSubSection: function (newSubSection) {
            if (app.derivationSubSection !== newSubSection) {
                app.derivationSubSection = newSubSection
            } else {
                app.derivationSubSection = 0
            }
        },
    },

    watch: {

        currentSection: function (newValue, oldValue) {

            if (oldValue !== 0) {

                for (let i=1; i<=app.rightScripts[oldValue-1].length; i++) {

                    app.removeScript = document.getElementById("scriptS" + oldValue + "E" + i);
                    document.querySelectorAll('.scriptSpace')[0].removeChild(app.removeScript);
                }
            }
            
            for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {

                app.addScript = document.createElement("script");
                app.addScript.id ="scriptS" + newValue + "E" + i;
                app.addScript.src = (app.rightScripts[newValue-1][i-1]);
                app.addScript.async = false;
                document.querySelectorAll('.scriptSpace')[0].appendChild(app.addScript);
            }

            for (let i=1; i<=app.n; i++) {

                if (i !== newValue) {

                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];

                } else {

                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 20);
                    setTimeout (function () {app.$forceUpdate();}, 100);
                }
            }
        }
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
            },5000);

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
        }
    )},

});