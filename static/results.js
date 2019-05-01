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
            { href: "/landing.html" },
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
      price: 3,
      distance: 25,
      numberOfPeople: 11,
      activityLvl: 3
    };
    return _this2;
  }

  _createClass(MyComponent, [{
    key: "render",
    value: function render() {
      var _this3 = this;

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
              React.createElement(ResultsTable, { priceVar: this.state.price,
                distVar: this.state.distance,
                peopleVar: this.state.numberOfPeople,
                activityVar: this.state.activityLvl })
            )
          ),
          React.createElement("div", { id: "line" }),
          React.createElement(
            "div",
            { id: "sidebar" },
            React.createElement(Filters, { price: this.state.price, changePrice: function changePrice(price) {
                return _this3.setState({ price: price });
              },
              dist: this.state.distance, changeDist: function changeDist(distance) {
                return _this3.setState({ distance: distance });
              },
              people: this.state.numberOfPeople, changePeople: function changePeople(numberOfPeople) {
                return _this3.setState({ numberOfPeople: numberOfPeople });
              },
              activity: this.state.activityLvl, changeActivity: function changeActivity(activity) {
                return _this3.setState({ activityLvl: activity });
              } })
          ),
          React.createElement("div", { id: "sliders" })
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

    var _this4 = _possibleConstructorReturn(this, (ResultsTable.__proto__ || Object.getPrototypeOf(ResultsTable)).call(this, props));

    _this4.state = { places: [], filteredData: [] };

    _this4.createPlace = _this4.createPlace.bind(_this4);
    _this4.setFilter = _this4.setFilter.bind(_this4);
    return _this4;
  }

  _createClass(ResultsTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
      //loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDMJ89iDBtg94S6Z9a3Q0i-bsybJ-3YmCI&libraries=places')
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps === this.props) {
        return;
      }
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this5 = this;

      fetch("/api/results").then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            _this5.setState({ places: data.records });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch places:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: "createPlace",
    value: function createPlace(newPlace) {
      var _this6 = this;

      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlace)
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (updatedPlace) {
            var newPlaces = _this6.state.places.concat(updatedPlace);
            _this6.setState({ places: newPlaces, filteredData: _this6.state.filteredData });
          });
        } else {
          res.json().then(function (error) {
            alert('Failed to add issue: ' + error.message);
          });
        }
      });
    }
  }, {
    key: "setFilter",
    value: function setFilter(query) {
      this.props.router.push({ pathname: this.props.location.pathname, query: query });
    }
  }, {
    key: "render",
    value: function render() {
      var priceVar = this.props.priceVar;
      var distanceVar = parseInt(this.props.distVar);
      var numberOfPeopleVar = parseInt(this.props.peopleVar);
      var activityLvlVar = this.props.activityVar;
      this.state.filteredData = this.state.places.filter(function (location) {
        return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople <= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
      });
      var rows = this.state.filteredData.map(function (location) {
        return React.createElement(LocationRow, { key: location.name, places: location
        });
      });
      var borderedStyle = { border: "1px Solid Silver", padding: 6 };
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { id: "newPlace" },
          React.createElement(AddPlace, { createPlace: this.createPlace })
        ),
        React.createElement(
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
      props.places.name
    ),
    React.createElement(
      "td",
      null,
      priceEval(props.places.price)
    ),
    React.createElement(
      "td",
      null,
      distEval(props.places.distance)
    ),
    React.createElement(
      "td",
      null,
      peopleEval(props.places.numberOfPeople)
    ),
    React.createElement(
      "td",
      null,
      activityEval(props.places.activityLvl)
    )
  );
};

