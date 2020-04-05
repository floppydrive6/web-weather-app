import L from 'leaflet';
import {withLeaflet, MapControl} from 'react-leaflet';
import 'leaflet.locatecontrol';

class LocateControl extends MapControl {
  createLeafletElement(props) {
    const {
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
    });
    return lc;
  }

  componentDidMount() {
    const {map} = this.props.leaflet;
    map.addControl(this.leafletElement);
  }
}

export default withLeaflet(LocateControl);
