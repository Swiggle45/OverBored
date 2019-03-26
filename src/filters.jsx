const state = [

];

// This grabs the DOM element to be used to mount React components.
var headerNode = document.getElementById("header");
var contentNode = document.getElementById("contents");

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
        <p>Distance<br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="distanceSlider" min="1" max="100" step="5"></input>
          </div>
          <div id="distanceValue"></div>
        </p>
        <p>Price Range<br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="priceSlider" min="1" max="100" step="5"></input>
          </div>
          <div id="priceValue"></div>
        </p>
        <p>Number of People<br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="peopleSlider" min="1" max="100" step="5"></input>
          </div>
          <div id="peopleValue"></div>
        </p>
        <p>Activity Level<br />
          <div class = "slideContainer">
            <input type="range" className="slider" id="activitySlider" min="1" max="100" step="5"></input>
          </div>
          <div id="activityValue"></div>
        </p>
        <p>Over 21?<br />
          <div class = "checkContainer">
            <input type="checkbox" id="ageCheck"></input>
          </div>
        </p>
        {/* let distanceSlider = document.getElementById("distanceSlider");
        let distanceOut = document.getElementById("distanceValue");
        distanceOut.innerHTML = distanceSlider.value;

        distanceSlider.oninput = function() {
          distanceOut.innerHTML = this.value();
        } */}
    
      </main>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<Filters />, contentNode);