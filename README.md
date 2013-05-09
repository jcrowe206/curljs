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

    var curlOpts = curl.opts.silent().ignore_cert().follow_redirects().max_redirs(5).connect_timeout(3);

    curl("www.example.com", curlOpts, function(err, data, stderr) {
        // do something
    }

## Available Options
    .verbose
    .follow_redirects
    .silent
    .ignore_cert
    .max_redirs
    .connect_timeout
    .ntlm
    .ntlm_proxy