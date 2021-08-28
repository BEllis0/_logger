var Logger = function() {

    var messageStore = [];
    var levelTypes = ["log", "info", "warn", "error"];
    var config, websocket;

    function getCurrentDate () {
        var pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        var d = new Date();
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    function createWebsocket(url, protocols) {
        websocket = new WebSocket(url, protocols);
    };

    function postMessageAPI(payload) {
        fetch(config.apiEndpoint, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        // .then(response => response.json())
        .then(function(data){
            console.log('Data posted to API endpoint');
        })
        .catch(function(err) {
            console.error('Error posting message to API endpoint in config: ', err);
        });
    };

    function sendMessageWebsocket(payload) {
        websocket.send(JSON.stringify(payload));
    };

    this.config = function(options) {
        config = options || {}
        /*
            config options
            {
                siteName
                domain
                environment
                page
                token
                apiEndpoint
                websocket
            }
        */
       // create API / websocket connections based on config
       if (options.hasOwnProperty('websocket')) {
        createWebsocket(options.websocket);
    }
    };

    this.setDebug = function(activate) {
        if (activate === true || activate === false) {
            window.sessionStorage.setItem("_loggerActive", activate);
        } else {
            console.log("function argument must be true or false");
        }
     };

     this.storeMessage = function(message, level) {
        var payload = {
            timestamp: getCurrentDate(),
            page: window.location.href,
            message: message,
            type: level,
            ...config
        };
        messageStore.push(payload);

        // create API / websocket connections based on config
        if (config.hasOwnProperty('apiEndpoint')) {
            postMessageAPI(payload);
        } 
        if (config.hasOwnProperty('websocket')) {
            sendMessageWebsocket(payload);
        }
     };

     // takes an optional log type (log, info, warn, error, etc) or no argument for all messages
     this.getMessages = function(optionalLevelType) {
        if (levelTypes.includes(optionalLevelType)) {
            try {
                return messageStore.filter((currentMMessage, i) => {
                    return currentMMessage.type === optionalLevelType;
                });
            } catch(err) {
                _logger.error(`Error getting ${optionalLevelType} logs: `, err);
            }
        }  
        else {
            _logger.error(`Error getting ${optionalLevelType} logs. Must be one of ${levelTypes} `);
        }
        // default return all messages
        return messageStore;
     };

     this.buildPrototypes = function() {
        levelTypes.forEach(function(levelType, i, arr) {
            Logger.prototype[levelType] = function() {
                // if _logger.setDebug(true)
                if (window.sessionStorage.getItem("_loggerActive") == "true") {
                   console[levelType](`_LOGGER ${levelType.toUpperCase()}    :  `, ...arguments);    
                } 
                // capture message
                this.storeMessage(arguments, levelType);
            };
         });
    };
};

function createLogger() {
    var _logger = new Logger();
    _logger.buildPrototypes();
    return _logger;
};

// default set debugger status (on/off) to false
if (!window.sessionStorage.getItem("_loggerActive")) {
    window.sessionStorage.setItem("_loggerActive", false);
}

// exporting for npm install or creating global object for CDN
if (typeof module !== "undefined" && module.exports) {
    module.exports._logger = createLogger();
} else {
    window._logger = createLogger();
}