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

        // $(document).bind("allContentIsLoaded", icg.removeSplashScreen);
        // $(document).bind("icgReady", icg.icgReadyHandler);
        // $(document).trigger("icgFunctionalityLoading"); // triggers function loading

        $(window).load(mcdController.intializeAnimations);
        mcdController.setupFlashVideo();
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
        
        // promo animations
        $(".menu-container").each(function() {
            var _settings = $(this).data("promoAnimator");
            $(this).promoAnimator(_settings);
        });
        
    },
    animateEVMs: function() {

        // evm animations sequencing object
        var _evmAnimations = [{
                animation: "set",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .meal-items-image img, .evm-description-meal, .evm-alternate-sandwich, .evm-footnote, .evm-spacer",
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                animation: "flyIn",
                elementSelector: ".evm-item",
                flyInVars: {
                    ease: Power2.easeOut
                }
            }, {
                animation: "fadeIn",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .evm-spacer",
                duration: 2,
                fadeInVars: {
                    delay: 0.5
                }
            }, {
                elementSelector: ".meal-items-image img",
                duration: 0.5,
                repeat: false
            }];

        var $evmContainer = $(".evm-container");

        $.each(_evmAnimations, function(i) {
            $evmContainer.timelineBuilder(_evmAnimations[i].animation, _evmAnimations[i]);
        });
    }
};

$(document).ready(function() {
   mcdController.run();
   
   //initializes auto column split for menu items
   $('.menu-content-list').makeacolumnlists({cols: 2, colWidth: 400, equalHeight: false});
});