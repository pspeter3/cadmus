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
      filtered: {},
      taskId: ''
    };
  },
  componentWillMount: function() {
    var me = this;
    me.props.linkedIn.API.Connections('me')
      .fields('id',
        'first-name',
        'last-name',
        'location:(country:(code))',
        'industry',
        'num-connections')
      .result(function(connections) {
        console.log(connections.values[0]);
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
      children: me.state.connections.values.map(function(person, index) {
        return d.tr({
          key: person.id + index,
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
  _onChange: function(event) {
    this.setState({
      taskId: event.target.value
    });
  },
  _onSubmit: function(event) {
    console.log('test');
    event.preventDefault();
  },
  _maybeRenderConnections: function() {
    if (this.state.connections === null) {
      return d.h1({
        className: 'text-center color-gray',
        children: ['Loading...']
      });
    }
    return d.div({
      children: [
        d.h1(null, 'Connections'),
        d.p(null, 'Select connections that you are happy sharing'),
        d.form({
          children: [
            d.input({
              className: 'form-item',
              placeholder: 'Asana Task Id',
              type: 'number',
              value: this.state.taskId,
              onChange: this._onChange
            }),
            d.input({
              className: 'btn form-item',
              type: 'submit',
              onClick: this._onSubmit
            })
          ]
        }),
        d.div({
          className: 'table-responsive'
        }, d.table({
          className: 'table table-full',
          children: [this._renderHeader(), this._renderRows()]
        }))
      ]
    });
  },
  render: function() {
    return d.div({
      className: 'container',
      children: [this._maybeRenderConnections()]
    });
  }
});