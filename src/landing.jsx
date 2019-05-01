import React from 'react';
import {Link} from 'react-router';
import Header from './components/Header.jsx';
// This grabs the DOM element to be used to mount React components.

export default class Landing extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="contents">
      <Header/>
        <main>
          <p>
            Welcome to OverBored! Use this application to figure out what to do with your friends instead of sitting around being bored. Filter activities based on price, activity level, number of people, and how far away you're willing to travel. Have fun!
          </p>
            <Link to="/results">Start your search!</Link>
      </main>
      </div>
      
    );
  }
}

