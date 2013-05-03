var introAnimations = {
    timelineTargets: {
        main: {
            namespace: "introMain",
            containerSelector: "body"
        }
    },
    run: function() {
        this.introMain();
    },
    introMain: function() {

        // menu content animations sequencing object
        var _timelineNamespace = introAnimations.timelineTargets.main.namespace,
            _animations = [{
                operation: "set",
                elementSelector: mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer + ", " + evmAnimations.timelineTargets.intro.containerSelector + ", .zone-inset-shadow-l, .zone-inset-shadow-r",
                timelineVars: {
                    namespace: _timelineNamespace,
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
                timelineVars: {
                    namespace: _timelineNamespace
                },
                setVars: {
                    css: { alpha: 1 }
                }
            }, {
                operation: "fadeIn",
                elementSelector: mcdController.selectors.promoContainer,
                duration: 0.5,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: mcdController.selectors.menuContainer + ", .zone-inset-shadow-r",
                duration: 0.5,
                position: "-=0.25",
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: evmAnimations.timelineTargets.intro.containerSelector + ", .zone-inset-shadow-l",
                duration: 0.5,
                position: "-=0.25",
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }];

        var $container = $(introAnimations.timelineTargets.main.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    introOnComplete: function() {

        // play evmIntro timeline
        var $evmIntro = $(evmAnimations.timelineTargets.intro.containerSelector),
            _namespace = evmAnimations.timelineTargets.intro.namespace,
            _params = { includeDelay: true, namespace: _namespace };

        mcdController.controlTimeline($evmIntro, "restart", _params);
    },
    killAnimations: function() {

        $.each(evmAnimations.timelineTargets, function(key, target) {
            var $container = $(target.containerSelector);
            mcdController.killTimeline($container, target.namespace);
        });
    }
}