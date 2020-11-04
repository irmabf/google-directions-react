import React from "react";
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
const red = "rgb(200,16,46)";
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: googleMapsUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(40.4123173, -3.7094858),
          destination: new window.google.maps.LatLng( 40.4082958, -3.6991266),
          waypoints: [{location :"40.4106789,-3.7067981", stopover: true},{location:"40.4082958,-3.6991266", stopover: true},],   
          travelMode: window.google.maps.TravelMode.WALKING,
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              options: {
                polylineOptions: {
                  strokeColor: red,
                  strokeWeight: 6,
                },
              },
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
  })
)((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new window.google.maps.LatLng(40.41831,  -3.70275)}
  >
    {props.directions && (
      <DirectionsRenderer
        options={props.options}
        directions={props.directions}
      />
    )}
  </GoogleMap>
));

export default MapWithADirectionsRenderer;
