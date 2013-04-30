var mcdController = {
    console: {
        on: false,
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
        promoContainer: ".promo-container",
        menuContainer: ".menu-container"
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

                var daypartNow = daypartController.currentDaypart;

               swfobject.removeSWF("pe-container-" + daypartNow);

                var attributes = { data: "promo.swf" };

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
                    dataUrl: "promodata-" + daypartNow + ".txt"
                };

                swfobject.embedSWF("promo.swf", "pe-container-" + daypartNow, "1920", "1080", "9.0.0","expressInstall.swf", flashvars, params, attributes);
            };

            swfobject.addDomLoadEvent(fn);
        }
    },
    intializeAnimations: function() {
        mcdController.animateCarousels();
        mcdController.animateEVMs();
        mcdController.animateIntro();
    },
    killAnimations: function() {
        mcdController.killCarouselAnimations()
                     .killEVMAnimations()
                     .killIntroAnimations();
    },
    animateCarousels: function() {
        // promo animations
        $(mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer).each(function() {
            var _settings = $(this).data("carouselAnimator");
            $(this).carouselAnimator(_settings);
        });
    },
    animateEVMs: function() {
        evmAnimations.run(); // run the evm animations
    },
    animateIntro: function() {
        introAnimations.run(); // run the intro animations
    },
    animateOutro: function() {
        outroAnimations.run(); // run the outro animations
    },
    killCarouselAnimations: function() {
        $(mcdController.selectors.promoContainer + ", " + mcdController.selectors.menuContainer).each(function() {
            $(this).carouselAnimator("killAnimations");
        });

        return this;
    },
    killEVMAnimations: function() {
        evmAnimations.killAnimations();
        return this;
    },
    killIntroAnimations: function() {
        introAnimations.killAnimations();
        return this;
    },
    buildTimeline: function($container, animations) {
        $.each(animations, function(i) {
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