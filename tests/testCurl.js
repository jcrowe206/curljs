var curl = require('../index.js');
var assert = require('assert');

var curlOpts = {
    FOLLOW_REDIRECTS : 1,
    IGNORE_CERT      : 0,
    NTLM             : 1, // if you are going to use this or NTLM_PROXY be sure they are available to your system
    NTLM_PROXY       : 1
}

curl("www.google.com", function(err, resp) {
    assert.equal(err, null, "there should be no error from curling google");
    assert.notEqual(resp, null, "curling google with default options should return results");
});

curl("www.google.com", curlOpts, function(err, resp) {
    assert.equal(err, null, "there should be no error from curling google");
    assert.notEqual(resp, null, "curling google with default options should return results");
});