import React from 'react';
import {Button, FormControl, InputGroup} from 'react-bootstrap'

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.state = {value: 10};
  }

  decrease = () => {
    if (this.state.value === '') {
      return;
    }
    const decreased = parseInt(this.state.value) - 1;
    if (decreased < 1) return;
    this.setState({value: decreased});
    this.props.informParent(decreased);
  };

  increase = () => {
    if (this.state.value === '') {
      this.setState({value: 1})
    } else {
      const increased = parseInt(this.state.value) + 1;
      this.setState({value: increased});
      this.props.informParent(increased);
    }
  };

  changeValue(e) {
    if (e.target.value === '') {
      this.setState({value: ''});
      this.props.informParent(1);
    }
    const newValue = parseInt(e.target.value);
    if (!newValue || newValue < 1) return;
    this.setState({value: newValue});
    this.props.informParent(newValue);
  }

  render() {
    return (
      <div>
        <InputGroup>
          <FormControl
            placeholder='Radius in KM'
            aria-label='Radius in KM'
            aria-describedby='basic-addon2'
            type='number'
            onChange={this.changeValue}
            value={this.state.value}
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' onClick={this.decrease}>-</Button>
            <Button variant='outline-secondary' onClick={this.increase}>+</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default InputField;
