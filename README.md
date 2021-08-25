# What is this?
IN BETA: A simple logging tool that can be used for debugging in the browser. Enabled in the console to display your _logger messages and ensure that they are not seen by users. For those familiar with Adobe Launch, the functionality is similar to _satellite.logger.

# Installation
Currently the package can only be used through a CDN (NPM install coming soon):
`<script src="https://unpkg.com/logger-tool"></script>`
or for a specific version:
`<script src="https://unpkg.com/logger-tool@VERSION#/index.js"></script>`

# Usage
Object: window._logger<br>
Place your logger messages such as:<br>
- _logger.log(ARGS)
- _logger.info(ARGS)
- _logger.warn(ARGS)
- _logger.error(ARGS)

Enable the logger in the console with the following:<br>
`_logger.setDebug(true)`

Disable the logger by setting:<br>
`_logger.setDebug(false)`

NPM Install coming soon.