import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { 
  getContactsRequest
} from '../../redux/actions';
// import { initClient, signIn, signOut } from '../../../public/libs/googleContacts';

import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import ContactsTable from '../../components/ContactsTable/ContactsTable';

import './ContactsContainer.scss';

const timeIcon = require('../../assets/icons/clock.svg');
const profilePic = require('../../assets/profile/1.svg');

class ContactsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isErrored: false
    };

    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  componentDidCatch(error){
    // error occurred
    console.log(error);

    this.setState((prevState, props) => ({
      isErrored: true,
      error: error.info
    }));
  }

  startContactsApi(){
    const _this = this;
  
    // initClient(function(isLoggedIn){
    //   if(isLoggedIn) {
    //     _this.props.loadContacts();
    //   }
    //   else{
    //     console.log('please login to fetch contacts');
    //   }
    // });
  }

  componentDidMount() {
    this.startContactsApi();
  }

  componentDidCatch(error) {
    console.log(error);
  }

  handleSignInClick(event) {
    // signIn(this.props.loadContacts);
  }

  handleSignOutClick(event) {
    // signOut();
  }

  handleCreateNewContact(event){

  }

  render() {
    let { contacts } = this.props;
    
    return (
      <div className="call-container"> 
        <h2>Your Contacts</h2>
        
        <button id="signin-button" onClick={this.handleSignInClick}>Sign In</button>
        <button id="signout-button" onClick={this.handleSignOutClick}>Sign Out</button>
        
        <ContactsTable contacts={contacts} />
        <div className="floating-btn__container">
          <Button fab color="primary" aria-label="add" onClick={this.handleCreateNewContact}>
            <AddIcon/>
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadContacts: () => dispatch(getContactsRequest())
});

const mapStateToProps = (state, ownProps) => ({
  contacts: state.entities.contacts.data,
  loading: state.entities.contacts.request.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
