var loggly = require('loggly');

function logger(tag) {
return loggly.createClient({
  token: '5c61ff84-4458-4e2f-b942-4a3723d3d4de',
  subdomain: "brienpafford",
  tags:["NodeJS"],
  json: true
});
}

module.exports = logger;