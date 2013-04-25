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
                elementSelector: mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer + ", " + evmAnimations.timelineTargetElements.intro + ", .zone-inset-shadow-l, .zone-inset-shadow-r",
                timelineVars: {
                    delay: 2.5,
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: introAnimations.introOnComplete
                    }
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
                elementSelector: mcdController.selectors.menuContainer + ", .zone-inset-shadow-r",
                duration: 0.5,
                position: "-=0.25"
            }, {
                operation: "fadeIn",
                elementSelector: evmAnimations.timelineTargetElements.intro + ", .zone-inset-shadow-l",
                duration: 0.5,
                position: "-=0.25"
            }];

        var $menuContent = $(this.timelineTargetElements.main);
        mcdController.buildTimeline($menuContent, _menuContentAnimations);
    },
    introOnComplete: function() {

        // play evmIntro timeline
        var $evmIntro = $(evmAnimations.timelineTargetElements.intro);
        mcdController.controlTimeline($evmIntro, "restart", true);
    },
    killAnimations: function() {

        $.each(this.timelineTargetElements, function(key, targetElementSelector) {
            var $container = $(targetElementSelector);
            mcdController.killTimeline($container);
        });
    }
}