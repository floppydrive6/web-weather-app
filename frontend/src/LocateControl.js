import L from 'leaflet';
import {withLeaflet, MapControl} from 'react-leaflet';
import 'leaflet.locatecontrol';

class LocateControl extends MapControl {
  constructor(props) {
    super(props);
    this.handleLocateFound = this.handleLocateFound.bind(this);
    this.state = {located: false, lat: 0, lng: 0};
  }

  createLeafletElement(props) {
    const {
      leaflet: {map},
      ...options
    } = props;


    const lc = L.control.locate({
      ...options, strings: {
        title: "Locate Me"
      }, circleStyle: {
        color: 'red',
        fillColor: 'red'
      },
      locateOptions: {
        enableHighAccuracy: true
      },
      setView: true,
      watch: true,
    }).addTo(map);
    return lc;
  }

  componentDidMount() {
    const {map} = this.props.leaflet;
    map.on('locationfound', this.handleLocateFound);
    map.addControl(this.leafletElement);
  }

  handleLocateFound(e) {
    if (e && e.accuracy && e.latlng) {
      const radius = e.accuracy;
      const {map} = this.props.leaflet;
      console.log(map);
      L.circle(e.latlng, radius).addTo(map).bindPopup(`You are within ${radius} meters from this point`);
      this.setState({located: true, lng: e.latlng.lng, lat: e.latlng.lat});
      this.props.informParent(this.state);
    } else {
      console.error('Error when parsing location data');
    }
  }
}

export default withLeaflet(LocateControl);
