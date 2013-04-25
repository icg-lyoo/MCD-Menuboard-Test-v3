var outroAnimations = {
    timelineTargetElements: {
        main: "body"
    },
    run: function() {
        this.outroMain();
    },
    outroMain: function() {

        // menu content animations sequencing object
        var _menuContentAnimations = [{
                operation: "fadeOut",
                elementSelector: "#menu-content",
                duration: 0.5,
                timelineVars: {
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: outroAnimations.outroMainOnComplete
                    }
                }
            }];

        var $menuContent = $(this.timelineTargetElements.main);
        mcdController.buildTimeline($menuContent, _menuContentAnimations);
    },
    outroMainOnComplete: function() {
        outroAnimations.killAnimations();
        daypartController.switchDaypart();
    },
    killAnimations: function() {

        $.each(this.timelineTargetElements, function(key, targetElementSelector) {
            var $container = $(targetElementSelector);
            mcdController.killTimeline($container);
        });
    }
}