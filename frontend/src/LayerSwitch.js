import React from 'react';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';

import {debounce} from 'lodash';

class LayerSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {layer: 'aqi'};
    this.changeLayer = debounce(this.changeLayer.bind(this), 100);
  }

  changeLayer = passedLayer => {
    if (!!passedLayer) {
      this.setState({layer: passedLayer});
      this.props.informParent(passedLayer);
    }
  };

  render() {
    const firstRow = [
      {
        layer: 'aqi',
        text: 'AQI',
      },
      {
        layer: 'pm25',
        text: 'PM 2.5',
      }, {
        layer: 'pm10',
        text: 'PM 10',
      }
    ];

    const secondRow = [
      {
        layer: 'o3',
        text: 'Ozone',
      },
      {
        layer: 'no2',
        text: ['NO', <sub key={'underno'}>2</sub>],
      }, {
        layer: 'so2',
        text: ['SO', <sub key={'underso'}>2</sub>],
      }
    ];

    const thirdRow = [
      {
        layer: 'co',
        text: 'CO',
      },
    ];
    return (
      <div className='d-flex flex-column'>
        <ButtonGroup key={'firstGroup'} toggle>
          {
            firstRow.map((layer, index) => {
              return <LayerButton key={'first' + index} informParent={this.changeLayer}
                                  currentLayer={this.state.layer}
                                  layer={layer.layer} text={layer.text}/>
            })
          }
        </ButtonGroup>
        <ButtonGroup key={'secondGroup'} toggle>
          {
            secondRow.map((layer, index) => {
              return <LayerButton key={'second' + index} informParent={this.changeLayer}
                                  currentLayer={this.state.layer}
                                  layer={layer.layer} text={layer.text}/>
            })
          }
        </ButtonGroup>
        <ButtonGroup key={'thirdGroup'} toggle>
          {
            thirdRow.map((layer, index) => {
              return <LayerButton key={'third' + index} informParent={this.changeLayer}
                                  currentLayer={this.state.layer}
                                  layer={layer.layer} text={layer.text}/>
            })
          }
        </ButtonGroup>
      </div>
    );
  }
}

class LayerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {layer: props.layer, disabled: false};
  }

  changeLayer = passedLayer => {
    this.props.informParent(passedLayer);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentLayer !== this.props.currentLayer) {
      if (this.props.currentLayer !== this.state.layer) {
        this.setState({disabled: false});
      } else {
        this.setState({disabled: true});
      }
    }
  }

  render() {
    return (
      <ToggleButton type='radio' name='radio' value={this.props.layer}
                    onClick={(e) => this.changeLayer(e.target.value)} disabled={this.state.disabled}> {
        this.props.text
      }
      </ToggleButton>
    );
  }
}

export default LayerSwitch;
