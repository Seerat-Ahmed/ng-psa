import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Jumbotron, Container,
  Modal,ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { 
  showModal, 
  getActivityRequest 
} from '../../redux/actions';

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ProfileRecentActivityContainer from '../ProfileRecentActivityContainer';

import './CallContainer.scss';

const timeIcon = require('../../assets/icons/clock.svg');
const profilePic = require('../../assets/profile/1.svg');

class CallContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrored: false
    }
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  componentDidCatch(error){
    // error occurred
    console.log(error);
    this.setState((prevState, props) => ({
      isErrored: true
    }))
  }
  
  componentDidMount() {
    this.props.loadActivity();
  }

  componentDidCatch(error) {
    console.log(error);
  }

  createActivityList(recentActivity) {
    let activityList = [];
    for (let key in recentActivity) {
      activityList.push(
        <Fragment key={key}>
          <div className="contact">
            <div className="profile-photo">
              <img src={profilePic}/>
            </div>
            <div className="description">
              <span>Call with {recentActivity[key].name}</span>
            </div>
            <div className="activity">
              <img src={timeIcon}/>
              <span>just now</span>
            </div>
          </div>
          <div className="divider"/>
        </Fragment>
      )
    }
    return activityList;
  }

  handleShowModal(ev) {
    this.props.showModal('dialler');
  }

  render() {
    let { activity } = this.props;

    return (

      <Card style={{marginBottom: "50px"}}>
          <div className="call-container">
          <CardHeader>
                <div className="call-container__recent__header">
                  Recent Activity
                </div>
          </CardHeader>
          <CardBody>
              <div className="call-container__recent">
                
                <div className="input-container">
                  <input  type="search" name="contact-search" className="input input-basic"/>
                </div>
                <div className="divider"/>
                <div>
                  {
                    (this.props.loading) ? <CircularProgress className="loader" size={50} thickness={4} /> :
                    <ProfileRecentActivityContainer />
                  }
                </div>
              </div>

              <div className="floating-btn__container">
                <Button fab color="primary" aria-label="add" onClick={this.handleShowModal}>
                  <AddIcon/>
                </Button>
              </div>
          </CardBody>        
        </div>
      </Card>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showModal: modalType => dispatch(showModal(modalType)),
  loadActivity: () => dispatch(getActivityRequest())
});

const mapStateToProps = (state, ownProps) => ({
    activity: Object.assign([], state.entities.call.recentActivity),
    loading: state.entities.call.recentActivity.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(CallContainer);
