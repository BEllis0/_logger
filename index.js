var Logger = function() {
    // this.activated = window.sessionStorage.getItem("_loggerActive") || false;
    
    this.setDebug = function(activate) {
        if (activate === true || activate === false) {
            window.sessionStorage.setItem("_loggerActive", activate);
        } else {
            console.log("function argument must be true or false");
        }
     };

    //  this["log"] = function() {
    //      if (this.activated) {
    //         console["log"](...arguments);    
    //      } 
    //  };

    //  this.error = function() {
    //      if (this.activated) {
    //         console.error(...arguments);    
    //      } 
    //  };

    //  this.warn = function() {
    //      if (this.activated) {
    //         console.warn(...arguments);    
    //      } 
    //  };
};

window.sessionStorage.setItem("_loggerActive", false)

var levelTypes = ["log", "warn", "error"];

levelTypes.forEach(function(levelType, i, arr) {
    Logger.prototype[levelType] = function() {
        if (window.sessionStorage.getItem("_loggerActive")) {
           console[levelType](...arguments);    
        } 
    };
 });

// window._logger = new Logger();

//module.exports._logger = _logger;

export function init() {
    window._logger = new Logger();
};
