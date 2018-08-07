# NeighborHood Map

This is my NeighborHood Map project build with react also i used GoogleMaps Api and Unsplash Api to get the images. The Project opens with a Map of Cairo and Giza and five markers on the map showing 5 famous places in Egypt. Also There is a Drawer that when you open contains search textInput and a list of names of the places that the markers pointing at. When you input a query in the search field the list updates to get places that matches the query also only the markers that matches the query is visible. when you click on a marker or the name of a place in the list an InfoWindow will pop up showing the name of the place, image, info and useful link for the place.

## Instructions

To Run the Project:
* clone the repo or download it
* cd into the directory of the project from the terminal
* install all project dependencies with `npm install`
* start the development server with `npm start`

***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*

## Running the project in Production Mode

1. First build the production ready optimized code. `npm run build`
2. Then `npm run deploy` to deploy to the specified address

## Dependencies
* [google-maps-react](https://github.com/fullstackreact/google-maps-react) for Google Maps API
* [Material-UI](https://github.com/mui-org/material-ui) for React components that implement Google's Material Design.

## API Used
* [Google Maps API](https://developers.google.com/maps/documentation/) for the map and the markers
* [Unsplash API](https://unsplash.com/developers) for the images

## ScreenShots

![Main Page](http://oi67.tinypic.com/2z82n2s.jpg)


![Searching](http://oi63.tinypic.com/1z1sgud.jpg)


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
