"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is a place holder for the initial application state.
var state = [];

// This grabs the DOM element to be used to mount React components.
var resultsNode = document.getElementById("results");
var headerNode = document.getElementById("header");
var sidebarNode = document.getElementById("sidebar");

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

        var _this2 = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this));

        _this2.state = {
            priceDef: 2000,
            distanceDef: 1000,
            numberOfPeopleDef: 0,
            activityLvlDef: 1000
        };
        return _this2;
    }

    _createClass(MyComponent, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "div",
                    { id: "contents" },
                    React.createElement(
                        "div",
                        { id: "main" },
                        React.createElement(
                            "div",
                            { id: "table" },
                            React.createElement(ResultsTable, { price: this.state.priceDef,
                                dist: this.state.distanceDef,
                                people: this.state.numberOfPeopleDef,
                                activity: this.state.activityLvlDef })
                        )
                    ),
                    React.createElement("div", { id: "line" }),
                    React.createElement(
                        "div",
                        { id: "sidebar" },
                        React.createElement(Filters, null)
                    )
                )
            );
        }
    }]);

    return MyComponent;
}(React.Component);

var ResultsTable = function (_React$Component3) {
    _inherits(ResultsTable, _React$Component3);

    function ResultsTable(props) {
        _classCallCheck(this, ResultsTable);

        var _this3 = _possibleConstructorReturn(this, (ResultsTable.__proto__ || Object.getPrototypeOf(ResultsTable)).call(this, props));

        console.log(props);
        _this3.state = {
            data: [{ name: "Blue Wall", price: "2", distance: "0", numberOfPeople: "100", activityLvl: "1" }, { name: "Rec Center", price: "1", distance: "0", numberOfPeople: "100", activityLvl: "3" }, { name: "Cinemark Movie Theater", price: "2", distance: "3", numberOfPeople: "100", activityLvl: "1" }, { name: "Central Rock Gym", price: "3", distance: "5", numberOfPeople: "100", activityLvl: "3" }, { name: "Mt. Tom", price: "1", distance: "14", numberOfPeople: "100", activityLvl: "3" }, { name: "Pinz", price: "2", distance: "3", numberOfPeople: "6", activityLvl: "2" }],
            filteredData: []
        };
        return _this3;
    }

    _createClass(ResultsTable, [{
        key: "render",
        value: function render() {
            var priceVar = this.props.price;
            var distanceVar = this.props.dist;
            var numberOfPeopleVar = this.props.people;
            var activityLvlVar = this.props.activity;
            this.state.filteredData = this.state.data.filter(function (location) {
                return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople >= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
            });
            var rows = this.state.filteredData.map(function (location) {
                return React.createElement(LocationRow, { key: location.name, data: location
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
            props.data.name
        ),
        React.createElement(
            "td",
            null,
            priceEval(props.data.price)
        ),
        React.createElement(
            "td",
            null,
            distEval(props.data.distance)
        ),
        React.createElement(
            "td",
            null,
            peopleEval(props.data.numberOfPeople)
        ),
        React.createElement(
            "td",
            null,
            activityEval(props.data.activityLvl)
        )
    );
};

var Filters = function (_React$Component4) {
    _inherits(Filters, _React$Component4);

    function Filters() {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this));
    }

    _createClass(Filters, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "filters" },
                React.createElement(
                    "p",
                    null,
                    "Distance"
                ),
                React.createElement(
                    "p",
                    null,
                    "Price Range"
                ),
                React.createElement(
                    "p",
                    null,
                    "Number of People"
                ),
                React.createElement(
                    "p",
                    null,
                    "Activity Level"
                ),
                React.createElement(
                    "p",
                    null,
                    "Over 21?"
                )
            );
        }
    }]);

    return Filters;
}(React.Component);

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
ReactDOM.render(React.createElement(MyComponent, null), resultsNode);
ReactDOM.render(React.createElement(Filters, null), sidebarNode);