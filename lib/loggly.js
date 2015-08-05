var loggly = require('loggly');

function logger(tag) {
return loggly.createClient({
  token: 'LOGGLY_TOKEN',
  subdomain: "brienpafford",
  tags:["NodeJS"],
  json: true
});
}

module.exports = logger;