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
                // animation properties
                timelineMaster: new TimelineMax(), // override to use a pre-existing TimelineMax instance instead of a new TimelineMax instance
                duration: 0.5,
                stagger: 0,
                position: "+=0",
                alignment: "sequence",
                timelineVars: {
                    namespace: "timeline",
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
                    // css: use scale or height/width,
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

                        settings.timelineMaster.staggerTo(properties.$elements, settings.duration, settings.fadeInVars, settings.stagger, settings.position);
                        methods.addData();
                    });
                },
                fadeOut: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.staggerTo(properties.$elements, settings.duration, settings.fadeOutVars, settings.stagger, settings.position);
                        methods.addData();
                    });
                },
                scale: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.staggerTo(properties.$elements, settings.duration, settings.scaleVars, settings.stagger, settings.position);
                        methods.addData();
                    });
                },
                transform: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        settings.timelineMaster.staggerTo(properties.$elements, settings.duration, settings.transformVars, settings.stagger, settings.position);
                        methods.addData();
                    });
                },
                nest: function(options) {

                    return $context.each(function() {

                        methods.setPluginVars($(this), options)
                               .setElementVars()
                               .setTimelineVars();

                        _timelines = []; // holds all timelines to add simultaneously to timelineMaster

                        properties.$elements.each(function(i) {

                            var _data = methods.getData($(this));
                            _timelines[i] = _data.settings.timelineMaster;
                        });

                        settings.timelineMaster.add(_timelines, settings.position, settings.alignment, settings.stagger);
                        methods.addData();
                    });
                },
                /**
                 * @params object { atTime: float(0-1)|int(seconds), namespace: string }
                 */
                pause: function(params) {

                    if (params != undefined && params.namespace != undefined) {
                        settings.timelineVars.namespace = params.namespace;
                    }

                    return $context.each(function() {

                        methods.setPluginVars($(this));

                        var _atTime = settings.timelineMaster.progress();
                        if (params != undefined && params.atTime != undefined) { _atTime = params.atTime; }

                        settings.timelineMaster.pause(_atTime);
                    });
                },
                /**
                 * @params object { from: float(0-1)|int(seconds), namespace: string }
                 */
                play: function(params) {

                    if (params != undefined && params.namespace != undefined) {
                        settings.timelineVars.namespace = params.namespace;
                    }

                    return $context.each(function() {

                        methods.setPluginVars($(this));

                        var _from = settings.timelineMaster.progress();
                        if (params != undefined && params.from != undefined) { _from = params.from; }

                        settings.timelineMaster.play(_from);
                    });
                },
                /**
                 * @params object { from: float(0-1)|int(seconds), namespace: string }
                 */
                resume: function(params) {

                    if (params != undefined && params.namespace != undefined) {
                        settings.timelineVars.namespace = params.namespace;
                    }

                    return $context.each(function() {

                        methods.setPluginVars($(this));

                        var _from = settings.timelineMaster.progress();
                        if (params != undefined && params.from != undefined) { _from = params.from; }

                        settings.timelineMaster.resume(from);
                    });
                },
                /**
                 * @params object { includeDelay: boolean, namespace: string }
                 */
                restart: function(params) {

                    var _includeDelay = false;

                    if (params != undefined) {
                        if (params.includeDelay != undefined) { _includeDelay = params.includeDelay; }

                        if (params.namespace != undefined) {
                            settings.timelineVars.namespace = params.namespace;
                        }
                    }

                    return $context.each(function() {
                        methods.setPluginVars($(this));
                        settings.timelineMaster.restart(_includeDelay);
                    });
                },
                // kills/stops timeline animations immediately, and releases it for garbage collection
                kill: function(timelineNamespace) {

                    var _namespace = settings.timelineVars.namespace;

                    if (timelineNamespace != undefined) { _namespace = timelineNamespace; }

                    return $context.each(function() {

                        methods.setPluginVars($(this));

                        settings.timelineMaster.kill();
                        $(this).removeData(_namespace); // remove data namespace from DOM element
                    });
                },
                setPluginVars: function($container, options) {

                    // set/initialize the settings and properties vars for the plugin

                    properties.$container = $container;

                    options = options == undefined ? {} : options;
                    settings = $.extend(true, settings, options);

                    var _data = methods.getData(properties.$container);

                    if (_data != undefined && _data[settings.timelineVars.namespace] != undefined) {
                        settings = _data[settings.timelineVars.namespace];
                        settings = $.extend(true, settings, options);
                    }

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

                    var _data = properties.$container.data(),
                        _timelineNamespace = settings.timelineVars.namespace;

                    if (_data != undefined && _data[namespace] != undefined ) {
                        _data[namespace][_timelineNamespace] = settings;
                    } else {
                        _data = {};
                        _data[settings.timelineVars.namespace] = settings;
                        properties.$container.data(namespace, _data);
                    }

                    return this; // return plugin's methods property for chainable method calling
                },
                getData: function($container) {

                    var _namespace = namespace;

                    // if a namespace is provided in the options/settings, element data is from external plugin
                    if (settings.namespace != undefined) {
                        // _namespace = settings.namespace;
                    }

                    return $container.data(_namespace);
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