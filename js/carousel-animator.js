(function($) {
    $.fn.carouselAnimator = function(method) {

        var $container = this,
            namespace = "carouselAnimator",
            settings = {
                // element properties
                elementSelector: $container.children(),
                elementIndex: 0,
                // animation properties
                animation: null,
                duration: 0.5,
                delay: 0,
                offset: 0,
                interval: 2,
                // flip property
                flipDepth: -500,
                // not to be defined outside of plugin
                $elements: null,
                $currentElement: null,
                $nextElement: null,
                totalElements: 0,
                defaultAnimation: "slide",
                isAnimating: false
        },
        methods = {
            init: function(options) {

                settings = $.extend(true, settings, options);

                return $container.each(function() {

                    settings.$elements = $(this).find(settings.elementSelector);
                    settings.totalElements = settings.$elements.length;

                    methods.runPlugin();
                });
            },
            runPlugin: function() {

                var _index = settings.elementIndex;

                if (settings.totalElements > 1) {

                    settings.$currentElement = settings.$elements.eq(_index); // the element to transition out
                    settings.$nextElement = settings.$elements.eq(_index + 1); // the element to transition in

                    // hide the all the images but the first one
                    settings.$elements.hide();
                    settings.$currentElement.show();

                    methods.runAnimation();
                }
            },
            runAnimation: function() {

                if (methods[settings.animation]) {
                    methods[settings.animation]();
                } else if ($.isFunction(settings.animation)) {
                    settings.animation();
                } else {
                    methods[settings.defaultAnimation]();
                }
            },
            slide: function() {

                settings.elementIndex++; // shift to the next element's index; the way we will define next element
                methods.slidePrepareNextElement();
                methods.incrementElementIndex();

                var _timelineObj = methods.slideGetTimelineObj(),
                    _tweenObj = methods.slideGetTweenObj();

                _timelineObj.add(_tweenObj);
                methods.addTimelineToContainer(_timelineObj);
            },
            slideGetTimelineObj: function() {

                var _vars = {
                        delay: settings.delay,
                        repeat: -1,
                        repeatDelay: settings.interval
                    };

                return methods.getTimelineObj(_vars);
            },
            slideGetTweenObj: function() {

                var _vars = {
                        css: { left: "+=" + settings.$nextElement.width() },
                        ease: Power3.easeOut,
                        onComplete: methods.slideOnCompleteHandler
                    };

                return methods.getTweenObj(_vars, "to");
            },
            slideOnCompleteHandler: function() {

                methods.slideHandleCurrentElement();
                methods.slidePrepareNextElement();
                methods.incrementElementIndex();

                this.invalidate();
            },
            slideHandleCurrentElement: function() {

                settings.$currentElement.hide();
                methods.setCurrentElement();
            },
            slidePrepareNextElement: function() {

                methods.setNextElement();

                var left = settings.$nextElement.width() * -1;

                settings.$nextElement.css({left: left});
                settings.$nextElement.show();
            },

            fadeInOut: function() {

                var _timelineObj = methods.fadeInOutGetTimelineObj();

                settings.$elements.each(function(i) {

                    var position = i === 0 ? 0 : "+=" + settings.offset;
                    _timelineObj.add(methods.fadeInOutGetTweenObj(this), position);
                });

                _timelineObj.fromTo(settings.$elements.eq(0), settings.duration, {opacity: 0}, {opacity: 1}, "+=" + settings.offset)
                            .call(_timelineObj.seek, [settings.duration], _timelineObj);

                methods.addTimelineToContainer(_timelineObj);
            },
            fadeInOutGetTimelineObj: function() {

                var _vars = {
                        delay: settings.delay,
                        repeat: 0,
                        repeatDelay: settings.repeatDelay
                    };

                return methods.getTimelineObj(_vars)
                              .set(settings.$elements, {css: {position: "absolute"}});
            },
            fadeInOutGetTweenObj: function($element) {

                var _vars = [{
                        css: { alpha: 0 }
                    }, {
                        css: { display: "block", alpha: 1 },
                        repeat: 1,
                        repeatDelay: settings.interval,
                        yoyo: true,
                        ease: Linear.easeNone
                    }];

                return methods.getTweenObj(_vars, "fromTo", $element);
            },

            getTimelineObj: function(vars) {

                return new TimelineMax(vars);
            },
            getTweenObj: function(vars, method, $target) {

                $target = $target == undefined ? settings.$elements : $target;

                if (Array.isArray(vars)) {
                    return TweenMax[method]($target, settings.duration, vars[0], vars[1]);
                } else {
                    return TweenMax[method]($target, settings.duration, vars);
                }
            },
            incrementElementIndex: function() {

                // add +1 to index or loop back to 0 if we've reached the end
                settings.elementIndex = (settings.elementIndex++ >= settings.totalElements - 1) ? 0 : settings.elementIndex;
            },
            setCurrentElement: function() {

                if (settings.$nextElement) {
                    settings.$currentElement = settings.$nextElement;
                } else {
                    settings.$currentElement = settings.$elements.eq(settings.elementIndex);
                }
            },
            setNextElement: function() {

                settings.$nextElement = settings.$elements.eq(settings.elementIndex);
            },
            addTimelineToContainer: function(timelineObj) {

                var _container = settings.$elements.closest($container),
                    _containerData = _container.data();

                _containerData[namespace].settings = { timelineMaster: timelineObj };
                return this; // return methods property for method chainability
            },
            killAnimations: function() {

                return $container.each(function() {

                    var _containerData = $(this).data();

                    _containerData[namespace].settings.timelineMaster.kill();
                    _containerData[namespace].settings.timelineMaster = null;
                });
            }
        };

        //default code to run a specific method
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + " does not exist on jQuery.carouselAnimator");
        }

        return {};
    };
})(jQuery);