// This is a place holder for the initial application state.
const state = [

];

// This grabs the DOM element to be used to mount React components.
var headerNode = document.getElementById("header");

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1><a href="/index.html">OverBored</a></h1>
        <hr />
      </div>
    );
  }
}

// This renders the JSX component inside the content node:
ReactDOM.render(<Header />, headerNode);
