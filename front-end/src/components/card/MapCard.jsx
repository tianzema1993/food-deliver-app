import React from 'react';
import {
  StaticGoogleMap,
  Marker,
  Direction
} from 'react-static-google-map';

class MapCard extends React.Component {

  render() {
    return this.props.resAddress && this.props.cusAddress ? (
      <StaticGoogleMap size="350x350" apiKey={process.env.REACT_APP_API_KEY}>
        <Marker location={this.props.resAddress} color="green" label="S" />
        <Marker location={this.props.cusAddress} color="red" label="E" />
        <Direction weight="5"
          origin={this.props.resAddress}
          destination={this.props.cusAddress}
        />
      </StaticGoogleMap>
    ) : null;
  }
}

export default MapCard;