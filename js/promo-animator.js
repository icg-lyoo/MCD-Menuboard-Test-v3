(function($) {
    $.fn.promoAnimator = function(method) {

        var $container = this,
            settings = {
                // element properties
                elementSelector: $container.children(),
                elementIndex: 0,
                // animation properties
                animation: null,
                duration: 0.5,
                interval: 2000,
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
                    settings.$nextElement.show();

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
                methods.incrementElementIndex();
                methods.slidePositionNextElement();

                var _timelineObj = methods.slideGetTimelineObj(),
                    _tweenObj = methods.slideGetTweenObj();

                _timelineObj.add(_tweenObj);
            },
            slideGetTimelineObj: function() {

                var _vars = {
                        delay: settings.interval / 1000,
                        repeat: -1,
                        repeatDelay: settings.interval / 1000
                    };

                return methods.getTimelineObj(_vars);
            },
            slideGetTweenObj: function() {

                var _vars = {
                        css: { left: "+=" + settings.$nextElement.width() },
                        ease: Power3.easeOut,
                        onComplete: methods.slideOnCompleteHandler
                    };

                return methods.getTweenObj(_vars);
            },
            slideOnCompleteHandler: function() {

                methods.slideHandleCurrentElement();
                methods.slideHandleNextElement();
                methods.incrementElementIndex();

                this.invalidate();
            },
            slideHandleCurrentElement: function() {

                settings.$currentElement.hide();
                settings.$currentElement = settings.$nextElement;
            },
            slideHandleNextElement: function() {

                settings.$nextElement = settings.$elements.eq(settings.elementIndex);

                methods.slidePositionNextElement();
                settings.$nextElement.show();
            },
            slidePositionNextElement: function() {

                var left = settings.$nextElement.width() * -1;
                settings.$nextElement.css({left: left});
            },
            getTimelineObj: function(vars) {

                return new TimelineMax(vars);
            },
            getTweenObj: function(vars) {

                return new TweenMax(settings.$elements, settings.duration, vars);
            },
            incrementElementIndex: function() {
                // add +1 to index or loop back to 0 if we've reached the end
                settings.elementIndex = (settings.elementIndex++ >= settings.totalElements - 1) ? 0 : settings.elementIndex;
            },
            flip: function() {

                // ignore click until any current animations have completed
                if (settings.isAnimating) return;
                settings.isAnimating = true;

                var _index = settings.elementIndex;

                // add +1 to index or loop back to 0 if we've reached the end
                _index = (_index++ >= settings.totalElements - 1) ? 0 : _index;
                settings.elementIndex = _index;

                // get a random value between -25 and 25
                var _randomVal = Math.random() * 50 - 25;

                var _tl = new TimelineLite({
                    onComplete: function() {
                        settings.$currentElement = settings.$elements.eq(_index);
                        settings.isAnimating = false;
                    }
                });

                _tl.to(settings.$currentElement, settings.duration, {
                    css: {rotationY: 90, z: settings.flipDepth, rotationX: _randomVal, alpha: 0.3},
                    ease:Expo.easeIn
                });

                _tl.append(function() {
                    settings.$currentElement.hide();
                    settings.$elements.eq(_index).show();
                })

                _tl.fromTo(settings.$elements.eq(_index), settings.duration,
                    // we need to flip the number sign for rotationX, so we do -_randomVal instead of _randomVal
                    {css: {rotationY: -90, z: settings.flipDepth, rotationX: -_randomVal, alpha: 0.3}},
                    {css: {rotationY: 0, z: 0, rotationX: 0, alpha: 1}, ease: Expo.easeOut}
                );
                    
                setInterval(methods.flip, settings.interval);
//                setTimeout(methods.flip, settings.interval);
            },
            fadeInOut: function() {

                // ignore click until any current animations have completed
                if (settings.isAnimating) return;
                settings.isAnimating = true;

                var _index = settings.elementIndex;

                // add +1 to index or loop back to 0 if we've reached the end
                _index = (_index++ >= settings.totalElements - 1) ? 0 : _index;
                settings.elementIndex = _index;

                var _tl = new TimelineLite({
                    onComplete: function() {
                        settings.$currentElement = settings.$elements.eq(_index);
                        settings.isAnimating = false;
                    }
                });

                _tl.to(settings.$currentElement, settings.duration / 2,
                {css: {alpha: 0}, ease: Linear.easeNone}
                );

                _tl.append(function() {
                    settings.$currentElement.hide();
                    settings.$elements.eq(_index).show();
                })

                _tl.fromTo(settings.$elements.eq(_index), settings.duration / 2,
                    {css: {alpha: 0}, ease: Linear.easeNone},
                    {css: {alpha: 1}, ease: Linear.easeNone}
                );
                    
                setInterval(methods.fadeInOut, settings.interval);
            }
        };

        //default code to run a specific method
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + " does not exist on jQuery.promoAnimator");
        }

        return {};


        // Animate first image in
        /*TweenMax.fromTo($currentImage, 1.8,
            {css: {rotationY: -110, rotationX: Math.random() * 35, z: -1000, alpha: 0}},
            {css: {rotationY: 0, rotationX: 0, z: 0, alpha: 1}, ease: Power3.easeInOut, onComplete: function() {
                //$imgWrap.on('click', flip);
            setInterval(fadeInOut, 5000);
        }});*/
    };
})(jQuery);