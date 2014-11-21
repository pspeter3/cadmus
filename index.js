/* global document */
/* global window */
var AsanaClient = require('./src/clients/asana');
var React = require('react');
var Root = require('./src/components/root');
var url = require('url');

window.React = React;
var href = url.parse(window.location.href);
var root = React.createFactory(Root);


React.render(root({
  asana: new AsanaClient('9045963299924', href),
  linkedIn: window.IN
}), document.body);
