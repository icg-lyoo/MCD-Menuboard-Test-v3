var daypartController = {
    vars: {
        locationQueryStr: location.search,
        locationURL: location.hostname + location.pathname,
        daypartNames: ["breakfast", "lunch"],
        switchAutoInterval: 20000
    },
    run: function() {
        daypartController.switchDaypartOnKeyPress();
        // daypartController.switchDaypartAuto();
    },
    // switch daypart on the fly (on keypress), if the current board is not showing the daypart pressed
    switchDaypartOnKeyPress: function() {

        $(document).keypress(function(e) {

            var _keyPressed = e.charCode,
                _daypartNames = daypartController.vars.daypartNames;

            // breakfast refresh pressed (b)
            if (_keyPressed === 98) {
                daypartController.switchDaypart(_daypartNames[0]); // =breakfast
            }
            // lunch/dinner refresh pressed (l)
            else if (_keyPressed === 108) {
                daypartController.switchDaypart(_daypartNames[1]); // =lunch/dinner
            } else {
                // misc key pressed
            }
        });
    },
    // switch daypart automatically at specified interval
    switchDaypartAuto: function() {

        var _controllerVars = daypartController.vars,
            _daypartNames = _controllerVars.daypartNames,
            _i = 0;

        setInterval(function() {

            daypartController.switchDaypart(_daypartNames[_i]);
            _i = ++_i >= _daypartNames.length ? 0 : _i;
        }, _controllerVars.switchAutoInterval);
    },
    // switch daypart
    switchDaypart: function(daypartName) {

        var _controllerVars = daypartController.vars;

        if (_controllerVars.locationQueryStr.indexOf(daypartName) == -1) {
            location.href = "?daypart=" + daypartName;
        }
    }
};