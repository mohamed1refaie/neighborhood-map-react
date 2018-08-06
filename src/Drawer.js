import React from "react";
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
import MapContainer from "./MapContainer";
//import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

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
    ]
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

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

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
        <Divider />
        <List>{}</List>
        <Divider />
        <List>{}</List>
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
            <MapContainer
              google={this.props.google}
              locations={this.state.locations}
            />
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
