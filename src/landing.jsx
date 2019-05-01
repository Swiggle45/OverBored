import React from 'react';
import Header from './components/Header.jsx';
// This is a place holder for the initial application state.

// This grabs the DOM element to be used to mount React components.
var contentNode = document.getElementById("contents");


class Landing extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <Header/>
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

ReactDOM.render(<Landing />, contentNode);