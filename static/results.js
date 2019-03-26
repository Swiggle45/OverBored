"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is a place holder for the initial application state.
var state = [];

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");
var headerNode = document.getElementById("header");

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

var MyComponent = function (_React$Component2) {
    _inherits(MyComponent, _React$Component2);

    function MyComponent() {
        _classCallCheck(this, MyComponent);

        return _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).apply(this, arguments));
    }

    _createClass(MyComponent, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "div",
                    { id: "results" },
                    React.createElement(
                        "div",
                        { id: "head" },
                        React.createElement(FilterList, null)
                    ),
                    React.createElement(
                        "div",
                        { id: "table" },
                        React.createElement(ResultsTable, null)
                    )
                )
            );
        }
    }]);

    return MyComponent;
}(React.Component);

var FilterList = function (_React$Component3) {
    _inherits(FilterList, _React$Component3);

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

var ResultsTable = function (_React$Component4) {
    _inherits(ResultsTable, _React$Component4);

    function ResultsTable() {
        _classCallCheck(this, ResultsTable);

        var _this4 = _possibleConstructorReturn(this, (ResultsTable.__proto__ || Object.getPrototypeOf(ResultsTable)).call(this));

        _this4.state = {
            data: [{ name: "Blue Wall", price: "2", distance: "0", numberOfPeople: "100", activityLvl: "1" }, { name: "Rec Center", price: "1", distance: "0", numberOfPeople: "100", activityLvl: "3" }, { name: "Cinemark Movie Theater", price: "2", distance: "3", numberOfPeople: "100", activityLvl: "1" }, { name: "Central Rock Gym", price: "3", distance: "5", numberOfPeople: "100", activityLvl: "3" }, { name: "Mt. Tom", price: "1", distance: "14", numberOfPeople: "100", activityLvl: "3" }, { name: "Pinz", price: "2", distance: "3", numberOfPeople: "6", activityLvl: "2" }],
            filteredData: []
        };
        return _this4;
    }

    _createClass(ResultsTable, [{
        key: "render",
        value: function render() {
            var priceVar = 2000;
            var distanceVar = 1000;
            var numberOfPeopleVar = 7;
            var activityLvlVar = 1;
            this.state.filteredData = this.state.data.filter(function (location) {
                return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople >= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
            });
            var rows = this.state.filteredData.map(function (location) {
                return React.createElement(LocationRow, { key: location.name, filteredData: location
                });
            });
            var borderedStyle = { border: "1px Solid Silver", padding: 6 };
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        { style: borderedStyle },
                        React.createElement(
                            "th",
                            null,
                            "Location"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Price"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Distance"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Number of People"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Activity Level"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return ResultsTable;
}(React.Component);

var LocationRow = function LocationRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.filteredData.name
        ),
        React.createElement(
            "td",
            null,
            priceEval(props.filteredData.price)
        ),
        React.createElement(
            "td",
            null,
            distEval(props.filteredData.distance)
        ),
        React.createElement(
            "td",
            null,
            peopleEval(props.filteredData.numberOfPeople)
        ),
        React.createElement(
            "td",
            null,
            activityEval(props.filteredData.activityLvl)
        )
    );
};

function priceEval(price) {
    if (price == 1) return "$";else if (price == 2) return "$$";else return "$$$";
}

function distEval(distance) {
    if (distance == 0) return "On Campus";else return distance + " miles";
}

function peopleEval(people) {
    if (people == 100) return "Any";else return people + " or fewer";
}

function activityEval(activity) {
    if (activity == 1) return "Low";else if (activity == 2) return "Medium";else return "High";
}

// This renders the JSX component inside the content node:
ReactDOM.render(React.createElement(Header, null), headerNode);
ReactDOM.render(React.createElement(MyComponent, null), contentNode);