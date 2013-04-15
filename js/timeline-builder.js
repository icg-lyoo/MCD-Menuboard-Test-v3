(function($) {
    $.fn.timelineBuilder = function(method) {

        var namespace = "timelineBuilder",
            $context = this,
            // private vars
            properties = {
                $elements: null,
                $container: null,
                dataObj: {}
            },
            // timeline animation special properties defaults
            animationSpecials = {
                ease: Linear.easeNone
            },
            // default vars - customizable
            settings = {
                // element properties
                elementSelector: $context.children(),
                elementIndex: 0,
                // animation properties
                timelineMaster: new TimelineMax(), // override to use a pre-existing TimelineMax instance instead of a new TimelineMax instance
                duration: 0.5,
                setVars: {},
                flyInVars: {
                    css: { left: $("body").width() },
                    ease: animationSpecials.ease
                },
                fadeStartVars: {
                    css: { alpha: 0 }
                },
                fadeInVars: {
                    css: { alpha: 1 },
                    ease: animationSpecials.ease
                },
                fadeOutVars: {
                    css: { alpha: 0 },
                    ease: animationSpecials.ease
                }
        },
        methods = {
            init: function(options) {

                settings = $.extend(true, settings, options);

                return $context.each(function() {

                    properties.$container = $(this);

                    // if the plugin hasn't been initialized yet, add the data
                    if (!methods.getData()) {
                        methods.addData();
                    }
                });
            },
            set: function(options) {

                return $context.each(function() {

                    methods.setPluginVars($(this), options);
                    settings.timelineMaster.set(properties.$elements, settings.setVars);

                    methods.addData(); // saves TimelineMax and settings to the container
                });
            },
            flyIn: function(options) {

                return $context.each(function() {

                    methods.setPluginVars($(this), options);
                    settings.timelineMaster.staggerFrom(properties.$elements, settings.duration, settings.flyInVars, 0.15);

                    methods.addData(); // saves TimelineMax and settings to the container
                });
            },
            fadeIn: function(options) {

                return $context.each(function() {

                    methods.setPluginVars($(this), options);
                    settings.timelineMaster.set(properties.$elements, settings.fadeStartVars)
                            .to(properties.$elements, settings.duration, settings.fadeInVars);

                    methods.addData(); // saves TimelineMax and settings to the container
                })
            },
            fadeOut: function(options) {

                return $context.each(function() {

                    methods.setPluginVars($(this), options);
                    settings.timelineMaster.set(properties.$elements, settings.fadeStartVars)
                            .to(properties.$elements, settings.duration, settings.fadeOutVars);

                    methods.addData(); // saves TimelineMax and settings to the container
                })
            },
            setPluginVars: function($container, options) {

                properties.$container = $container;
                var _data = methods.getData();

                if (_data != undefined) {
                    settings = _data.settings;
                }

                settings = $.extend(true, settings, options);
                properties.$elements = properties.$container.find(settings.elementSelector);

                console.log("TIMELINE MASTER: ", settings.timelineMaster);
            },
            addData: function() {

                var _data = { settings: settings };
                properties.$container.data(namespace, _data);
            },
            getData: function() {

                return properties.$container.data(namespace);
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