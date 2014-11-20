/* global document */
/* global window */
var React = require('react');
var Root = require('./src/components/root');
var url = require('url');

window.React = React;
var href = url.parse(window.location.href);
var root = React.createFactory(Root);

React.render(root({
  asanaApiKey: '9045963299924',
  href: href
}), document.body);
