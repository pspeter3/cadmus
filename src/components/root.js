var Asana = require('./auth/asana');
var React = require('react');

var asana = React.createFactory(Asana);
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Root',
  propTypes: {
    asanaApiKey: pt.string.isRequired,
    href: pt.object.isRequired
  },
  render: function() {
    return asana({
      asanaApiKey: this.props.asanaApiKey,
      href: this.props.href
    });
  }
});