"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var state = [];

// This grabs the DOM element to be used to mount React components.
var headerNode = document.getElementById("header");
var contentNode = document.getElementById("contents");

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "header",
        null,
        React.createElement(
          "h1",
          null,
          React.createElement(
            "a",
            { href: "/index.html" },
            "OverBored"
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Filters = function (_React$Component2) {
  _inherits(Filters, _React$Component2);

  function Filters() {
    _classCallCheck(this, Filters);

    return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this));
  }

  _createClass(Filters, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "main",
        null,
        React.createElement(
          "p",
          null,
          "Distance",
          React.createElement("br", null),
          React.createElement(
            "div",
            { "class": "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "distanceSlider", min: "1", max: "100", step: "5" })
          ),
          React.createElement("div", { id: "distanceValue" })
        ),
        React.createElement(
          "p",
          null,
          "Price Range",
          React.createElement("br", null),
          React.createElement(
            "div",
            { "class": "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "priceSlider", min: "1", max: "100", step: "5" })
          ),
          React.createElement("div", { id: "priceValue" })
        ),
        React.createElement(
          "p",
          null,
          "Number of People",
          React.createElement("br", null),
          React.createElement(
            "div",
            { "class": "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "peopleSlider", min: "1", max: "100", step: "5" })
          ),
          React.createElement("div", { id: "peopleValue" })
        ),
        React.createElement(
          "p",
          null,
          "Activity Level",
          React.createElement("br", null),
          React.createElement(
            "div",
            { "class": "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "activitySlider", min: "1", max: "100", step: "5" })
          ),
          React.createElement("div", { id: "activityValue" })
        ),
        React.createElement(
          "p",
          null,
          "Over 21?",
          React.createElement("br", null),
          React.createElement(
            "div",
            { "class": "checkContainer" },
            React.createElement("input", { type: "checkbox", id: "ageCheck" })
          )
        )
      );
    }
  }]);

  return Filters;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(Header, null), headerNode);
ReactDOM.render(React.createElement(Filters, null), contentNode);