import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  },
  root2: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: "left",
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    });
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
        title: location.name,
        animation: 2
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
  handleMarkerInfoWindow = location => {
    let marker;
    for (let i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].title === location.name) {
        marker = this.state.markers[i];
      }
    }

    this.populateInfoWindow(
      marker,
      this.state.infowindow,
      location.name,
      location.reading,
      location.link
    );
  };
  populateInfoWindow = (marker, infowindow, title, reading, link) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      if (infowindow.marker) {
        infowindow.marker.setAnimation(null);
      }
      marker.setAnimation(1);
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
  handleChange = event => {
    this.setState({ query: event.target.value });
  };
  isValid = location => {
    for (let i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].title === location.name) {
        return this.state.markers[i].getVisible();
      }
    }
  };
  render() {
    const { classes, theme } = this.props;
    const { locations, query, markers, infowindow, anchor, open } = this.state;
    if (query) {
      locations.forEach((l, i) => {
        if (l.name.toLowerCase().includes(query.toLowerCase())) {
          markers[i].setVisible(true);
        } else {
          if (infowindow.marker === markers[i]) {
            // close the info window if marker removed
            infowindow.close();
          }
          markers[i].setVisible(false);
        }
      });
    } else {
      locations.forEach((l, i) => {
        if (markers.length && markers[i]) {
          markers[i].setVisible(true);
        }
      });
    }
    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="search"
            label="Search"
            role="search"
            placeholder="Eg: Cairo"
            className={classes.textField}
            onChange={event => this.handleChange(event)}
            margin="normal"
          />
        </form>
        <div className={classes.root2}>
          <List component="nav" role="list">
            {this.state.locations
              .filter(location => this.isValid(location))
              .map((location, i) => {
                return (
                  <div key={i}>
                    <ListItem
                      button
                      role="Listitem"
                      onClick={() => {
                        this.handleMarkerInfoWindow(location);
                      }}
                    >
                      <ListItemText primary={location.name} />
                    </ListItem>
                    <Divider light />
                  </div>
                );
              })}
          </List>
        </div>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === "left") {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Ref's NeighborHood Map
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open
              }
            )}
          >
            <div className={classes.drawerHeader} />
            <div>
              <div className="container">
                <div className="sidebar text-input text-input-hidden" />
                <div role="application" className="map" ref="map">
                  loading map...
                </div>
              </div>
            </div>
          </main>
          {after}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);
