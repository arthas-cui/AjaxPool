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
                if(pool.length  == 0){
                    return;
                }
                if(pool.length == 1){
                    $.ajax(pool.shift());
                    return;
                }
                var firstConfig;
                var currentConfig;
                currentConfig = firstConfig = pool.shift();
                var nextConfig = pool.shift();
                while (currentConfig) {
                    var success = currentConfig.success;
                    
                    if (nextConfig) {
                        // please ignore JSHint message here. 
                        // we must use a function here. 
                        (function () {
                            var backNext = nextConfig;
                            var backSuccess = success;
                            // maybe should use complete???
                            currentConfig.success = function () {
                                backSuccess.apply(this, Array.prototype.slice.call(arguments));
                                $.ajax(backNext);
                            };
                        })();
                    }
                    currentConfig = nextConfig;
                    nextConfig = pool.shift();
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
