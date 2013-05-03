var outroAnimations = {
    timelineTargets: {
        main: {
            namespace: "outroMain",
            containerSelector: "body"
        }
    },
    run: function() {
        this.outroMain();
    },
    outroMain: function() {

        // menu content animations sequencing object
        var _timelineNamespace = outroAnimations.timelineTargets.main.namespace,
            _animations = [{
                operation: "fadeOut",
                elementSelector: "#menu-content",
                duration: 0.5,
                timelineVars: {
                    namespace: _timelineNamespace,
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: outroAnimations.outroMainOnComplete
                    }
                }
            }];

        var $container = $(this.timelineTargets.main.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    outroMainOnComplete: function() {
        outroAnimations.killAnimations();
        daypartController.switchDaypart();
    },
    killAnimations: function() {

        $.each(evmAnimations.timelineTargets, function(key, target) {
            var $container = $(target.containerSelector);
            mcdController.killTimeline($container, target.namespace);
        });
    }
}