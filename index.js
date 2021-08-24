var Logger = function() {
    this.activated = false;
    
    this.setDebug = function(activate) {
        if (activate === true) {
            this.activated = true;           
        } else if (activate === false) {
            this.activated = false;
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

var levelTypes = ["log", "warn", "error"];

levelTypes.forEach(function(levelType, i, arr) {
    Logger.prototype[levelType] = function() {
        if (this.activated) {
           console[levelType](...arguments);    
        } 
    };
 });

window._logger = new Logger();

//module.exports = _logger;