var Filters = function (_React$Component4) {
  _inherits(Filters, _React$Component4);

  function Filters(props) {
    _classCallCheck(this, Filters);

    return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this, props));
  }

  _createClass(Filters, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      return React.createElement(
        "div",
        { id: "filters" },
        React.createElement(
          "p",
          null,
          "Distance",
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "distanceSlider", min: "0", max: "25", step: "5", defaultValue: "25", onChange: function onChange() {
                return _this8.props.changeDist(document.getElementById("distanceSlider").value);
              } })
          ),
          React.createElement(
            "div",
            { id: "distanceValue" },
            distEval(this.props.dist)
          )
        ),
        React.createElement(
          "p",
          null,
          "Price Range",
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "priceSlider", min: "1", max: "3", step: "1", defaultValue: "3", onChange: function onChange() {
                return _this8.props.changePrice(document.getElementById("priceSlider").value);
              } })
          ),
          React.createElement(
            "div",
            { id: "priceValue" },
            priceEval(this.props.price)
          )
        ),
        React.createElement(
          "p",
          null,
          "Number of People",
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "peopleSlider", min: "1", max: "11", step: "1", defaultValue: "11", onChange: function onChange() {
                return _this8.props.changePeople(document.getElementById("peopleSlider").value);
              } })
          ),
          React.createElement(
            "div",
            { id: "peopleValue" },
            peopleEval(this.props.people)
          )
        ),
        React.createElement(
          "p",
          null,
          "Activity Level",
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "slideContainer" },
            React.createElement("input", { type: "range", className: "slider", id: "activitySlider", min: "1", max: "3", step: "1", defaultValue: "3", onChange: function onChange() {
                return _this8.props.changeActivity(document.getElementById("activitySlider").value);
              } })
          ),
          React.createElement(
            "div",
            { id: "activityValue" },
            activityEval(this.props.activity)
          )
        ),
        React.createElement(
          "p",
          null,
          "Over 21?",
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "checkContainer" },
            React.createElement("input", { type: "checkbox", id: "ageCheck" })
          )
        ),
        React.createElement("script", null)
      );
    }
  }]);

  return Filters;
}(React.Component);

var AddPlace = function (_React$Component5) {
  _inherits(AddPlace, _React$Component5);

  function AddPlace() {
    _classCallCheck(this, AddPlace);

    var _this9 = _possibleConstructorReturn(this, (AddPlace.__proto__ || Object.getPrototypeOf(AddPlace)).call(this));

    _this9.handleSubmit = _this9.handleSubmit.bind(_this9);
    return _this9;
  }

  _createClass(AddPlace, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.placeAdd;
      this.props.createPlace({
        name: form.name.value,
        price: form.price.value,
        distance: form.distance.value,
        numberOfPeople: form.numberOfPeople.value,
        activityLvl: form.activityLvl.value
      });
      // Clear the form for the next input.
      form.name.value = '';
      form.price.value = '';
      form.distance.value = '';
      form.numberOfPeople.value = '';
      form.activityLvl.value = '';
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "placeAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "name", placeholder: "Name" }),
          React.createElement("input", { type: "text", name: "price", placeholder: "Price" }),
          React.createElement("input", { type: "text", name: "distance", placeholder: "Distance" }),
          React.createElement("input", { type: "text", name: "numberOfPeople", placeholder: "Number of People" }),
          React.createElement("input", { type: "text", name: "activityLvl", placeholder: "Activity Level" }),
          React.createElement(
            "button",
            null,
            "Add"
          )
        )
      );
    }
  }]);

  return AddPlace;
}(React.Component);

