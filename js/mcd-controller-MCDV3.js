var mcdController = {
    console: {
        on: false,
        log: function(msg) {
            if(!icg.console.on) {
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
    run: function() {
        $(window).load(mcdController.intializeAnimations);

        daypartController.run();
        mcdController.setupFlashVideo();

        $('.menu-content-list').makeacolumnlists({cols: 2, colWidth: 400, equalHeight: false});
    },
    setupFlashVideo: function() {
        // to play the pfe flash video
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
    animatePromos: function() {
        // promo animations
        $(".promo-container").each(function() {
            var _settings = $(this).data("promoAnimator");
            $(this).promoAnimator(_settings);
        });
    },
    animateEVMs: function() {
        evmAnimations.run(); // run the evm animations
    },
    buildTimeline: function($container, animations) {
        $.each(animations, function() {
            $container.timelineBuilder(this.operation, this);
        });
    },
    controlTimeline: function($container, action, params) {
        $container.timelineBuilder(action, params);
    }
};

$(document).ready(function() {
   mcdController.run();
});