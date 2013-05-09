# curljs

Wraps the functionality of curl into an easy to use node module


**Note**: requires curl installation

## Installation

### Install curl first

curljs uses curl so make sure you have it installed first

http://curl.haxx.se/docs/install.html

### Install curljs


    $ [sudo] npm install curljs

## Usage

include the library in your node.js file

    var curl = require("curljs");

    var curlOpts = {
        FOLLOW_REDIRECTS : 1,
        VERBOSE          : 0,
        SILENT           : 1,
        IGNORE_CERT      : 1,
        MAX_REDIRS       : 5,
        CONNECT_TIMEOUT  : 5, // time in seconds
        NTLM             : 0, // if you are going to use NTLM or NTLM_PROXY be sure they are available to your system
        NTLM_PROXY       : 0
    }

    curl("www.example.com", curlOpts, function(err, data, stderr) {
        // do something
    }

