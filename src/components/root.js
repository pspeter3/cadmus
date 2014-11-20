var AsanaAuth = require('./auth/asana');
var LinkedInAuth = require('./auth/linkedin');
var React = require('react');

var asanaAuth = React.createFactory(AsanaAuth);
var linkedInAuth = React.createFactory(LinkedInAuth);
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Root',
  propTypes: {
    asana: pt.object.isRequired,
    linkedIn: pt.object.isRequired
  },
  getInitialState: function() {
    return {
      hasLinkedInInit: false
    };
  },
  componentDidMount: function() {
    var me = this;
    var interval = setInterval(function() {
      if (me.props.linkedIn.User !== undefined) {
        clearInterval(interval);
        me.setState({
          hasLinkedInInit: true
        });
      }
    }, 100);
  },
  authorizeLinkedIn: function() {
    var me = this;
    me.props.linkedIn.User.authorize(function() {
      me.forceUpdate();
    });
  },
  render: function() {
    if (!this.props.asana.isAuthorized()) {
      return asanaAuth({
        asana: this.props.asana
      });
    }
    if (!this.state.hasLinkedInInit) {
      return null;
    }
    if (!this.props.linkedIn.User.isAuthorized()) {
      return linkedInAuth({
        onClick: this.authorizeLinkedIn
      });
    }
    return null;
  }
});