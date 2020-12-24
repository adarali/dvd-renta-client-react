import './Navbar.scss'
import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
    props.header.setTitle = (title) => this.setState({title: title});
  }
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link"
              data-widget="pushmenu"
              style={{ background: "transparent", border: "none" }}
              aria-label="Toggle Side menu"
            >
              <i className="fas fa-bars" />
            </button>
          </li>
          <li className="nav-item">
            <div className="nav-title">{this.state.title}</div>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Messages Dropdown Menu */}

          {/* Notifications Dropdown Menu */}

          <li className="nav-item"></li>
        </ul>
      </nav>
    );
  }
}

