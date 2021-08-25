var Logger = function() {
    this.setDebug = function(activate) {
        if (activate === true || activate === false) {
            window.sessionStorage.setItem("_loggerActive", activate);
        } else {
            console.log("function argument must be true or false");
        }
     };
};

if (!window.sessionStorage.getItem("_loggerActive")) {
    window.sessionStorage.setItem("_loggerActive", false);
}

function buildPrototypes() {
    var levelTypes = ["log", "warn", "error"];
    
    levelTypes.forEach(function(levelType, i, arr) {
        Logger.prototype[levelType] = function() {
            if (window.sessionStorage.getItem("_loggerActive") == "true") {
               console[levelType](`_LOGGER ${levelType.toUpperCase()}    :  `, ...arguments);    
            } 
        };
     });
};
buildPrototypes();

// module.exports._logger = _logger;
if (typeof module !== "undefined" && module.exports) {
    module.exports.init = init;
} else {
    window._logger = new Logger();
}