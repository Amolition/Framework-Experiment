// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {

        scrollPos: 0,
        currentSection: 0,
        previousSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Orthogonality", "Section 2", "Section 3", "Section 4", "Section 5", "Section 6"],
        sectionTitleShort: ["1","2","3","4","5", "6"],
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
    },

    methods: {

        scrollFunc: function () {

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

        //resizeTest: function () {
        //    console.log("resized")
        //},
    },

    watch: {

        currentSection: function (newValue, oldValue) {

            // if (oldValue !== 0) {
            //
            //     for (let i=1; i<=app.rightScripts[oldValue-1].length; i++) {
            //
            //         let removeScript = document.getElementById("scriptS" + oldValue + "E" + i);
            //         document.querySelectorAll('.scriptSpace')[0].removeChild(removeScript);
            //     }
            // }
            //
            //
            //
            // for (let i=1; i<=app.rightScripts[newValue-1].length; i++) {
            //
            //     let addScript = document.createElement("script")
            //     addScript.id ="scriptS" + newValue + "E" + i;
            //     addScript.src = (app.rightScripts[newValue-1][i-1]);
            //     document.querySelectorAll('.scriptSpace')[0].appendChild(addScript);
            // }



            // this.$nextTick (function () {
            //     app.activeScript = app.rightScripts[newValue-1];
            // });

            // let addScript = document.createElement("script")
            // addScript.id ="'app.rightScript' + newValue";
            // addScript.src = ("'app.rightScripts[' + newValue-1 + ']'");
            // document.querySelectorAll('.scriptSpace')[0].appendChild(addScript);

            // let element = document.getElementById("rightScript"+oldValue);
            // element.getElementsByTagName('scriptSpace')[0].removeChild(element);

            for (let i=1; i<=app.n; i++) {

                if (i !== newValue) {

                    app.sectionTitle[i-1] = app.sectionTitleShort[i-1];

                } else {

                    setTimeout (function () {app.sectionTitle[i-1] = app.sectionTitleLong[i-1];}, 45);
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
            this.scrollFunc();
            app.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
            window.setInterval(() => {
                app.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;

                if (app.journeyHeightOld !== app.journeyHeightNew) {

                    app.journeyHeightOld = app.journeyHeightNew;

                    this.sectionPos();
                }

                if (app.currentSection !== app.previousSection){

                    if (app.previousSection !== 0) {

                        for (let i = 1; i <= app.rightScripts[app.previousSection - 1].length; i++) {

                            let removeScript = document.getElementById("scriptS" + app.previousSection + "E" + i);
                            document.querySelectorAll('.scriptSpace')[0].removeChild(removeScript);
                        }
                    }


                    for (let i=1; i<=app.rightScripts[app.currentSection-1].length; i++) {

                        let addScript = document.createElement("script")
                        addScript.id ="scriptS" + app.currentSection + "E" + i;
                        addScript.src = (app.rightScripts[app.currentSection-1][i-1]);
                        document.querySelectorAll('.scriptSpace')[0].appendChild(addScript);
                    }

                    app.previousSection = app.currentSection;
                }
            },2000);
        }
    )},

});