
// This is a place holder for the initial application state.
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
          <h1>
            <a href="/index.html">OverBored</a>
          </h1>
        </header>
        
    );
  }
}

class Landing extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header>
          <h1>
          <a href="/index.html">OverBored</a>
          </h1>
        </header>
        <main>
          <p>
            Welcome to OverBored! Use this application to figure out what to do with your friends instead of sitting around being bored. Filter activities based on price, activity level, number of people, and how far away you're willing to travel. Have fun!
          </p>
          <a href="/results.html">Start your Search</a>
      </main>
      </div>
      
    );
  }
}

//ReactDOM.render(<Header />, headerNode);
ReactDOM.render(<Landing />, contentNode);