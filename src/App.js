import React, { Component } from "react";
import "./App.css";
import { GoogleApiWrapper } from "google-maps-react";
import Drawer from "./Drawer";

class App extends Component {
  render() {
    return <Drawer google={this.props.google} />;
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDQG8raFXTk39V_Ygps8cGsLWMU5RSzX-U"
})(App);
