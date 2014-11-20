var querystring = require('querystring');
var url = require('url');

function Asana(clientId, href) {
  this.clientId = clientId;
  this.href = href;
  this.accessToken = null;
  if (this.href.hash !== null) {
    var params = querystring.parse(this.props.href.hash.replace('#', ''));
    if (params.access_token !== undefined) {
      this.accessToken = params.access_token;
    }
  }
}

Asana.prototype.isAuthorized = function() {
  return this.accessToken !== null;
};

Asana.prototype.authUrl = function() {
  return url.format({
    protocol: 'https',
    host: 'app.asana.com',
    pathname: '/-/oauth_authorize',
    query: {
      'client_id': this.clientId,
      'redirect_uri': url.format(this.href),
      'response_type': 'token'
    }
  });
};

module.exports = Asana;