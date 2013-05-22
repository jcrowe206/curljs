// node modules
var cp = require('child_process');

//############# DEFAULTS ################
//    FOLLOW_REDIRECTS : 1,
//    VERBOSE          : 0,
//    SILENT           : 1,
//    IGNORE_CERT      : 0,
//    MAX_REDIRS       : 5,
//    CONNECT_TIMEOUT  : 5, // time in seconds
//    NTLM             : 0, // if you are going to use this or NTLM_PROXY be sure they are available to your system
//    NTLM_PROXY       : 0
//

var curl = function(url, options, callback) {
//    opts.clear();

    callback = callback || function () {};


    if (typeof options == "function") {
        callback = options;
        options = null;
    }

    if (!options) {
        // apply options
        var opts = new optionsBuilder();
        options = opts.follow_redirects().silent().max_redirs(5).connect_timeout(5);
    }

    var curlString = "curl '" + url + "' ";

    curlString += options.stringify();

    try {
        cp.exec(curlString, function(err, stdout, stderr) {
            callback(err, stdout, stderr);
        });
    } catch (err) {
        callback(err, null, null);
    }
}

var optionsBuilder = function() {
    var _string      = '';
    var _verboseOpt  = "-v";
    var _redirectOpt = "-L";
    var _silentOpt   = "-S";
    var _insecureOpt = "-k";
    var _postOpt     = '--data';
    var _maxRedirsOpt   = "--max-redirs";
    var _timeoutOpt  = "--connect-timeout";
    var _ntlmOpt     = "-ntlm";
    var _ntlmProxyOpt = "--proxy-ntlm";

    var modifyOptionString = function(opt, add) {
        if (add !== false) {
            addOption(opt)
        } else {
            removeOption(opt);
        }
    }

    var addOption = function(opt) {
        _string += opt + ' ';
    }

    var removeOption = function(opt) {
        _string = _string.replace(new RegExp(opt, "g"), '');
    }

    this.stringify = function() {
        return _string;
    }
    this.verbose = function(o) {
        modifyOptionString(_verboseOpt, o);
        return this;
    }
    this.follow_redirects = function(o) {
        modifyOptionString(_redirectOpt, o);
        return this;
    }
    this.silent = function(o) {
        modifyOptionString(_silentOpt, o);
        return this;
    }
    this.ignore_cert = function(o) {
        modifyOptionString(_insecureOpt, o);
        return this;
    }
    this.max_redirs = function(maxRedirs, o) {
        if (!maxRedirs) {
            maxRedirs = 0;
        }

        removeOption(_maxRedirsOpt);

        _maxRedirsOpt = "--max-redirs " + maxRedirs + " ";
        modifyOptionString(_maxRedirsOpt, o);
        return this;
    }
    this.connect_timeout = function(timeout, o) {
        if (!timeout) {
            timeout = 0;
        }

        removeOption(_timeoutOpt);

        _timeoutOpt = "--connect-timeout " + timeout + " ";
        modifyOptionString(_timeoutOpt, o);
        return this;
    }
    this.ntlm = function(o) {
        modifyOptionString(_ntlmOpt, o);
        return this;
    }
    this.ntlm_proxy = function(o) {
        modifyOptionString(_ntlmProxyOpt, o);
        return this;
    }
    this.post_data = function(dataArray, urlencode) {
        removeOption(_postOpt);

        if (urlencode) {
            _postOpt = '--data-urlencode';
        }

        if (typeof dataArray === "object") {
            _postOpt += ' "';
            for (var key in dataArray) {
                _postOpt += key + '=' + dataArray[key] + '&';
            }

            _postOpt = _postOpt.substr(0, _postOpt.length - 1); // remove the trailing &

            _postOpt += '"';
            modifyOptionString(_postOpt, dataArray);
        }


        return this;

    }
    this.clear = function() {
        _string = '';
    }

    return this;
}

var opts = (function() {
    return new optionsBuilder();
})();

module.exports = curl;
module.exports.opts = opts;
