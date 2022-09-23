const winrm = require('nodejs-winrm');

const _host = '172.27.192.65'
const _port = 5985
const username = 'Administrator';
const password = 'Gmleo!@#123';

winrm.runCommand('ipconfig /all', _host, username, password, _port);
