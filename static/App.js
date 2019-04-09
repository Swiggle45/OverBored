'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _landing = require('./landing.jsx');

var _landing2 = _interopRequireDefault(_landing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById("contents");

var NoMatch = function NoMatch() {
  return _react2.default.createElement(
    'p',
    null,
    'Page Not Found'
  );
};

var RoutedApp = function RoutedApp() {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/places' }),
    _react2.default.createElement(_reactRouter.Route, { path: '/places', component: (0, _reactRouter.withRouter)(_landing2.default) }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
  );
};

_reactDom2.default.render(_react2.default.createElement(RoutedApp, null), contentNode);