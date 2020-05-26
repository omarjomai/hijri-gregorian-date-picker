import React, { Component } from 'react';
import HijriGregorianDatePicker from '../lib';
import './ExampleStyle.css';

class App extends Component {
  state = {
    selectedDate: '01/11/1440'
  }

  onChange = (value) => {
    console.log('OnChange -> Value is: ', value)
    this.setState({ selectedDate: value })
  }

  onFocus = (value) => {
    console.log('OnFocus -> Value is: ', value)
  }

  render() {
    return (
      <div id="app">
        <HijriGregorianDatePicker
          name="hijri_date"
          className="input-style"
          placeholder="Hijri Date"
          selectedDate={this.state.selectedDate} //not required if it is uncontrolled component
          dateFormat="iDD/iMM/iYYYY"
          onChange={this.onChange}
          onFocus={this.onFocus}
          
        />
      </div>
    );
  }
}

export default App;
