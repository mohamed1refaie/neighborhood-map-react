import React, { Component } from "react";
import ReactDOM from "react-dom";

class MapContainer extends Component {
  state = {
    locations: [
      {
        name: "Giza Pyramids",
        location: { lat: 29.978173, lng: 31.132552 },
        reading:
          "The Pyramids of Giza consist of the Great Pyramid of Giza (also known as the Pyramid of Cheops or Khufu and constructed c. 2560 – c. 2540 BC), the somewhat smaller Pyramid of Khafre (or Chephren) a few hundred meters to the south-west, and the relatively modest-sized Pyramid of Menkaure (or Mykerinos) a few hundred meters farther south-west.",
        link: "https://en.wikipedia.org/wiki/Giza_pyramid_complex"
      },
      {
        name: "Great Sphinx of Giza",
        location: { lat: 29.976082, lng: 31.137499 },
        reading:
          "<b>The Great Sphinx</b> ,commonly referred to as the Sphinx of Giza or just the Sphinx, is a limestone statue of a reclining sphinx, a mythical creature with the body of a lion and the head of a human.",
        link: "https://en.wikipedia.org/wiki/Great_Sphinx_of_Giza"
      },
      {
        name: "Cairo University",
        location: { lat: 30.02293, lng: 31.207314 },
        reading:
          "<b>Cairo Unicersity</b> ,is Egypt's premier public university. Its main campus is in Giza, immediately across the Nile from Cairo. It was founded on 21 December 1908; however, after being housed in various parts of Cairo, its faculties, beginning with the Faculty of Arts, were established on its current main campus in Giza in October 1929.",
        link: "https://en.wikipedia.org/wiki/Cairo_University"
      },
      {
        name: "Cairo Opera House",
        location: { lat: 30.04264, lng: 31.224482 },
        reading:
          "The <b>Cairo Opera House</b> ,part of Cairo's National Cultural Center, is the main performing arts venue in the Egyptian capital. Home to most of Egypt's finest musical groups, it is located on the southern portion of Gezira Island in the Nile River, in the Zamalek district west of and near downtown Cairo.",
        link: "https://en.wikipedia.org/wiki/Cairo_Opera_House"
      },
      {
        name: "Egyptian Museum Cairo",
        location: {
          lat: 30.047997,
          lng: 31.233668
        },
        reading:
          "The <b>Museum of Egyptian Antiquities</b>, known commonly as the <b>Egyptian Museum</b> or <b>Museum of Cairo</b>, in Cairo, Egypt, is home to an extensive collection of ancient Egyptian antiquities. It has 120,000 items, with a representative amount on display, the remainder in storerooms. The edifice is one of the largest museums in the region. As of July 2017, the museum is open to the public.",
        link: "https://en.wikipedia.org/wiki/Egyptian_Museum"
      }
    ],
    query: "",
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  };

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const mapConfig = Object.assign(
        {},
        {
          center: { lat: 29.9976196, lng: 31.1660679 },
          zoom: 13,
          mapTypeId: "roadmap"
        }
      );
      this.map = new maps.Map(node, mapConfig);
      this.addMarkers();
    }
  }
  addMarkers = () => {
    const { google } = this.props;
    let { infowindow } = this.state;
    const bounds = new google.maps.LatLngBounds();
    this.state.locations.forEach((location, ind) => {
      const marker = new google.maps.Marker({
        position: { lat: location.location.lat, lng: location.location.lng },
        map: this.map,
        title: location.name
      });
      marker.addListener("click", () => {
        this.populateInfoWindow(
          marker,
          infowindow,
          location.name,
          location.reading,
          location.link
        );
      });
      this.setState(state => ({
        markers: [...state.markers, marker]
      }));
      bounds.extend(marker.position);
    });
    this.map.fitBounds(bounds);
  };
  populateInfoWindow = (marker, infowindow, title, reading, link) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<div id="content">
      <div id="siteNotice">
      </div>
      <h2 id="firstHeading" class="firstHeading">${title}</h2>
      <div id="bodyContent">
      <p>${reading}</p>
      <p>Links: ${title}, <a href="${link}">
      Read more..</a></p>
      </div>
      </div>`);
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener("closeclick", function() {
        infowindow.marker = null;
      });
    }
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="sidebar text-input text-input-hidden" />
          <div role="application" className="map" ref="map">
            loading map...
          </div>
        </div>
      </div>
    );
  }
}

export default MapContainer;
