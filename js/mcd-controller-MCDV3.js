var mcdController = {
    console: {
        on: true,
        log: function(msg) {
            if(!mcdController.console.on) {
                return;
            }

            if(console == undefined || console.length == 0) {
                // dont do anything
                // TODO : Implement console in DOM
            } else {
                console.log(msg);
            }
        }
    },
    selectors: {
        menuColumn: ".menu-content-list",
        promoContainer: ".promo-container"
    },
    windowLoaded: false,
    run: function() {
        if (mcdController.windowLoaded) {
            mcdController.windowLoadedHandler();
        } else {
            $(window).load(mcdController.windowLoadedHandler);
        }

        daypartController.run();
        mcdController.setupFlashVideo();

        $(mcdController.selectors.menuColumn).makeacolumnlists({cols: 2, colWidth: 400, equalHeight: false});
    },
    windowLoadedHandler: function() {
        mcdController.windowLoaded = true;
        mcdController.intializeAnimations();
    },
    setupFlashVideo: function() {
        // to play the pe flash video
        if (swfobject.hasFlashPlayerVersion("9.0.0")) {
            var fn = function() {

               swfobject.removeSWF("pe-container");

                var attributes = { data: "promo.swf"};

                var params = {
                    quality: "high",
                    bgcolor: "#ffffff",
                    play: "true",
                    loop: "true",
                    scale: "noscale",
                    wmode: "gpu",
                    menu: "true",
                    devicefont: "false",
                    salign: "lt",
                    allowScriptAccess: "sameDomain"
                };

                var flashvars = {
                    promoOffset: "0 ,0",
                    scalable: "0",
                    debug: "1",
                    preview: "0",
                    bgImg: null,
                    dataUrl: "promodata.txt"
                };

                swfobject.embedSWF("promo.swf", "pe-container", "1920", "1080", "9.0.0","expressInstall.swf", flashvars, params, attributes);
            };

            swfobject.addDomLoadEvent(fn);
        }
    },
    intializeAnimations: function() {
        mcdController.animatePromos();
        mcdController.animateEVMs();
    },
    killAnimations: function() {
        mcdController.killPromoAnimations()
                     .killEVMAnimations();
    },
    animatePromos: function() {
        // promo animations
        $(mcdController.selectors.promoContainer).each(function() {
            var _settings = $(this).data("promoAnimator");
            $(this).promoAnimator(_settings);
        });
    },
    animateEVMs: function() {
        evmAnimations.run(); // run the evm animations
    },
    killPromoAnimations: function() {
        $(mcdController.selectors.promoContainer).each(function() {
            $(this).promoAnimator("killAnimations");
        });

        return this;
    },
    killEVMAnimations: function() {
        evmAnimations.killAnimations();
        return this;
    },
    buildTimeline: function($container, animations) {
        $.each(animations, function() {
            $container.timelineBuilder(this.operation, this);
        });
    },
    controlTimeline: function($container, action, params) {
        $container.timelineBuilder(action, params);
    },
    killTimeline: function($container) {
        $container.timelineBuilder("kill");
    }
};

$(document).ready(function() {
   mcdController.run();
});