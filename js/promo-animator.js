(function($) {
    $.fn.promoAnimator = function(method) {

        var $container = this,
            namespace = "promoAnimator",
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

            flip: function() {

                var _index = settings.elementIndex;

                // add +1 to index or loop back to 0 if we've reached the end
                _index = (_index++ >= settings.totalElements - 1) ? 0 : _index;
                settings.elementIndex = _index;

                // get a random value between -25 and 25
                var _randomVal = Math.random() * 50 - 25;

                var _tl = new TimelineLite({
                    onComplete: function() {
                        settings.$currentElement = settings.$elements.eq(_index);
                        methods.incrementElementIndex();
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
            },

            fadeInOut: function() {

                settings.$elements.show().css("opacity", 0);
                settings.$currentElement.css("opacity", 1);

                /*settings.elementIndex++; // shift to the next element's index; the way we will define next element
                methods.setNextElement();
                methods.incrementElementIndex();*/

                var _timelineObj = methods.fadeInOutGetTimelineObjMaster(),
                    _tweenObjCurrent = methods.fadeInOutGetTweenObjCurrent(),
                    _tweenObjNext = methods.fadeInOutGetTweenObjNext();

                // _timelineObj.add(_tweenObj);

                ///////////////////////////////////////////////////////

                // var tl = new TimelineMax({ repeat: -1 });

                // TweenLite.set(settings.$elements, { alpha: 0 });
                // TweenLite.set(settings.$currentElement, { alpha: 1 });

                settings.$elements.each(function(i, element) {

                    var position = (i == 0) ? 0 : "-=1";
                    _timelineObj.add(TweenMax.to(element, 1, {css: {opacity: 1}, repeat: 1, repeatDelay: settings.interval / 1000, yoyo: true, ease: Linear.easeNone}), position);
                });

                // _timelineObj.add(_tweenObjCurrent);
                // _timelineObj.add(_tweenObjNext);
            },
            fadeInOutGetTimelineObjMaster: function() {

                var _vars = {
                        delay: settings.interval / 1000,
                        repeat: -1,
                        repeatDelay: settings.interval / 1000
                    };

                return methods.getTimelineObj(_vars);
            },
            fadeInOutGetTweenObjCurrent: function() {

                var _vars = {
                        css: { opacity: 0 },
                        ease: Power3.easeOut,
                        onComplete: methods.fadeInOutOnCompleteHandlerCurrent
                    };

                return methods.getTweenObj(_vars, settings.$currentElement);
            },
            fadeInOutGetTweenObjNext: function() {

                var _vars = {
                        css: { opacity: 1 },
                        ease: Power3.easeOut,
                        onComplete: methods.fadeInOutOnCompleteHandlerNext
                    };

                return methods.getTweenObj(_vars, settings.$nextElement);
            },
            fadeInOutGetTimelineObjSlave: function() {

                var _vars = {
                        ease: Power3.easeOut,
                        onStart: function() { settings.$nextElement.show(); },
                        onComplete: methods.fadeInOutOnCompleteHandler
                    },
                    _cssTransparent = {
                        css: { opacity: 0 }
                    },
                    _cssOpaque = {
                        css: { opacity: 1 }
                    };

                var _timelineObjSlave = methods.getTimelineObj(_vars)
                                        .to(settings.$currentElement, settings.duration, _cssTransparent);
                                        /*.add(function() {
                                            settings.$currentElement.hide();
                                            settings.$nextElement.show();
                                        })
                                        .invalidate()
                                        .fromTo(settings.$nextElement, settings.duration / 2, _cssTransparent, _cssOpaque)*/
                                        // .invalidate();

                return _timelineObjSlave;
            },
            fadeInOutOnCompleteHandlerCurrent: function() {
                // console.log("CURRENT complete");
                settings.$currentElement.css("opacity", 1);
                methods.setCurrentElement();
                this.invalidate();
            },
            fadeInOutOnCompleteHandlerNext: function() {
                // console.log("NEXT complete");
                settings.$nextElement.css("opacity", 0);
                methods.setNextElement();
                methods.incrementElementIndex();

                this.invalidate();
            },
            fadeInOutOnCompleteHandler: function() {
                // console.log("complete");

                // settings.$currentElement.hide();

                methods.setCurrentElement();
                methods.setNextElement();
                methods.incrementElementIndex();

                this.invalidate();
            },

            getTimelineObj: function(vars) {

                return new TimelineMax(vars);
            },
            getTweenObj: function(vars, $target) {

                $target = $target == undefined ? settings.$elements : $target;
                return new TweenMax($target, settings.duration, vars);
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

                _containerData[namespace].timelineObj = timelineObj;
                return this; // return methods property for method chainability
            },
            killAnimations: function() {

                return $container.each(function() {

                    var _containerData = $(this).data();

                    _containerData[namespace].timelineObj.kill();
                    _containerData[namespace].timelineObj = null;
                });
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