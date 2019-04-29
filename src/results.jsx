
// This is a place holder for the initial application state.
const state = [

];

// This grabs the DOM element to be used to mount React components.
var resultsNode = document.getElementById("results");
var headerNode = document.getElementById("header");

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
        <h1><a href="/landing.html">OverBored</a></h1>
      </header>
    );
  }
}

class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 3,
      distance: 25,
      numberOfPeople: 10,
      activityLvl: 3
    }
  }
  render() {
    return (
      <main>
        <div id="contents">
          <div id="main">
            <div id="table">
              <ResultsTable priceVar={this.state.price}
                distVar={this.state.distance}
                peopleVar={this.state.numberOfPeople}
                activityVar={this.state.activityLvl} />
            </div>
          </div>
          <div id="line"></div>
          <div id="sidebar">
            <Filters price={this.state.price} changePrice={(price) => this.setState({ price: price })}
              dist={this.state.distance} changeDist={(distance) => this.setState({ distance: distance })}
              people={this.state.numberOfPeople} changePeople={(numberOfPeople) => this.setState({ numberOfPeople: numberOfPeople })}
              activity={this.state.activityLvl} changeActivity={(activity) => this.setState({ activityLvl: activity })} />
          </div>
          <div id="sliders">

          </div>
        </div>
      </main>
    );
  }
}

class ResultsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [] , filteredData: [] };

    this.createPlace = this.createPlace.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }
    this.loadData();
  }

  loadData() {
    fetch(`/api/results`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log("Total count of records:", data._metadata.total_count);
          this.setState({ places: data.records });
        });
      } else {
        response.json().then(error => {
          alert("Failed to fetch places:" + error.message)
        });
      }
    }).catch(err => {
      alert("Error in fetching data from server:", err);
    });
  }

  createPlace(newPlace) {
    fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlace),
    })
      .then(res => {
        if (res.ok) {
          res.json().then(updatedPlace => {
            const newPlaces = this.state.places.concat(updatedPlace);
            this.setState({ places: newPlaces, filteredData: this.state.filteredData });
          });
        }
        else {
          res.json()
            .then(error => {
              alert('Failed to add issue: ' + error.message);
            });
        }
      });
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  render() {
    let priceVar = this.props.priceVar;
    let distanceVar = parseInt(this.props.distVar);
    let numberOfPeopleVar = parseInt(this.props.peopleVar);
    let activityLvlVar = this.props.activityVar;
    this.state.filteredData = this.state.places.filter(function (location) {
      return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople <= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
    });
    let rows = this.state.filteredData.map(location => {
      return <LocationRow key={
        location.name
      } places={
        location
      }
      />
    })
    const borderedStyle = { border: "1px Solid Silver", padding: 6 };
    return (
      <div>
        <div id="newPlace">
              <AddPlace createPlace={this.createPlace} />
            </div>
        <table>
        <thead>
          <tr style={borderedStyle}>
            <th>Location</th>
            <th>Price</th>
            <th>Distance</th>
            <th>Number of People</th>
            <th>Activity Level</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
      
    )
  }
}

let LocationRow = (props) => {
  return (
    <tr>
      <td>
        {props.places.name}
      </td>
      <td>
        {priceEval(props.places.price)}
      </td>
      <td>
        {distEval(props.places.distance)}
      </td>
      <td>
        {peopleEval(props.places.numberOfPeople)}
      </td>
      <td>
        {activityEval(props.places.activityLvl)}
      </td>
    </tr>
  )
}


class Filters extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div id="filters">
        <p>Distance<br />
          <div className="slideContainer">
            <input type="range" className="slider" id="distanceSlider" min="0" max="25" step="5" onChange={() => this.props.changeDist(document.getElementById("distanceSlider").value)} />
          </div>
          <div id="distanceValue"></div>
        </p>

        <p>Price Range<br />
          <div className="slideContainer">
            <input type="range" className="slider" id="priceSlider" min="1" max="3" step="1" onChange={() => this.props.changePrice(document.getElementById("priceSlider").value)}></input>
          </div>
          <div id="priceValue"></div>
        </p>

        <p>Number of People<br />
          <div className="slideContainer">
            <input type="range" className="slider" id="peopleSlider" min="1" max="10" step="1" onChange={() => this.props.changePeople(document.getElementById("peopleSlider").value)} />
          </div>
          <div id="peopleValue"></div>
        </p>

        <p>Activity Level<br />
          <div className="slideContainer">
            <input type="range" className="slider" id="activitySlider" min="1" max="3" step="1" onChange={() => this.props.changeActivity(document.getElementById("activitySlider").value)} />
          </div>
          <div id="activityValue"></div>
        </p>

        <p>Over 21?<br />
          <div className="checkContainer">
            <input type="checkbox" id="ageCheck"></input>
          </div>
        </p>
      </div>
    );
  }
}

class AddPlace extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.placeAdd;
    this.props.createPlace({
      name: form.name.value,
      price: form.price.value,
      distance: form.distance.value,
      numberOfPeople: form.numberOfPeople.value,
      activityLvl: form.activityLvl.value,
    });
    // Clear the form for the next input.
    form.name.value = '';
    form.price.value = '';
    form.distance.value = '';
    form.numberOfPeople.value = '';
    form.activityLvl.value = '';
  }

  render() {
    return (
      <div>
        <form name="placeAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="price" placeholder="Price" />
          <input type="text" name="distance" placeholder="Distance" />
          <input type="text" name="numberOfPeople" placeholder="Number of People" />
          <input type="text" name="activityLvl" placeholder="Activity Level" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class Sliders extends React.Component {
  constructor() {
    super();
  }

  render() {
    let distanceSlider = document.getElementById("distanceSlider");
    let distanceOut = document.getElementById("distanceValue");
    distanceOut.innerHTML = distanceSlider.value;

    distanceSlider.oninput = function () {
      let value = this.value;

      distanceOut.innerHTML = value;
    }

    let priceSlider = document.getElementById("priceSlider");
    let priceOut = document.getElementById("priceValue");
    priceOut.innerHTML = priceSlider.value;

    priceSlider.oninput = function () {
      let value = this.value;

      priceOut.innerHTML = value;
    }

    let peopleSlider = document.getElementById("peopleSlider");
    let peopleOut = document.getElementById("peopleValue");
    peopleOut.innerHTML = peopleSlider.value;

    peopleSlider.oninput = function () {
      let value = this.value;

      peopleOut.innerHTML = value;
    }

    let activitySlider = document.getElementById("activitySlider");
    let activityOut = document.getElementById("activityValue");
    activityOut.innerHTML = activitySlider.value;

    activitySlider.oninput = function () {
      let value = this.value;

      activityOut.innerHTML = value;
    }
    return {
    }
  }
}

function priceEval(price) {
  if (price == 1)
    return "$";
  else if (price == 2)
    return "$$";
  else
    return "$$$";
}

function distEval(distance) {
  if (distance == 0)
    return "On Campus";
  else
    return distance + " miles";
}

function peopleEval(people) {
  if (people == 100)
    return "Any";
  else
    return people + " or fewer"
}

function activityEval(activity) {
  if (activity == 1)
    return "Low";
  else if (activity == 2)
    return "Medium";
  else
    return "High";

}


window.onload = function() {
    let startPos;
    let geoOptions = {
        timeout: 10 * 1000
    }

    let geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    };
    let geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};






ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<MyComponent />, resultsNode);