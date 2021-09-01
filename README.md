# What is this?
IN BETA: A simple logging tool that can be used for debugging in the browser. Enabled in the console to display your _logger messages and ensure that they are not seen by users. For those familiar with Adobe Launch, the functionality is similar to _satellite.logger.

# Installation

-### NPM Install
`npm i logger-tool`<br>

### CDN
`<script src="https://unpkg.com/logger-tool"></script>`<br>
or for a specific version:<br>
`<script src="https://unpkg.com/logger-tool@VERSION#/index.js"></script>`

# Usage
Object: window._logger<br>
_logger is based on Javascript’s logging methods and performs the exact same way.<br><br>
There are four types of logger methods you can use to send messages that you can output to the console. This allows you to tailor the type of log to the content of the message.<br>
```javascript
- _logger.log(ARGS)
- _logger.info(ARGS)
- _logger.warn(ARGS)
- _logger.error(ARGS)
```

Enable the logger in the console with the following:<br>
`_logger.setDebug(true)`

Disable the logger by setting:<br>
`_logger.setDebug(false)`

# Config & More Features
### Config
A config function can be added to provide extended features to _logger. Example:<br>
```javascript
_logger.config({
    siteName: "Test Site Name",
    environment: "staging",
    apiEndpoint: "/api/v1/endpoint",
    websocket: "wss://www.example.com/socketserver",
    apiKey: "12345" // necessary if connecting to _logger server
});
```
### API Endpoint
If an API endpoint is included in the config, _logger will attempt to POST the incoming messages to the endpoint. If you would like to use the _logger app then a valid apiKey needs to be added to the config. An API key is granted when you register for the _logger service. (Coming soon)

### Websocket (beta)
If a websocket url is included in the config, _logger will attempt to send incoming messages to the websocket server.

### Payload
Any other fields that are added to the config will be saved in the message and either accessed via _logger.getMessages or passed in the API/websocket.

### _logger.getMessages(optional_level_type)
`_logger.getMessages()` will return the full list of messages.<br>
You can also pass an optional level type into the function to filter the messages:<br>
`_logger.getMessages("error") // returns a filtered array of error messages`<br>

# Examples

Custom logs are a great place to log errors you identify from try/catch functions in custom code. I err on the side of wrapping my custom code in try/catch blocks and using the logger in conjunction, making sure any errors identified don’t clog up the console for other users.<br>
```javascript
try {
    return a + b;
} catch(err) {
    _logger.error('Error: ', err);
}
```

# Future Updates
- _logger.export function to export arrays and objects to a CSV file download