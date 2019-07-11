// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        scrollPos: 0,
        currentSection: 0,
        sectionTops: [],
        sectionBottoms: [],
    },

    methods: {
        scrollFunc: function () {

            //let topSpace =  document.querySelectorAll("#vis-title")[0].offsetHeight;

            app.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;

            console.log("scrollPos: " + app.scrollPos);

            function handleElement(section) {

                // update currentSection if user scrolls past
                // the top edge of its corresponding paragraph on left side
                let topSection = document.querySelectorAll("#"+"sc"+section)[0].offsetTop;
                let bottomSection = topSection + document.querySelectorAll("#"+"sc"+section)[0].offsetHeight;
                if (app.scrollPos >= topSection && app.scrollPos < bottomSection) {
                    app.currentSection = section;
                    console.log(app.currentSection);
                };

            };

            for(let i=1; i<=5; i++) {
            handleElement(i)};
        },

        sectionPos: function () {
            this.$nextTick (function () {
                let n = document.querySelectorAll(".section-container").length;
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                console.log(overallTop);
                console.log("resized");

                for (let i=1; i<=n; i++) {

                    if (i<n) {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop - overallTop);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + document.querySelectorAll("#"+"sc"+i)[0].offsetHeight);
                    } else {
                        app.sectionTops[i-1] = (document.querySelectorAll("#"+"sc"+i)[0].offsetTop) - overallTop;
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

    computed: {
    },

    mounted () {
        //window.addEventListener('resizeTest', this.test());
        this.$nextTick( function () {
            this.sectionPos();
            this.scrollFunc();}
    )},

});
