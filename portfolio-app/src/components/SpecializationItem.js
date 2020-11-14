import React, { Component } from 'react';

class SpecializationItem extends Component {
  render() {
    return (
      <div className="spec_item">
        <div className="icon_div">
          <div className="icon_bg">
            <img className="icon" src={this.props.text.img} alt="white and black waves" width="100"></img>
          </div>
        </div>
        <div className="spec_text">
          <div className="spec_main_text">
            <p>{this.props.text.title}</p>
          </div>
          <div className="spec_content_text">
            <p>          
              {this.props.text.text}
            </p>
          </div>
        </div>
      </div>
      )
  }
    
}

export default SpecializationItem;