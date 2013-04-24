var introAnimations = {
    timelineTargetElements: {
        main: "body"
    },
    run: function() {
        this.introMain();
    },
    introMain: function() {

        // menu content animations sequencing object
        var _menuContentAnimations = [{
                operation: "set",
                elementSelector: mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer,
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                operation: "set",
                elementSelector: "#menu-content",
                setVars: {
                    css: { alpha: 1 }
                }
            }, {
                operation: "nest",
                elementSelector: evmAnimations.timelineTargetElements.intro,
                timelineVars: {
                    delay: 2.5
                }
            }, {
                operation: "fadeIn",
                elementSelector: mcdController.selectors.promoContainer,
                duration: 2,
                position: "-=2"
            }, {
                operation: "fadeIn",
                elementSelector: mcdController.selectors.menuContainer,
                duration: 2,
                position: "-=1.5"
            }, {
                operation: "nest",
                elementSelector: mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer,
                namespace: "carouselAnimator",
                alignment: "normal"
            }];

        var $menuContent = $(this.timelineTargetElements.main);
        mcdController.buildTimeline($menuContent, _menuContentAnimations);
    },
    killAnimations: function() {

        $.each(this.timelineTargetElements, function(key, targetElementSelector) {
            var $container = $(targetElementSelector);
            mcdController.killTimeline($container);
        });
    }
}