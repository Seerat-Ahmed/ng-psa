import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  hideModal,
  saveActivityRequest,
} from '../../redux/actions';

// import { add,setupTwillio,makeCall,hangCall,statusEnum } from '../../../public/libs/quickstart.js';

import Dialler from '../../components/Dialler';

class DiallerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCallClick = this.handleCallClick.bind(this);
    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.twillioCallback = this.twillioCallback.bind(this);
    // setupTwillio(this.twillioCallback);    
  }

  componentDidMount() {
    console.log('mounted component');
  }

  componentDidCatch(error) {
    console.log(error);
    // hangCall();

  }

  handleCloseModal(evt) {
    console.log(evt);
    this.props.hideModal();
    // hangCall();
  }

  handleCallClick() {
    this.props.saveActivity({
      'name': 'test',
      'address': 'limuru opp barclays bank'
    });
    console.log('making call to: '+ this.state.phoneNumber);
    // makeCall(this.state.phoneNumber);
  }

  twillioCallback(status, message) {

    // TODO: Display status bar over here
    // switch(status){
    //   case statusEnum.CONNECT:console.log('Connected on container');break;
    //   case statusEnum.DISCONNECT:break;
    //   case statusEnum.ERROR:break;
    //   case statusEnum.FAIL:break;                  
    //   case statusEnum.INCOMING:break;
    //   case statusEnum.READY:console.log('READY on container'); break;                  

    // }
    console.log(status);
    console.log(message);
  }

  handleNumberClick(evt, num) {
    evt.preventDefault();
    // console.log(num);

    this.setState((state, prevProps) => ({
      phoneNumber: state.phoneNumber.concat(num)
    }));
  }

  handleBackspaceClick(evt) {
    evt.preventDefault();
    this.setState((state, prevProps) => ({
      phoneNumber: state.phoneNumber.slice(0, state.phoneNumber.length - 1)
    }));
  }

  render() {
    return (
      <Dialler
        phoneNumber={this.state.phoneNumber}
        handleNumberClick={this.handleNumberClick}
        handleCloseModal={this.handleCloseModal} 
        handleCallClick={this.handleCallClick} 
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  saveActivity: payload => dispatch(saveActivityRequest(payload))
});

export default connect(null, mapDispatchToProps)(DiallerContainer);
