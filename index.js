var Logger = function() {
    this.setDebug = function(activate) {
        if (activate === true || activate === false) {
            window.sessionStorage.setItem("_loggerActive", activate);
        } else {
            console.log("function argument must be true or false");
        }
     };
};

// build prototypes based on levels
function buildPrototypes() {
    var levelTypes = ["log", "info", "warn", "error"];
    
    levelTypes.forEach(function(levelType, i, arr) {
        Logger.prototype[levelType] = function() {
            // if _logger.setDebug(true)
            if (window.sessionStorage.getItem("_loggerActive") == "true") {
               console[levelType](`_LOGGER ${levelType.toUpperCase()}    :  `, ...arguments);    
            } 
        };
     });
};
buildPrototypes();

if (!window.sessionStorage.getItem("_loggerActive")) {
    window.sessionStorage.setItem("_loggerActive", false);
}

// exporting for npm install or creating global object for CDN
if (typeof module !== "undefined" && module.exports) {
    module.exports.init = function() {
        window._logger = new Logger();    
    };
} else {
    window._logger = new Logger();
}