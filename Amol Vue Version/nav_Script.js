// Code for navigation functionality in visualisations main screen using Vue

let app = new Vue ({

    el: "#app",

    data: {
        scrollPos: 0,
        currentSection: 0,
        sectionTops: [,,,,],
        sectionBottoms: [,,,,],
    },

    methods: {
        scrollFunc: function () {

            let topspace =  $("#vis-title").outerHeight();

            app.scrollPos = $(".journey").scrollTop();

            console.log("scrollPos: " + app.scrollPos);

            function handleElement(section) {

                // update currentSection if user scrolls past
                // the top edge of its corresponding paragraph on left side
                let topSection = $("#"+"sc"+section).offset().top;
                let bottomSection = topSection + $("#"+"sc"+section).outerHeight();
                if (topspace >= topSection && topspace < bottomSection) {
                    app.currentSection = section;
                    console.log(app.currentSection);
                };

            };

            for(let i=1; i<=5; i++) {
            handleElement(i)};
        },

        sectionPos: function () {
            this.$nextTick (function () {
                let n = $(".section-container").length;

                for (let i=1; i<=n; i++) {

                    if (i<n) {
                        app.sectionTops[i-1] = ($("#"+"sc"+i).offset().top);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + $("#"+"sc"+i).outerHeight())
                    } else {
                        app.sectionTops[i-1] = ($("#"+"sc"+i).offset().top);
                        app.sectionBottoms[i-1] = (app.sectionTops[i-1] + $("#"+"sc"+i).outerHeight() - $(".journey").height())
                    }

                }
            })
        }
    },

    computed: {
    },

    mounted () {
        this.$nextTick( function () {
            this.sectionPos();
            this.scrollFunc();}
    )},

});
