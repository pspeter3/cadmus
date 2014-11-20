var React = require('react');

var d = React.DOM;
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Asana',
  propTypes: {
    asana: pt.object.isRequired
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
        href: this.props.asana.authUrl()
      }, 'Login with Asana'));
  }
});