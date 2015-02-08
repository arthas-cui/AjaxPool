(function (window, $, undefined) {
    'use strict';
    var allPools = {};
    var ajaxPool = function (key) {
        var instance = allPools[key];
        if (instance) {
            return instance;
        }
        var pool = [];
        instance = {
            push: function (config) {
                pool.push(config);
                return this;
            },
            exec: function () {
                var firstConfig;
                var currentConfig;
                currentConfig = firstConfig = pool.pop();
                var nextConfig = pool.pop();
                while (currentConfig) {
                    var success = currentConfig.success;
                    
                    if (nextConfig) {
                        // please ignore JSHint message here. 
                        // we must use a function here. 
                        (function () {
                            var backNext = nextConfig;
                            var backSuccess = success;
                            currentConfig.success = function () {
                                backSuccess.apply(this, Array.prototype.slice.call(arguments));
                                $.ajax(backNext);
                            };
                        })();
                    }
                    currentConfig = nextConfig;
                    nextConfig = pool.pop();
                }
                $.ajax(firstConfig);
            }
        };

        allPools[key] = instance;
        return instance;
    };
    $.extend({
        ajaxPool: ajaxPool
    });
})(window, jQuery);