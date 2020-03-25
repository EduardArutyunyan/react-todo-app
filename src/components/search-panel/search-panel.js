import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    label: ''
  }
  
  onLableChange = (event) => {
    this.setState({ 
        label: event.target.value 
    });
  }
  
  render() {
    return (
      <form className="search-panel-form" 
      onChange={this.props.onFilter(this.state.label)}>
        <input type="text"
                  className="form-control search-input"
                  placeholder="type to search" 
                  onChange={this.onLableChange}
                  value={this.state.label}/>
      </form>
    );
  }
};
