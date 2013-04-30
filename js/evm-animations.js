var evmAnimations = {
    timelineTargets: {
        intro: {
            namespace: "evmIntro",
            containerSelector: ".evm-container"
        },
        sandwichToMeal: {
            namespace: "evmSandwichToMeal",
            containerSelector: ".evm-container"
        },
        mealToSandwich: {
            namespace: "evmMealToSandwich",
            containerSelector: ".evm-container"
        },
        sandwichOptions: {
            namespace: "evmSandwichOptions",
            containerSelector: ".evm-container"
        }
    },
    animationToggles: {
        sandwichOptions: 0
    },
    run: function() {
        evmAnimations.evmSandwichOptions(); // initialize the sandwich options timeline first (i.e. grilled/crispy)
        evmAnimations.evmMealToSandwich(); // initialize the meal to sandwich timeline
        evmAnimations.evmSandwichToMeal(); // initialize the sandwich to meal timeline
        evmAnimations.evmIntro(); // initialize the the intro animations timeline
    },
    evmIntro: function() {

        // evm container animations sequencing object
        var _timelineNamespace = evmAnimations.timelineTargets.intro.namespace,
            _animations = [{
                operation: "set",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .evm-footnote, .evm-spacer",
                timelineVars: {
                    namespace: _timelineNamespace,
                    pause: true,
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
                timelineVars: {
                    namespace: _timelineNamespace
                },
                flyInVars: {
                    ease: Power2.easeOut
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-number, .evm-heading, .evm-description, .evm-footnote, .evm-spacer",
                duration: 0.5,
                stagger: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }];

        var $container = $(evmAnimations.timelineTargets.intro.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    evmSandwichToMeal: function() {

        // evm items animations sequencing object
        var _timelineNamespace = evmAnimations.timelineTargets.sandwichToMeal.namespace,
            _animations = [{
                operation: "set",
                elementSelector: ".meal-items-image img, .evm-description-meal",
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace,
                    pause: true,
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: evmAnimations.evmSandwichToMealOnComplete
                    }
                },
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                operation: "set",
                elementSelector: ".evm-description-sandwich, .evm-description-meal",
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                setVars: {
                    css: { position: "absolute" }
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".meal-items-image img:first-child",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".meal-items-image img + img",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-meal",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-sandwich",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "scale",
                elementSelector: ".sandwich-item-image img:first-child",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                scaleVars: {
                    // css: { scale: 0.75 },
                    css: { height: "75%", width: "75%" },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "scale",
                elementSelector: ".sandwich-item-image img + img",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                scaleVars: {
                    // css: { scale: 0.75 },
                    css: { height: "75%", width: "75%" },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "transform",
                elementSelector: ".sandwich-item-image img:first-child",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                transformVars: {
                    css: { left: 60, top: 55 },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "transform",
                elementSelector: ".sandwich-item-image img + img",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                transformVars: {
                    css: { left: 60, top: 55 },
                    ease: Elastic.easeOut
                }
            }];

        var $container = $(evmAnimations.timelineTargets.sandwichToMeal.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    evmMealToSandwich: function() {

        // evm items animations sequencing object
        var _timelineNamespace = evmAnimations.timelineTargets.mealToSandwich.namespace,
            _animations = [{
                operation: "fadeOut",
                elementSelector: ".meal-items-image img:first-child",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace,
                    pause: true,
                    eventCallback: {
                        typeOf: "onComplete",
                        callback: evmAnimations.evmMealToSandwichOnComplete
                    }
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".meal-items-image img + img",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-meal",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-sandwich",
                duration: 0.5,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "scale",
                elementSelector: ".sandwich-item-image img:first-child",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                scaleVars: {
                    // css: { scale: 1 },
                    css: { height: "100%", width: "100%" },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "scale",
                elementSelector: ".sandwich-item-image img + img",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                scaleVars: {
                    // css: { scale: 1 },
                    css: { height: "100%", width: "100%" },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "transform",
                elementSelector: ".sandwich-item-image img:first-child",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                transformVars: {
                    css: { left: 0, top: 0 },
                    ease: Elastic.easeOut
                }
            }, {
                operation: "transform",
                elementSelector: ".sandwich-item-image img + img",
                duration: 1,
                stagger: 0.15,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                transformVars: {
                    css: { left: 0, top: 0 },
                    ease: Elastic.easeOut
                }
            }];

        var $container = $(evmAnimations.timelineTargets.mealToSandwich.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    evmSandwichOptions: function() {

        // evm alternate sandwich items sequencing object
        var _timelineNamespace = evmAnimations.timelineTargets.sandwichOptions.namespace,
            _animations = [{
                operation: "set",
                elementSelector: ".evm-item-multiple > .evm-calorie-container",
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace,
                    delay: 5,
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
                elementSelector: ".evm-item-multiple:visible > .evm-calorie-container + .evm-calorie-container, .evm-item-multiple > img + img",
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                },
                setVars: {
                    css: { alpha: 0 }
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-item-multiple > img:first-child",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-item-multiple > img + img",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-sandwich.evm-item-multiple > .evm-calorie-container:nth-child(2)",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-sandwich.evm-item-multiple > .evm-calorie-container ~ .evm-calorie-container",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-meal.evm-item-multiple > .evm-calorie-container:nth-child(2)",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-meal.evm-item-multiple > .evm-calorie-container ~ .evm-calorie-container",
                duration: 1,
                stagger: 0.25,
                position: 0,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-item-multiple > img:first-child",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-item-multiple > img + img",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-sandwich.evm-item-multiple > .evm-calorie-container:nth-child(2)",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-sandwich.evm-item-multiple > .evm-calorie-container ~ .evm-calorie-container",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeIn",
                elementSelector: ".evm-description-meal.evm-item-multiple > .evm-calorie-container:nth-child(2)",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }, {
                operation: "fadeOut",
                elementSelector: ".evm-description-meal.evm-item-multiple > .evm-calorie-container ~ .evm-calorie-container",
                duration: 1,
                stagger: 0.25,
                position: 10,
                timelineVars: {
                    namespace: _timelineNamespace
                }
            }];

        var $container = $(evmAnimations.timelineTargets.sandwichOptions.containerSelector);
        mcdController.buildTimeline($container, _animations);
    },
    evmIntroOnComplete: function() {

        // play evmSandwichOptions timeline
        var $container = $(evmAnimations.timelineTargets.sandwichOptions.containerSelector),
            _namespace = evmAnimations.timelineTargets.sandwichOptions.namespace,
            _params = { includeDelay: true, namespace: _namespace };

        mcdController.controlTimeline($container, "restart", _params);
    },
    evmSandwichToMealOnComplete: function() {

        // pause evmSandwichToMeal timeline
        var $container = $(evmAnimations.timelineTargets.sandwichToMeal.containerSelector);
            _namespace = evmAnimations.timelineTargets.sandwichToMeal.namespace,
            _params = { namespace: _namespace };

        // mcdController.controlTimeline($container, "pause", _params);

        // play evmSandwichOptions timeline
        var $container = $(evmAnimations.timelineTargets.sandwichOptions.containerSelector),
            _namespace = evmAnimations.timelineTargets.sandwichOptions.namespace,
            _params = { includeDelay: true, namespace: _namespace };

        mcdController.controlTimeline($container, "restart", _params);
    },
    evmMealToSandwichOnComplete: function() {

        // pause evmSandwichToMeal timeline
        var $container = $(evmAnimations.timelineTargets.mealToSandwich.containerSelector);
            _namespace = evmAnimations.timelineTargets.mealToSandwich.namespace,
            _params = { namespace: _namespace };

        // mcdController.controlTimeline($container, "pause", _params);

        // play evmSandwichOptions timeline
        var $container = $(evmAnimations.timelineTargets.sandwichOptions.containerSelector),
            _namespace = evmAnimations.timelineTargets.sandwichOptions.namespace,
            _params = { includeDelay: true, namespace: _namespace };

        mcdController.controlTimeline($container, "restart", _params);
    },
    evmSandwichOptionsOnComplete: function() {

        var _toggledAnimations = ["sandwichToMeal", "mealToSandwich"],
            _toggleIndex = evmAnimations.animationToggles.sandwichOptions;

        // play evmSandwichToMeal timeline
        var $container = $(evmAnimations.timelineTargets[_toggledAnimations[_toggleIndex]].containerSelector);
            _namespace = evmAnimations.timelineTargets[_toggledAnimations[_toggleIndex]].namespace,
            _params = { includeDelay: true, namespace: _namespace };

        mcdController.controlTimeline($container, "restart", _params);
        evmAnimations.animationToggles.sandwichOptions = evmAnimations.toggleAnimations(_toggledAnimations, _toggleIndex);
    },
    toggleAnimations: function(toggledAnimations, toggleIndex) {

        return ++toggleIndex >= toggledAnimations.length ? 0 : toggleIndex;
    },
    killAnimations: function() {

        $.each(evmAnimations.timelineTargets, function(key, targetElementSelector) {
            var $container = $(targetElementSelector);
            mcdController.killTimeline($container);
        });
    }
}