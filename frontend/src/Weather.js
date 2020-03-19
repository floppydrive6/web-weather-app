import React from 'react';
import _ from 'lodash';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: '',
        lng: ''
      },
      temperature: '',
      apparentTemperature: '',
      humidity: '',
      pressure: '',
      cloudCover: '',
      windSpeed: '',
      windGust: '',
    }
  };

  callWeatherApi = (props) => {
    if (props.lat && props.lng) {
      this.setState({location: {lat: this.props.lat, lng: this.props.lng}});
      fetch(`/api/weatherFetch?lat=${props.lat}&lng=${props.lng}`)
        .then(res => res.json())
        .then(data => {
          if (this._isMounted) {
            const {temperature, apparentTemperature, humidity, pressure, cloudCover, windSpeed, windGust} = data.currently;
            this.setState({
              temperature: temperature,
              apparentTemperature: apparentTemperature,
              humidity: humidity,
              pressure: pressure,
              cloudCover: cloudCover,
              windSpeed: windSpeed,
              windGust: windGust,
            });
          }
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.callWeatherApi(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      if (!_.isEqual(prevState.location, this.props)) {
        this.callWeatherApi(this.props)
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <p className='test-weather'>latitude: {this.state.location.lat}</p>
        <p className='test-weather'>longitude: {this.state.location.lng}</p>
        <p className='test-weather'>temperature: {this.state.temperature}&deg;C</p>
        <p className='test-weather'>apparent temperature: {this.state.apparentTemperature}&deg;C</p>
        <p className='test-weather'>pressure: {this.state.pressure} hPa</p>
        <p className='test-weather'>humidity: {Math.round(this.state.humidity * 100)}%</p>
        <p className='test-weather'>cloud cover: {Math.round(this.state.cloudCover * 100)}%</p>
        <p className='test-weather'>wind speed: {this.state.windSpeed} m/s</p>
        <p className='test-weather'>wind gust: {this.state.windGust} m/s</p>
        <p className='test-weather'>
          <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        </p>
      </div>
    );
  }
}

export default Weather;
