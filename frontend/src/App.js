import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Helmet} from 'react-helmet';
import {Map, TileLayer, Circle} from 'react-leaflet';
import GeoSearch from './GeoSearch';
import AirLayer from './AirLayer';
import InputField from './InputField';
import LayerSwitch from './LayerSwitch';
import Weather from './Weather';

// defaults
const DEFAULT_KRK_LATITUDE = 50.0647;
const DEFAULT_KRK_LONGITUDE = 19.9450;
const DEFAULT_ZOOM = 13;
const DEFAULT_RADIUS = 10e3;
const DEFAULT_LAYER = 'aqi';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [DEFAULT_KRK_LATITUDE, DEFAULT_KRK_LONGITUDE],
      zoom: DEFAULT_ZOOM,
      resultState: {selected: false, lat: DEFAULT_KRK_LATITUDE, lng: DEFAULT_KRK_LONGITUDE},
      circleRadius: DEFAULT_RADIUS,
      mapLayer: DEFAULT_LAYER
    };
  }

  changedChildState = childData => {
    if (!!childData) {
      this.setState({
        resultState: {
          selected: childData.selected,
          lat: parseFloat(childData.lat),
          lng: parseFloat(childData.lng)
        }
      });
    }
  };

  handleRadiusChange = radiusData => {
    if (!!radiusData) {
      this.setState({circleRadius: radiusData * 1e3})
    }
  };

  handleLayerChange = layerData => {
    if (!!layerData) {
      this.setState({mapLayer: layerData})
    }
  };

  render() {
    return (
      <div className='mainApp'>
        <Helmet>
          <meta charSet='utf-8'/>
          <title>AirCheck</title>
        </Helmet>
        <div className='row full' style={{marginLeft: 0, marginRight: 0}}>
          <Map center={this.state.center} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <GeoSearch informParent={this.changedChildState}/>
            <Circle
              center={{lat: this.state.resultState.lat, lng: this.state.resultState.lng}}
              fillColor='#007bff'
              radius={this.state.circleRadius}/>
            <AirLayer layer={this.state.mapLayer}/>
          </Map>
        </div>
        <div className='navRight'>circle radius in kilometers:
          <InputField informParent={this.handleRadiusChange}/>
          <LayerSwitch informParent={this.handleLayerChange}/>
          <Weather
            lat={this.state.resultState.lat}
            lng={this.state.resultState.lng}
          >
          </Weather>
        </div>
      </div>
    )
  }
}
