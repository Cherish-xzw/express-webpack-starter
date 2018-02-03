/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <i className="logo" />
        <h2>Essential Links</h2>
        <p>
          <a href="https://webpack.js.org/" target="_blank">
            Webpack
          </a>
          <a href="http://expressjs.com/" target="_blank">
            Express
          </a>
        </p>
        <h2>Learn More</h2>
        <Link to="/about">About</Link>
      </div>
    );
  }
}

export default Home;
