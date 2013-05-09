// node modules
var cp = require('child_process');

// local variables
var defaults = {
    FOLLOW_REDIRECTS : 1,
    VERBOSE          : 0,
    SILENT           : 1,
    IGNORE_CERT      : 1,
    MAX_REDIRS       : 5,
    CONNECT_TIMEOUT  : 5 // time in seconds
}

module.exports = function(url, options, callback) {
    callback = callback || function () {};

    if (options) {
        // apply options
        for (var key in defaults) {
            if (typeof options[key] !== "undefined" && options.hasOwnProperty(key)) {
                defaults[key] = options[key];
            }
        }
    }

    var curlString = "curl '" + url + "' ";

    curlString += defaults.FOLLOW_REDIRECTS ? "-L " : "";
    curlString += defaults.VERBOSE ? "-v " : '';
    curlString += defaults.SILENT ? "-S " : '';
    curlString += defaults.IGNORE_CERT ? "-k " : '';
    curlString += defaults.MAX_REDIRS ? "--max-redirs " + defaults.MAX_REDIRS + " " : '';
    curlString += defaults.CONNECT_TIMEOUT ? "--connect-timeout " + defaults.CONNECT_TIMEOUT + " " : '';

    try {
        cp.exec(curlString, function(err, stdout, stderr) {
            callback(err, stdout, stderr);
        });
    } catch (err) {
        callback(err, null, null);
    }
}