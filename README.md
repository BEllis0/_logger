# What is this?
IN BETA: A simple logging tool that can be used for debugging in the browser. Enabled in the console to display your _logger messages and ensure that they are not seen by users. For those familiar with Adobe Launch, the functionality is similar to _satellite.logger.

# Installation
Currently the package can only be used through a CDN (NPM install coming soon):<br>
`<script src="https://unpkg.com/logger-tool"></script>`<br>
or for a specific version:<br>
`<script src="https://unpkg.com/logger-tool@VERSION#/index.js"></script>`

# Usage
Object: window._logger<br>
_logger is based on Javascript’s logging methods and performs the exact same way.<br><br>
There are four types of logger methods you can use to send messages that you can output to the console. This allows you to tailor the type of log to the content of the message.<br>
- _logger.log(ARGS)
- _logger.info(ARGS)
- _logger.warn(ARGS)
- _logger.error(ARGS)

Enable the logger in the console with the following:<br>
`_logger.setDebug(true)`

Disable the logger by setting:<br>
`_logger.setDebug(false)`

# Examples

Custom logs are a great place to log errors you identify from try/catch functions in custom code. I err on the side of wrapping my custom code in try/catch blocks and using the logger in conjunction, making sure any errors identified don’t clog up the console for other users.<br>
```
try {
    return a + b;
} catch(err) {
    _logger.error('Error: ', err);
}
```

# Future Updates

- NPM Install coming soon.
- _logger.table to mimic console.table
- _logger.export function to export arrays and objects to a CSV file download