var Sliders = function (_React$Component6) {
  _inherits(Sliders, _React$Component6);

  function Sliders() {
    _classCallCheck(this, Sliders);

    return _possibleConstructorReturn(this, (Sliders.__proto__ || Object.getPrototypeOf(Sliders)).call(this));
  }

  _createClass(Sliders, [{
    key: "render",
    value: function render() {
      var distanceSlider = document.getElementById("distanceSlider");
      var distanceOut = document.getElementById("distanceValue");
      distanceOut.innerHTML = distanceSlider.value;

      distanceSlider.oninput = function () {
        var value = this.value;

        distanceOut.innerHTML = value;
      };

      var priceSlider = document.getElementById("priceSlider");
      var priceOut = document.getElementById("priceValue");
      priceOut.innerHTML = priceSlider.value;

      priceSlider.oninput = function () {
        var value = this.value;

        priceOut.innerHTML = value;
      };

      var peopleSlider = document.getElementById("peopleSlider");
      var peopleOut = document.getElementById("peopleValue");
      peopleOut.innerHTML = peopleSlider.value;

      peopleSlider.oninput = function () {
        var value = this.value;

        peopleOut.innerHTML = value;
      };

      var activitySlider = document.getElementById("activitySlider");
      var activityOut = document.getElementById("activityValue");
      activityOut.innerHTML = activitySlider.value;

      activitySlider.oninput = function () {
        var value = this.value;

        activityOut.innerHTML = value;
      };
      return {};
    }
  }]);

  return Sliders;
}(React.Component);

function priceEval(price) {
  if (price == 1) return "$";else if (price == 2) return "$$";else return "$$$";
}

function distEval(distance) {
  if (distance == 0) return "On Campus";else return distance + " miles";
}

function peopleEval(people) {
  if (people >= 11) return "Any";
  if (people == 1) return people;else return people + " or fewer";
}

function activityEval(activity) {
  if (activity == 1) return "Low";else if (activity == 2) return "Medium";else return "High";
}

// window.onload = function() {
//     let myLocation = navigator.geolocation.getCurrentPosition(function(position){
//         console.log(position);
//     });

// };

// function loadJS(src) {
//     var ref = window.document.getElementsByTagName("script")[0];
//     var script = window.document.createElement("script");
//     script.src = src;
//     script.async = true;
//     ref.parentNode.insertBefore(script, ref);
// }

// const ARC_DE_TRIOMPHE_POSITION = {
//     lat: 48.873947,
//     lng: 2.295038
// };

// const EIFFEL_TOWER_POSITION = {
//     lat: 48.858608,
//     lng: 2.294471
// };

// class Map2 extends React.Component {
//     constructor() {
//         super();
//         this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
//     }

//     componentDidMount() {
//         this.map = new google.maps.Map(this.refs.map, {
//             center: EIFFEL_TOWER_POSITION,
//             zoom: 16
//         });
//     }

//     panToArcDeTriomphe() {
//         console.log(this)
//         this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
//     }

//     render() {
//         const mapStyle = {
//             width: 500,
//             height: 300,
//             border: '1px solid black'
//         };

//         return (
//             <div>
//                 <button onClick={this.panToArcDeTriomphe}>Go to Arc De Triomphe</button>
//                 <div ref="map" style={mapStyle}>I should be a map!</div>
//             </div>
//         );
//     }
// }

// export class Container extends React.Component {
//   render() {
//     const style = {
//       width: '100vw',
//       height: '100vh'
//     }
//     return (
//       <div style={style}>
//         <Map google={this.props.google} />
//       </div>
//     )
//   }
// }

// export class Map extends React.Component {
//   componentDidMount() {
//     this.loadMap();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.google !== this.props.google) {
//       this.loadMap();
//     }
//   }

//   loadMap() {
//     if (this.props && this.props.google) {
//       //google is unavailable
//       const {google} = this.props;
//       const maps = google.maps;

//       const mapRef = this.refs.map;
//       const node = ReactDOM.findDOMNode(mapRef);

//       let zoom = 14;
//       let lat = 37.774929;
//       let lng = -122.419416;
//       const center = new maps.LatLng((lat,lng));
//       const mapConfig = Object.assign({}, {
//         center: center,
//         zoom: zoom
//       })
//       this.map = new maps.Map(node, mapConfig);
//     }
//   }

//   render() {
//     return (
//       <div ref='map'>
//         Loading map...
//       </div>
//     )
//   }
// }

// export default GoogleApiComponent ({
//   apiKey: __GAPI_KEY__
// })(Container)


ReactDOM.render(React.createElement(Header, null), headerNode);
ReactDOM.render(React.createElement(MyComponent, null), resultsNode);