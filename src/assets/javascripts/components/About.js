/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className="about-page text-center" data-page="about">
        <img
          src="/assets/images/webpack-logo.svg"
          alt="Koa boilerplate is very cool"
          className="logo img-responsive"
        />
        <h2>
          Learn about{' '}
          <a href="https://github.com/Cherish-xzw/express-webpack-starter">
            express-webpack-starter
          </a>{' '}
          <i className="glyphicon glyphicon-hand-left" />
        </h2>
        <Link to="/">Go to home</Link>
      </div>
    );
  }
}

export default About;
