var React = require('react');

var d = React.DOM;
var pt = React.PropTypes;

module.exports = React.createClass({
  displayName: 'Connections',
  propTypes: {
    asana: pt.object.isRequired,
    linkedIn: pt.object.isRequired
  },
  getInitialState: function() {
    return {
      connections: null,
      filtered: {}
    };
  },
  componentWillMount: function() {
    var me = this;
    me.props.linkedIn.API.Connections('me').result(function(connections) {
      me.setState({
        connections: connections
      });
    });
  },
  _renderHeader: function() {
    return d.thead({
      children: [
        d.th(null, 'Include'),
        d.th(null, 'First Name'),
        d.th(null, 'Last Name')
      ]
    });
  },
  _renderRows: function() {
    var me = this;
    return d.tbody({
      children: me.state.connections.values.map(function(person) {
        return d.tr({
          key: person.id,
          children: [
            d.td(null, d.input({
              checked: me.state.filtered[person.id] === undefined,
              type: 'checkbox',
              onChange: function() {
                var current = me.state.filtered[person.id] === undefined;
                if (current === undefined) {
                  current = true;
                }
                me.state.filtered[person.id] = !current;
                me.setState({
                  filtered: me.state.filtered
                });
              }
            })),
            d.td(null, person.firstName),
            d.td(null, person.lastName)
          ]
        });
      })
    });
  },
  _maybeRenderConnections: function() {
    if (this.state.connections === null) {
      return d.h1({
        className: 'text-center color-gray',
        children: ['Loading...']
      });
    }
    return d.div({
      className: 'table-responsive'
    }, d.table({
      className: 'table table-full',
      children: [this._renderHeader(), this._renderRows()]
    }));
  },
  render: function() {
    return d.div({
      className: 'container',
      children: [this._maybeRenderConnections()]
    });
  }
});