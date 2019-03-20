"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is a place holder for the initial application state.
var state = [];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");

var MyComponent = function (_React$Component) {
  _inherits(MyComponent, _React$Component);

  function MyComponent() {
    _classCallCheck(this, MyComponent);

    return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this));
  }

  _createClass(MyComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "My View 03"
        ),
        React.createElement("hr", null),
        React.createElement(FilterList, null),
        React.createElement(ResultsTable, null)
      );
    }
  }]);

  return MyComponent;
}(React.Component);

var FilterList = function (_React$Component2) {
  _inherits(FilterList, _React$Component2);

  function FilterList() {
    _classCallCheck(this, FilterList);

    return _possibleConstructorReturn(this, (FilterList.__proto__ || Object.getPrototypeOf(FilterList)).apply(this, arguments));
  }

  _createClass(FilterList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "List of filters"
      );
    }
  }]);

  return FilterList;
}(React.Component);

var ResultsTable = function (_React$Component3) {
  _inherits(ResultsTable, _React$Component3);

  function ResultsTable() {
    _classCallCheck(this, ResultsTable);

    return _possibleConstructorReturn(this, (ResultsTable.__proto__ || Object.getPrototypeOf(ResultsTable)).apply(this, arguments));
  }

  _createClass(ResultsTable, [{
    key: "render",
    value: function render() {
      var borderedStyle = { border: "1px Solid Silver", padding: 6 };
      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              { style: borderedStyle },
              "Results"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          React.createElement(ResultRow, { result_number: 1,
            result_name: "Blue Wall" }),
          React.createElement(ResultRow, { result_number: 2,
            result_name: "Totman Gym" })
        )
      );
    }
  }]);

  return ResultsTable;
}(React.Component);

var ResultRow = function (_React$Component4) {
  _inherits(ResultRow, _React$Component4);

  function ResultRow() {
    _classCallCheck(this, ResultRow);

    return _possibleConstructorReturn(this, (ResultRow.__proto__ || Object.getPrototypeOf(ResultRow)).apply(this, arguments));
  }

  _createClass(ResultRow, [{
    key: "render",
    value: function render() {
      var borderedStyle = { border: "1px Solid Silver", padding: 9 };
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.result_name
        )
      );
    }
  }]);

  return ResultRow;
}(React.Component);

// This renders the JSX component inside the content node:


ReactDOM.render(React.createElement(MyComponent, null), contentNode);