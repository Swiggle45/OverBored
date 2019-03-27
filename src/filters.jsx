const state = [

];

// This grabs the DOM element to be used to mount React components.
var headerNode = document.getElementById("header");
var contentNode = document.getElementById("contents");
var sliderNode = document.getElementById("sliders");

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
          <h1><a href="/index.html">OverBored</a></h1>
      </header>
    );
  }
}

class Filters extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <p>Distance<br /><br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="distanceSlider" min="0" max="100" step="5"></input>
          </div>
          <div id="distanceValue"></div>
        </p>

        <p>Price Range<br /><br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="priceSlider" min="1" max="3" step="1"></input>
          </div>
          <div id="priceValue"></div>
        </p>

        <p>Number of People<br /><br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="peopleSlider" min="1" max="5" step="1"></input>
          </div>
          <div id="peopleValue"></div>
        </p>

        <p>Activity Level<br /><br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="activitySlider" min="1" max="3" step="1"></input>
          </div>
          <div id="activityValue"></div>
        </p>

        <p>Over 21?<br />
          <div class = "checkContainer">
            <input type="checkbox" id="ageCheck"></input>
          </div>
        </p>
      </main>
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

    distanceSlider.oninput = function() {
      let value = this.value;

      distanceOut.innerHTML = value;
    }

    let priceSlider = document.getElementById("priceSlider");
    let priceOut = document.getElementById("priceValue");
    priceOut.innerHTML = priceSlider.value;

    priceSlider.oninput = function() {
      let value = this.value;
      
      priceOut.innerHTML = value;
    }

    let peopleSlider = document.getElementById("peopleSlider");
    let peopleOut = document.getElementById("peopleValue");
    peopleOut.innerHTML = peopleSlider.value;

    peopleSlider.oninput = function() {
      let value = this.value;
      
      peopleOut.innerHTML = value;
    }

    let activitySlider = document.getElementById("activitySlider");
    let activityOut = document.getElementById("activityValue");
    activityOut.innerHTML = activitySlider.value;

    activitySlider.oninput = function() {
      let value = this.value;
      
      activityOut.innerHTML = value;
    }
    return {

    }
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<Filters />, contentNode);
ReactDOM.render(<Sliders />, sliderNode);