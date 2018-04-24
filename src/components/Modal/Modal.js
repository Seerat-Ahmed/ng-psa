import React, { Component } from 'react';
import DiallerContainer from '../../containers/DiallerContainer';
import './Modal.css';

class Modal extends Component {
  renderModalContent(modalType){
    switch(modalType) {
      case 'dialler':
        return (
          <DiallerContainer />
        );
      default:
        return null;
    }
  }
  render() { 
    let showing = this.props.showing ? 'show' : 'hide';
    return (
      <div className={`modal modal-overlay__light ${showing}`}>
        <div className="modal-content">
          {
            this.renderModalContent(this.props.modalType)
          }
        </div>
      </div>
    );
  }
}

export default Modal;
