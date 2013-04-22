var ajaxHandler = {
    call: function(settings, callbacks) {
        var _jqXHR = $.ajax(settings)
                      .done(callbacks.success)
                      .fail(callbacks.error)
                      .always(callbacks.complete);
    },
    handleResponse: function(ajaxMethod, element, jQueryMethod, result, callbacks) {
        var _params = {
            element: element,
            jQueryMethod: jQueryMethod,
            result: result,
            callbacks: callbacks
        };

        ajaxHandler[ajaxMethod](_params);
    },
    success: function(params) {
        $(params.element)[params.jQueryMethod](params.result);

        $.each(params.callbacks, function(i, callback) {
            callback();
        });
    },
    error: function(params) {
        // ajax error handling
    },
    complete: function(params) {
        // do something on ajax complete
    }
}