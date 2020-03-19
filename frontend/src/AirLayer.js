import {MapControl, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
const WAQI_TOKEN = '85589c99a6fe46fab2d2ad446c65abcfb9990ccd';

class AirLayer extends MapControl {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  createLeafletElement(opts) {
    const initLayer = opts.layer ? opts.layer : 'aqi';
    const WAQI_URL = `https://tiles.waqi.info/tiles/usepa-${initLayer}/{z}/{x}/{y}.png?token=${WAQI_TOKEN}`;
    const WAQI_ATTR = `Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>`;
    return L.tileLayer(WAQI_URL, {attribution: WAQI_ATTR})
  }

  updateLeafletElement(fromProps, toProps) {
    super.updateLeafletElement(fromProps, toProps);
    if (toProps.layer !== fromProps.layer) {
      const WAQI_URL = `https://tiles.waqi.info/tiles/usepa-${toProps.layer}/{z}/{x}/{y}.png?token=${WAQI_TOKEN}`;
      const WAQI_ATTR = `Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>`;
      const layer = L.tileLayer(WAQI_URL, {attribution: WAQI_ATTR});

      const {map} = this.props.leaflet;

      //remove current tile
      map.eachLayer(layer => {
        if (layer._url && layer._url.toString().includes('https://tiles.waqi.info/tiles/usepa-')) {
          map.removeLayer(layer);
        }
      });

      // add recent one
      map.addLayer(layer);
    }
  }

  componentDidMount() {
    const {map} = this.props.leaflet;
    if (!!this.leafletElement) {
      this.leafletElement.addTo(map);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.layer !== this.props.layer) {
      this.updateLeafletElement(nextProps, this.props);
    }
  }

  componentWillUnmount() {
    const {map} = this.props.leaflet;
    map.remove();
  }
}

export default withLeaflet(AirLayer);
