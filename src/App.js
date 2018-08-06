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
  apiKey: "AIzaSyC9ClUYzUDd2xJlyoRnCbZkD-pxOFWA4ws"
})(App);
