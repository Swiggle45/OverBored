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
                <h1><a href="/index.html">OverBored</a></h1>
            </header>
        );
    }
}

class MyComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            price : 2000,
            distance : 1000,
            numberOfPeople : 0,
            activityLvl : 1000
        }
    }
    render() {
        return (
            <main>
                <div id="contents">
                    <div id="main">
                        <div id="table">
                            <ResultsTable price={this.state.price}
                                          dist={this.state.distance}
                                          people={this.state.numberOfPeople}
                                          activity={this.state.activityLvl}/>
                        </div>
                    </div>
                    <div id="line"></div>
                    <div id="sidebar">
                        <Filters price={this.state.price} changePrice={(price) => this.setState({price: price})}
                                 dist={this.state.distance} changeDist={(dist) => this.setState({distance: dist})}
                                 people={this.state.numberOfPeople} changePeople={(people) => this.setState({numberOfPeople: people})}
                                 activity={this.state.activityLvl} changeActivity={(activity)=> this.setState({activityLvl: activity})}/>

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
        console.log(props)
        this.state = {
            data : [{name: "Blue Wall", price:"2", distance:"0", numberOfPeople:"100", activityLvl:"1"},
                {name: "Rec Center", price: "1", distance: "0", numberOfPeople: "100", activityLvl: "3"},
                {name: "Cinemark Movie Theater", price: "2", distance: "3", numberOfPeople: "100", activityLvl: "1"},
                {name: "Central Rock Gym", price: "3", distance: "5", numberOfPeople:"100", activityLvl: "3"},
                {name: "Mt. Tom", price: "1", distance: "14", numberOfPeople: "100", activityLvl: "3"},
                {name: "Pinz", price: "2", distance: "3", numberOfPeople: "6", activityLvl: "2"}],
            filteredData: []
        }
    }

    render() {
        let priceVar = this.props.price;
        let distanceVar = this.props.dist;
        let numberOfPeopleVar = this.props.people;
        let activityLvlVar = this.props.activity;
        this.state.filteredData = this.state.data.filter(function(location) {
            return location.price <= priceVar && location.distance <= distanceVar && location.numberOfPeople >= numberOfPeopleVar && location.activityLvl <= activityLvlVar;
        });
        let rows = this.state.filteredData.map(location => {
            return <LocationRow key = {
                location.name
            } data = {
                location
            }
            />
        })
        const borderedStyle = {border: "1px Solid Silver", padding: 6};
        return (
            <table>
                <thead>
                <tr style = {borderedStyle}>
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
        )
    }
}

const LocationRow = (props) => {
    return (
        <tr>
            <td>
                {props.data.name}
            </td>
            <td>
                {priceEval(props.data.price)}
            </td>
            <td>
                {distEval(props.data.distance)}
            </td>
            <td>
                {peopleEval(props.data.numberOfPeople)}
            </td>
            <td>
                {activityEval(props.data.activityLvl)}
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
          <div className = "slideContainer">
            <input type="range" className="slider" id="distanceSlider" min="0" max="100" step="5" onInput={() => this.props.changeDist(document.getElementById("distanceSlider").value)}/>
          </div>
          <div id="distanceValue"></div>
        </p>

        <p>Price Range<br />
          <div className = "slideContainer">
              <input type="range" className="slider" id="priceSlider" min="1" max="3" step="1"  onInput={() => this.props.changePrice(document.getElementById("priceSlider").value)}></input>
          </div>
          <div id="priceValue"></div>
        </p>

        <p>Number of People<br />
          <div className = "slideContainer">
            <input type="range" className="slider" id="peopleSlider" min="1" max="5" step="1" onInput={() => this.props.changePeople(document.getElementById("peopleSlider").value)}/>
          </div>
          <div id="peopleValue"></div>
        </p>

        <p>Activity Level<br />
          <div className = "slideContainer">
            <input type="range" className="slider" id="activitySlider" min="1" max="3" step="1" onInput={() => this.props.changeActivity(document.getElementById("activitySlider").value)}/>
          </div>
          <div id="activityValue"></div>
        </p>

        <p>Over 21?<br />
          <div className = "checkContainer">
            <input type="checkbox" id="ageCheck"></input>
          </div>
        </p>
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

function priceEval(price){
    if(price == 1)
        return "$";
    else if(price == 2)
        return "$$";
    else
        return "$$$";
}

function distEval(distance){
    if(distance == 0)
        return "On Campus";
    else
        return distance + " miles";
}

function peopleEval(people){
    if(people == 100)
        return "Any";
    else
        return people + " or fewer"
}

function activityEval(activity){
    if(activity == 1)
        return "Low";
    else if(activity == 2)
        return "Medium";
    else
        return "High";

}



// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<MyComponent />, resultsNode);