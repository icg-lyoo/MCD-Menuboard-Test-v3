var evmAnimations = {
    timelineTargetElements: {
        intro: ".evm-container",
        sandwichToMeal: ".evm-item",
        sandwichOptions: ".sandwich-item-image, .evm-description"
    },
    run: function() {
        this.evmSandwichOptions(); // initialize the sandwich options timeline first (i.e. grilled/crispy)
        this.evmSandwichToMeal(); // initialize the sandwich to meal timeline
        this.evmIntro(); // initialize the the intro animations timeline
    },
    evmIntro: function() {

        // evm container animations sequencing object
        var _evmContainerAnimations = [{
                operation: "set",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .evm-footnote, .evm-spacer",
                timelineVars: {
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: evmAnimations.evmIntroOnComplete
                    }
                },
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                operation: "flyIn",
                elementSelector: ".evm-item",
                stagger: 0.15,
                flyInVars: {
                    ease: Power2.easeOut
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .evm-footnote, .evm-spacer",
                duration: 2
            }];

        var $evmContainer = $(evmAnimations.timelineTargetElements.intro);
        mcdController.buildTimeline($evmContainer, _evmContainerAnimations);
    },
    evmSandwichToMeal: function() {

        // evm items animations sequencing object
        var _evmItemAnimations = [{
                operation: "set",
                elementSelector: ".meal-items-image img, .evm-description-meal",
                position: 0,
                timelineVars: {
                    repeat: -1,
                    yoyo: true,
                    pause: true,
                    eventCallback: {
                        typeOf: "onRepeat",
                        callback: evmAnimations.evmSandwichToMealOnRepeat
                    }
                },
                setVars: {
                    css: { alpha: 0 },
                }
            }, {
                operation: "set",
                elementSelector: ".evm-description-sandwich, .evm-description-meal",
                position: 0,
                setVars: {
                    css: { position: "absolute" }
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".meal-items-image img, .evm-description-meal",
                duration: 0.7,
                position: 0,
                fadeInVars: {
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-sandwich",
                duration: 0.7,
                position: 0,
                fadeOutVars: {
                }
            }, {
                operation: "scale",
                elementSelector: ".sandwich-item-image img",
                duration: 0.7,
                position: 0,
                scaleVars: {
                    css: { scale: 0.75 }
                }
            }, {
                operation: "transform",
                elementSelector: ".evm-image .sandwich-item-image img",
                duration: 0.7,
                position: 0,
                transformVars: {
                    css: { left: -10, top: 20 }
                }
            }];

        var $evmItems = $(evmAnimations.timelineTargetElements.sandwichToMeal);
        mcdController.buildTimeline($evmItems, _evmItemAnimations);
    },
    evmSandwichOptions: function() {

        // evm alternate sandwich items sequencing object
        var _evmAlternateAnimations = [{
                operation: "set",
                elementSelector: ".evm-item-multiple .evm-calorie-container",
                position: 0,
                timelineVars: {
                    delay: 5,
                    repeat: 1,
                    repeatDelay: 5,
                    yoyo: true,
                    pause: true,
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: evmAnimations.evmSandwichOptionsOnComplete
                    }
                },
                setVars: {
                    css: { position: "absolute" }
                }
            }, {
                operation: "set",
                elementSelector: ".evm-item-multiple > .evm-calorie-container + .evm-calorie-container, .evm-item-multiple > img + img",
                position: 0,
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-item-multiple > .evm-calorie-container, .evm-item-multiple > img",
                duration: 1,
                position: 0,
                fadeOutVars: {
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-item-multiple > .evm-calorie-container + .evm-calorie-container, .evm-item-multiple > img + img",
                duration: 1,
                position: 0,
                fadeInVars: {
                }
            }];

        var $evmAlternates = $(evmAnimations.timelineTargetElements.sandwichOptions);
        mcdController.buildTimeline($evmAlternates, _evmAlternateAnimations);
    },
    evmIntroOnComplete: function() {

        // play evmSandwichOptions timeline
        var $evmAlternates = $(evmAnimations.timelineTargetElements.sandwichOptions);
        mcdController.controlTimeline($evmAlternates, "restart", true);
    },
    evmSandwichToMealOnRepeat: function() {

        // pause evmSandwichToMeal timeline
        var $evmItems = $(evmAnimations.timelineTargetElements.sandwichToMeal);
        mcdController.controlTimeline($evmItems, "pause");

        // play evmSandwichOptions timeline
        var $evmAlternates = $(evmAnimations.timelineTargetElements.sandwichOptions);
        mcdController.controlTimeline($evmAlternates, "restart", true);
    },
    evmSandwichOptionsOnComplete: function() {

        // play evmSandwichToMeal timeline
        var $evmItems = $(evmAnimations.timelineTargetElements.sandwichToMeal);
        mcdController.controlTimeline($evmItems, "play");
    }
}