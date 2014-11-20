var AsanaAuth = require('./auth/asana');
var React = require('react');

var asanaAuth = React.createFactory(AsanaAuth);
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Root',
  propTypes: {
    asana: pt.object.isRequired,
    linkedIn: pt.object.isRequired
  },
  render: function() {
    if (!this.props.asana.isAuthorized()) {
      return asanaAuth({
        asana: this.props.asana
      });
    }
    return null;
  }
});