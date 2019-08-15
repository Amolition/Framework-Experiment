
// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        firstLoad: 1,
        currentTitle: 1,
        currentSection: 1,
        sectionTitleLong: ["SVMs Intro", "Good/Bad Classifiers", "Components", "Power Spectrum", "Overview"],
        sectionTitleShort: ["1","2","3","4","5"],
        sectionTitle: [],
        hoverTitle: false,
        n: 5,
        rightScripts: [
            ["scripts/linearlyseparableexample.js", "scripts/svm.js"],
            [],
            ["scripts/Components_of_a_Fourier_Series.js"],
            ["scripts/Power_Spectrum_of_a_Fourier_Series.js"],
            ["scripts/Generalised_Fourier_Decomposition.js"],
        ],
        prevState: false,
        nextState: false,
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
                if (i !== newValue) {
                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];
                } else {
                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 20);
                    setTimeout (function () {app.$forceUpdate();}, 100);
                }
            }
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
            app.swapTitles(app.firstLoad);
            // sets initial right panel
            app.visChanger(app.currentSection);
            // checks if journey div height changes every x seconds
            // re-runs mathJax on entire page once everything else has loaded
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
        }
    )},
});