import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <header>
          <h1>
              <Link to="/places">OverBored</Link>
          </h1>
        </header>
    );
  }
}
