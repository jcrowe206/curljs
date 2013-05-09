var curl = require('../index.js');
var assert = require('assert');

var opts = curl.opts.verbose().silent().ignore_cert().follow_redirects().ntlm_proxy().ntlm().max_redirs(20).connect_timeout(3);

assert.equal(opts.stringify().trim(), "-v -S -k -L --proxy-ntlm -ntlm --max-redirs 20  --connect-timeout 3");

curl("www.google.com", function(err, resp) {
    assert.equal(err, null, "there should be no error from curling google with no options");
    assert.notEqual(resp, null, "curling google with default options should return results");
});


curl("www.google.com", opts, function(err, resp) {
    assert.equal(err, null, "there should be no errors from curling google with all options set");
    assert.notEqual(resp, null, "curling google with all options set should return results");
});

opts.max_redirs(10);

assert.equal(opts.stringify().trim(), "-v -S -k -L --proxy-ntlm -ntlm  --connect-timeout 3  --max-redirs 10");

curl("www.google.com", opts, function(err, resp) {
    assert.equal(err, null, "there should be no error from curling google with all options except ntlm");
    assert.notEqual(resp, null, "curling google with provided options should return results");
})

opts.follow_redirects(false);
assert.equal(opts.stringify().trim(), "-v -S -k  --proxy-ntlm -ntlm  --connect-timeout 3  --max-redirs 10");