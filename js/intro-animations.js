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
                timelineVars: {
                    delay: 2.5
                },
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
                operation: "fadeIn",
                elementSelector: mcdController.selectors.promoContainer,
                duration: 0.5
            }, {
                operation: "fadeIn",
                elementSelector: mcdController.selectors.menuContainer,
                duration: 0.5,
                position: "-=0.25"
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