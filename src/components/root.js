var Asana = require('./auth/asana');
var React = require('react');
var querystring = require('querystring');

var asana = React.createFactory(Asana);
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Root',
  propTypes: {
    asanaApiKey: pt.string.isRequired,
    href: pt.object.isRequired
  },
  render: function() {
    if (this.props.href.hash !== null) {
      var params = querystring.parse(this.props.href.hash.replace('#', ''));
      if (params.access_token !== undefined) {
        debugger;
        return null;
      }
    }
    return asana({
      asanaApiKey: this.props.asanaApiKey,
      href: this.props.href
    });
  }
});