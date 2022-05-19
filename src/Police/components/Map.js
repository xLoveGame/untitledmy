import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NeighbourhoodDetails from './NeighbourhoodDetails';
import {
  InfoWindow,
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';

export default class Map extends Component {
  static propTypes = {
    availableNeighbourhoods: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setNeighbourhood: PropTypes.func.isRequired,
    neighbourhood: PropTypes.object.isRequired
  };

  render() {
    return (
      <RenderMap
        {...this.props}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyClE35W_e58RfSI59WdhHQmOEw82vUZbjs`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: `calc(100vh)`, width: '100%' }} />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

const RenderMap = withScriptjs(
  withGoogleMap(
    ({ availableNeighbourhoods, filter, neighbourhood, setNeighbourhood }) => {

      let bounds = new window.google.maps.LatLngBounds();
      filter.neighbourhoods.map(hood =>
        bounds.extend(
          new window.google.maps.LatLng(hood.location.lat, hood.location.lng)
        )
      );


      const focusMap = map => {
        if (map) {

          !neighbourhood.id &&
          availableNeighbourhoods === filter.neighbourhoods.length
            ?
              map.fitBounds(bounds)
            :
              map.panTo(neighbourhood.location || bounds.getCenter());
          neighbourhood.location && map.panBy(0, -150);
        }
      };

      return (
        <GoogleMap
          defaultOptions={{
            center: { lat: 51.509865, lng: -0.118092 },
            mapTypeControlOptions: {
              mapTypeIds: [
                window.google.maps.MapTypeId.ROADMAP,
                window.google.maps.MapTypeId.SATELLITE
              ]
            }
          }}
          ref={map => focusMap(map)}
        >
          {filter.neighbourhoods.map(hood => (
            <Marker
              key={hood.id}

              animation={hood.id === neighbourhood.id ? 1 : null}
              position={hood.location}
              onClick={() => setNeighbourhood(hood)}
              icon={{

                  url:require("../img/ps1.png"),
                  // eslint-disable-next-line no-undef
                  size: new google.maps.Size(40, 40),
                  // eslint-disable-next-line no-undef
                  scaledSize: new google.maps.Size(40, 40),
              }}
            >
              {
              neighbourhood.id === hood.id && (
                <InfoWindow
                  onCloseClick={() => {
                    setNeighbourhood({});
                    this.map.panTo(bounds.getCenter());
                  }}
                >
                  <NeighbourhoodDetails hood={hood} />
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      );
    }
  )
);
