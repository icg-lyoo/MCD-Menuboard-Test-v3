var daypartController = {
    initialized: false,
    currentDaypart: "lunch",
    vars: {
        locationQueryStr: location.search,
        locationURL: location.hostname + location.pathname,
        daypartNames: ["breakfast", "lunch"],
        daypartContainerSelector: "#menu-content",
        switchAutoIntervalID: null,
        switchAutoIntervalFrequency: 80000
    },
    run: function() {
        if (!daypartController.initialized) {
            daypartController.initialized = true;

            daypartController.switchDaypartOnKeyPress();
            daypartController.switchDaypartAuto();
        }
    },
    // switch daypart on the fly (on keypress), if the current board is not showing the daypart pressed
    switchDaypartOnKeyPress: function() {
        $(document).keypress(function(e) {

            var _keyPressed = e.charCode,
                _daypartNames = daypartController.vars.daypartNames;

            // breakfast refresh pressed (b)
            if (_keyPressed === 98) {
                daypartController.currentDaypart = _daypartNames[0]; // =breakfast
            }
            // lunch/dinner refresh pressed (l)
            else if (_keyPressed === 108) {
                daypartController.currentDaypart = _daypartNames[1]; // =lunch/dinner
            } else {
                // misc key pressed
                return false;
            }

            mcdController.killAnimations();
            mcdController.animateOutro();
        });
    },
    // switch daypart automatically at specified interval
    switchDaypartAuto: function() {
        var _controllerVars = daypartController.vars,
            _daypartNames = _controllerVars.daypartNames,
            _i = 0;

        clearInterval(_controllerVars.switchAutoIntervalID);

        _controllerVars.switchAutoIntervalID = setInterval(function() {

            daypartController.currentDaypart = _daypartNames[_i];
            mcdController.killAnimations();
            mcdController.animateOutro();
            _i = ++_i >= _daypartNames.length ? 0 : _i;

        }, _controllerVars.switchAutoIntervalFrequency);
    },
    // switch daypart
    switchDaypart: function() {
        var _settings = { url: "?daypart=" + this.currentDaypart},
            _callbacks = {
                success: daypartController.ajaxSuccess,
                error: daypartController.ajaxFail,
                complete: daypartController.ajaxComplete
            };

        ajaxHandler.call(_settings, _callbacks);
    },
    ajaxSuccess: function(data) {
        var _controllerVars = daypartController.vars,
            _callbacks = [mcdController.run];

        // replace existing HTML with the new daypart HTML
        ajaxHandler.handleResponse("success", _controllerVars.daypartContainerSelector, "html", data, _callbacks);
    },
    ajaxFail: function(data) {
        // call ajaxHandler method
        mcdController.console.log("AJAX: error");
    },
    ajaxComplete: function(data) {
        // call ajaxHandler method
        mcdController.console.log("AJAX: complete");
    }
};