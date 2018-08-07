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
  apiKey: "AIzaSyAz2Thg3VKIVP1akx0eT31QQkUdChoanbc"
})(App);
