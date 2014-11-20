var React = require('react');
var url = require('url');

var d = React.DOM;
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Asana',
  propTypes: {
    asanaApiKey: pt.string.isRequired,
    href: pt.object.isRequired
  },
  render: function() {
    return d.div({
        className: 'text-center'
      },
      d.h1({
        className: 'giga'
      }, 'Cadmus'),
      d.a({
        className: 'btn btn-extra-large bg-blue',
        href: url.format({
          protocol: 'https',
          host: 'app.asana.com',
          pathname: '/-/oauth_authorize',
          query: {
            'client_id': this.props.asanaApiKey,
            'redirect_uri': url.format(this.props.href),
            'response_type': 'token'
          }
        })
      }, 'Login with Asana'));
  }
});