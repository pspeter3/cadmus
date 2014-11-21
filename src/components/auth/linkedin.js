var React = require('react');

var d = React.DOM;
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'LinkedIn',
  propTypes: {
    onClick: pt.func.isRequired
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
        onClick: this.props.onClick
      }, 'Authorize LinkedIn'));
  }
});