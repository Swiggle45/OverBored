// This is a place holder for the initial application state.
const state = [

];
// This grabs the DOM element to be used to mount React components.
var headerNode = document.getElementById("header");

class Filters extends React.Component {
  constructor() {
    super();
    this.state ={
      price : 0,
      distance : 0,
      numberOfPeople : "Any",
      activityLvl : ""
    }
  }
  render() {
    return (
      <main>
        <header>
          <h1><a href="/index.html">OverBored</a></h1>
        </header>
        <div>
        </div>
      </main>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<Filters />, headerNode);

