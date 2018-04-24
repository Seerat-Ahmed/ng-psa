import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Input,
  FormGroup,
  Collapse, Button, Fade  
} from 'reactstrap';

import Dialler from '../../components/Dialler/Dialler.js'
// import { add,setupTwillio,makeCall,hangCall,statusEnum } from '../../../public/libs/quickstart.js';

class TestCall extends Component {

  constructor(props) {
    super(props);
    // UI callbacks
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      collapse: true,
      status: 'Closed',
      fadeIn: false,
      timeout: 300,
      phoneNumber: ''
    };

    // action callbacks
    

    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);

    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)


    // Twillio callbacks
    this.handleCallClick = this.handleCallClick.bind(this);
    this.twillioCallback = this.twillioCallback.bind(this);
    this.handleCallHangup  = this.handleCallHangup.bind(this);
    
  }

  componentDidMount() {
    console.log('mounted component');
    // setupTwillio(this.twillioCallback);  
  }

  componentDidCatch(error) {
    console.log(error);
    // hangCall();

  }
  handleCallClick() {
    
    console.log('making call to: '+ this.state.phoneNumber);

    // makeCall(this.state.phoneNumber);
  }

  handleCallHangup() {
    
    console.log('hanging call to: '+ this.state.phoneNumber);
    // hangCall();

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

  onEntering() {
    this.setState({status: 'Opening...'});
  }

  onEntered() {
    this.setState({status: 'Opened'});
  }

  onExiting() {
    this.setState({status: 'Closing...'});
  }

  onExited() {
    this.setState({status: 'Closed'});
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState({fadeIn: !this.state.fadeIn});
  }


  handleNumberClick(evt, num) {
    // evt.preventDefault();
    var temp = this.state.phoneNumber.replace(/ /g,'')
    var l = temp.substr(temp.indexOf("+")+1).length;

    console.log('length is '+l);
    console.log(temp.substr(temp.indexOf("+")+1,temp.length));

    if (l == 0){
      // do nothing.
    }
    else if (l % 3 == 0){
      num = "   "+num;
    }else{
      num = " "+num;
    }


    console.log(this.state.phoneNumber.replace(/ /g,''));
    this.setState((state, prevProps) => ({
      phoneNumber: state.phoneNumber.concat(num)
    }));


  }

  handleBackspaceClick(evt) {
    // console.log('back space')
    evt.preventDefault();
    this.setState((state, prevProps) => ({
      phoneNumber: state.phoneNumber.slice(0, state.phoneNumber.length - 1)
    }));
  }

  
  handleKeyPress(event){
    event.preventDefault();
    console.log(event.charCode);

    if(event.key == 'Enter'){
      // alert('enter press here! ')
      // make the call
    }
    // It's a number
    else if (event.charCode >= 48 && event.charCode <= 57 ){
      this.handleNumberClick(event,String.fromCharCode(event.charCode));
    }
    else if (event.charCode == 35 || event.charCode == 42 || event.charCode == 43  ){
      this.handleNumberClick(event,String.fromCharCode(event.charCode));
    }else if(event.charCode == 32){
      // Don not handle space
      // this.handleNumberClick(event," ");
    }
    else{
      alert("invalid key");
    }
  }

  handleKeyDown(event){
    if (event.key === "Backspace" || event.key === "Delete"){
      // backspace
      this.handleBackspaceClick(event);
    }
  }

  // handles long press
  handleButtonPress () {
    this.buttonPressTimer = setTimeout(() => this.handleNumberClick(this.evt,"+"), 500);
  }

  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }

  render() {
    return (
      <div>
      <div className="animated fadeIn">
      <Collapse
            isOpen={!this.state.collapse}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
        <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Collapse</strong>
              <div className="card-actions">
                <a href="https://reactstrap.github.io/components/collapse/" target="_blank">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            
            <CardFooter>
              
              <h5>Current state: {this.state.status}</h5>
            </CardFooter>

        </Card>
      </Collapse>
      <Collapse
            isOpen={this.state.collapse}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
        
        <div style={{ textAlign:"center"}}>

        <Card>
             {/* style={{width:"50%"}} */}
             <CardHeader >
              {/* <FormGroup> */}
                <Row>
                  <Col xs="10"><Input onKeyDown={this.handleKeyDown} onKeyPress={this.handleKeyPress} value={this.state.phoneNumber} style={{ textAlign:"center", fontSize : "20px"}} type="text" id="ccnumber" placeholder="+ x x x   x x x   x x x   x x x" required/></Col>
                  <Col xs="2"><Button outline color="success" size="lg" block onClick={e => this.handleBackspaceClick(e)}>Back</Button></Col>
                </Row>                  
             </CardHeader>
              <CardBody >
                <Row>                  
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '1')}>1</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '2')}>2</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '3')}>3</Button></Col>
                </Row>


                <Row>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={e => this.handleNumberClick(e, '4')}>4</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={e => this.handleNumberClick(e, '5')}>5</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={e => this.handleNumberClick(e, '6')}>6</Button></Col>
                </Row>

                <Row>
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '7')}>7</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '8')}>8</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="success" size="lg" block onClick={e => this.handleNumberClick(e, '9')}>9</Button></Col>
                </Row>

                <Row>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={e => this.handleNumberClick(e, '*')}>*</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onTouchStart={this.handleButtonPress} onTouchEnd={this.handleButtonRelease} onMouseDown={this.handleButtonPress} onMouseUp={this.handleButtonRelease} onClick={e => this.handleNumberClick(e, '0')}>0/+</Button></Col>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={e => this.handleNumberClick(e, '#')}>#</Button></Col>
                </Row>


                <Row>
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={this.handleCallClick}>Call</Button></Col>
                  
                  <Col><Button style={{fontSize : "30px"}} outline color="primary" size="lg" block onClick={this.handleCallHangup}>Hangup</Button></Col>
                </Row>


              </CardBody>
        </Card>
        
        </div>      
      </Collapse>
      </div>
      <Button style={{fontSize : "30px"}} color="primary" onClick={this.toggle} style={{marginBottom: '1rem'}}>Close Dailler</Button>
      </div>
    );
  }
}

export default TestCall;