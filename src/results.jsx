import React from 'react';
import Header from './components/Header.jsx';
import ResultsTable from './components/ResultsTable.jsx';
import Filters from './components/Filters.jsx'

// This grabs the DOM element to be used to mount React components.
var resultsNode = document.getElementById("results");

export default class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 3,
      distance: 25,
      numberOfPeople: 11,
      activityLvl: 3
    }
  }
  render() {
    return (
      <main>
      <Header/>
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
  if (people >= 11)
    return "Any";
  if (people == 1)
    return people;
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
    let myLocation = navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
    });

};

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}


ReactDOM.render(<MyComponent />, resultsNode);
