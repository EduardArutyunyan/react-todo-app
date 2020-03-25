import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    label: ''
  }
  
  onLabelChange = (event) => {
    this.setState({
      label: ''
    })
    this.setState({ 
        label: event.target.value 
    });
  }
  onFilter = () => {
    this.props.filterItem(this.state.label);
    
  }
  
  render() {
    
    return (
      <form className="search-panel-form" 
      onChange={this.onFilter}>
        <input type="text"
                  className="form-control search-input"
                  placeholder="type to search" 
                  onChange={this.onLabelChange}
                  value={this.state.label}/>
      </form>
    );
  }
};
