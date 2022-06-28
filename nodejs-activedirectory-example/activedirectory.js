var ActiveDirectory = require('activedirectory2');

var domainName = 'domain.com'

var username = `username@${domainName}`;
var password = 'password';

var config = {
    url: `ldap://${domainName}`,
    baseDN: 'cn=' + username + ',CN=Users,dc=domain,dc=com'
}
console.log('config', config)

var ad = new ActiveDirectory(config);
console.log(ad)

// Authenticate
ad.authenticate(username, password, function(err, auth) {
    if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        return;
    }
    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});