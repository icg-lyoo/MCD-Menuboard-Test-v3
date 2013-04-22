(function($) {
    $.fn.timelineBuilder = function(method) {

        var namespace = "timelineBuilder",
            $context = this,
            // private vars
            properties = {
                $elements: null, // $object: operation effected dom elements
                $container: null, // $object: parent container to $elements
                dataObj: {}
            },
            // timeline animation special properties defaults
            animationSpecials = {
                ease: Quad.easeOut
            },
            // default vars - customizable
            settings = {
                // element properties
                elementSelector: $context.children(),
                elementIndex: 0,
                // animation properties
                timelineMaster: new TimelineMax(), // override to use a pre-existing TimelineMax instance instead of a new TimelineMax instance
                duration: 0.5,
                stagger: 0,
                position: "+=0",
                alignment: "sequence",
                timelineVars: {
                    delay: 0,
                    repeat: 0,
                    repeatDelay: 0,
                    yoyo: false,
                    pause: false,
                    eventCallback: null // object: define "typeOf": String ("onComplete", "onUpdate", "onStart", "onReverseComplete", "onRepeat"), "callback": Function
                },
                setVars: null, // object: define any css values that will take effect on $elements immediately; conveniently set $elements' state in same animation call, or independent of any other animation operations
                flyInVars: {
                    css: { left: $("body").width() },
                    ease: animationSpecials.ease
                },
                fadeInVars: {
                    css: { alpha: 1 },
                    ease: animationSpecials.ease
                },
                fadeOutVars: {
                    css: { alpha: 0 },
                    ease: animationSpecials.ease
                },
                scaleVars: {
                    css: { scale: 0.5 },
                    ease: animationSpecials.ease
                },
                transformVars: {
                    css: {},
                    ease: animationSpecials.ease
                }
            },
            methods = {
                init: function(options) {

                    settings = $.extend(true, settings, options);

                    return $context.each(function() {

                        properties.$container = $(this);

                        // if the plugin hasn't been initialized yet, add the data
                        if (!methods.getData(properties.$container)) {
                            methods.addData();
                        }
                    });
                },
                set: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars();

                        methods.addData();
                   });
                },
                flyIn: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.staggerFrom(properties.$elements, settings.duration, settings.flyInVars, settings.stagger, settings.position);
                        methods.addData();
                    });
                },
                fadeIn: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        properties.$elements.show();

                        settings.timelineMaster.to(properties.$elements, settings.duration, settings.fadeInVars, settings.position);
                        methods.addData();
                    });
                },
                fadeOut: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.to(properties.$elements, settings.duration, settings.fadeOutVars, settings.position);
                        methods.addData();
                    });
                },
                scale: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.to(properties.$elements, settings.duration, settings.scaleVars, settings.position);
                        methods.addData();
                    });
                },
                transform: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.to(properties.$elements, settings.duration, settings.transformVars, settings.position);
                        methods.addData();
                    });
                },
                nest: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars();

                        _timelines = []; // holds all timelines to add simultaneously to timelineMaster

                        properties.$elements.each(function(i) {

                            var _data = methods.getData($(this));
                            _timelines[i] = _data.settings.timelineMaster;
                        });

                        settings.timelineMaster.add(_timelines, settings.position, settings.alignment);
                        methods.addData();
                    });
                },
                pause: function(atTime) {

                    return $context.each(function() {

                        methods.setPluginVars($(this));
                        if (atTime == undefined) { atTime = settings.timelineMaster.progress(); }

                        settings.timelineMaster.pause(atTime);
                    });
                },
                play: function(from) {

                    return $context.each(function() {

                        methods.setPluginVars($(this));
                        if (from == undefined) { from = settings.timelineMaster.progress(); }

                        settings.timelineMaster.play(from);
                    });
                },
                resume: function(from) {

                    return $context.each(function() {

                        methods.setPluginVars($(this));
                        if (from == undefined) { from = settings.timelineMaster.progress(); }

                        settings.timelineMaster.resume(from);
                    });
                },
                restart: function(includeDelay) {

                    if (includeDelay == undefined) { includeDelay = false; }

                    return $context.each(function() {

                        methods.setPluginVars($(this));
                        settings.timelineMaster.restart(includeDelay);
                    });
                },
                // kills/stops timeline animations immediately, and releases it for garbage collection
                kill: function() {

                    return $context.each(function() {

                        var _data = methods.getData($(this));

                        _data.settings.timelineMaster.kill();
                        $(this).removeData(namespace); // remove data namespace from DOM element
                    });
                },
                setPluginVars: function($container, options) {

                    // set/initialize the settings and properties vars for the plugin

                    properties.$container = $container;
                    var _data = methods.getData(properties.$container);

                    if (_data != undefined) {
                        settings = _data.settings;
                    }

                    if (options == undefined) {
                        options = {};
                    }

                    settings = $.extend(true, settings, options);
                    properties.$elements = properties.$container.find(settings.elementSelector);

                    return this; // return plugin's methods property for chainable method calling
                },
                setElementVars: function() {

                    // utilize the timeline set method on defined elements

                    if (settings.setVars) {
                        settings.timelineMaster.set(properties.$elements, settings.setVars, settings.position);
                        settings.position = "+=0";
                        settings.setVars = null;
                    }

                    return this; // return plugin's methods property for chainable method calling
                },
                setTimelineVars: function() {

                    var _timelineVars = settings.timelineVars;

                    settings.timelineMaster.delay(_timelineVars.delay)
                                           .repeat(_timelineVars.repeat)
                                           .repeatDelay(_timelineVars.repeatDelay)
                                           .yoyo(_timelineVars.yoyo)
                                           .paused(_timelineVars.pause);

                    var _eventCallback = _timelineVars.eventCallback;

                    if (_eventCallback) {
                        settings.timelineMaster.eventCallback(_eventCallback.typeOf, _eventCallback.callback);
                    }
                },
                // saves TimelineMax and settings to the container
                addData: function() {

                    var _data = { settings: settings };
                    properties.$container.data(namespace, _data);

                    return this; // return plugin's methods property for chainable method calling
                },
                getData: function($container) {

                    return $container.data(namespace);
                }
            };

        //default code to run a specific method
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + " does not exist on jQuery." + namespace);
        }

        return {};
    };
})(jQuery);