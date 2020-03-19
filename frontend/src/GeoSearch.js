import {MapControl, withLeaflet} from 'react-leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import L from 'leaflet';

class GeoSearch extends MapControl {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {selected: false, lat: null, lng: null};
  }

  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider();
    return new GeoSearchControl({
      provider: provider,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      popupFormat: ({query, result}) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter address',
      keepResult: true,
      position: 'topleft',
      autoCompleteDelay: 250,
      style: 'bar'
    });
  }

  componentDidMount() {
    const {map} = this.props.leaflet;
    map.on('geosearch/showlocation', this.handleSelect);
    map.addControl(this.leafletElement);
  }

  handleSelect(e) {
    this.setState({selected: true, lng: e.location.x, lat: e.location.y});
    this.props.informParent(this.state);
  }
}

export default withLeaflet(GeoSearch);
