import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import ProfileRecentActivityContainer from '../ProfileRecentActivityContainer';
import InboxContainer from '../InboxContainer';
import {
  Card,
  CardBody,
} from 'reactstrap';
import { getTranscriptsRequest } from '../../redux/actions';
import TranscriptsList from '../Transcriptions/TranscriptsList';
import isEmpty from 'lodash/isEmpty';

import './ProfileContainer.scss';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{
      padding: 8 * 3
    }}>
      {props.children}
    </Typography>
  );
}


class ProfileContainer extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  componentWillMount(){
    if(isEmpty(this.props.data)) {
      this.props.getTranscriptsRequest();
    }
  }

  render() {
    const { location, contacts } = this.props;
    const { value } = this.state;
    const { search } = location;
    const resourceName = search && search.substring(15);
    let profile = contacts && contacts.filter(c => c.resourceName === resourceName);
    profile = profile && profile.length && profile[0];
    const name = (profile && profile.names && profile.names[0].displayName) || 'John Doe';
    const imageUrl = (profile && profile.photos && profile.photos[0].url)
      || 'http://www.networkfp.com/wp-content/uploads/2016/08/man-1-2.jpg';
    const phoneNumber = (profile && profile.phoneNumbers && profile.phoneNumbers[0].canonicalForm);

    return (
      <Card>
        <CardBody>
          <div className="profile-container">
            <div className="profile-container__left">
              <div className="profile-container__left-content">
                <div className="profile-container__left-user-profile">
                    <div className="profile__image">
                      <img src={imageUrl} />
                    </div>
                    <div className="profile__name">
                      <h2>{name}</h2>
                    </div>
                    <div className="profile__icons">
                      <a href={`tel:${phoneNumber}`}>
                        <div className="icon">
                          <i className="fa fa-phone fa-lg" />
                        </div>
                      </a>
                      
                      <div className="icon">
                        <i className="fa fa-bar-chart fa-lg" />
                      </div>
                    
                      <div className="icon">
                        <i className="fa fa-file fa-lg" />
                      </div>
                    </div>
                    <div className="profile__info">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Euismod quis viverra nibh cras pulvinar.
                      </p>
                    </div>
                </div>          
              </div>      
            </div>
          
            <div className="profile-container__right">
              <div className="profile-container__right-content">
                <div>
                  <AppBar className="menu-bar" position="static">
                    <Tabs 
                      value={value} 
                      fullWidth
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="secondary">
                      <Tab label="Messages" />
                      <Tab label="Transcripts" />
                      <Tab label="Recent Activity" />
                    </Tabs>
                  </AppBar>
                  
                  {value === 0 && 
                    <TabContainer>
                      <InboxContainer />
                    </TabContainer>
                  }
                  {value === 1 && 
                    <TabContainer>
                      <TranscriptsList list={this.props.transcripts} />
                    </TabContainer>
                  }
                  {value === 2 && 
                    <TabContainer>
                      <ProfileRecentActivityContainer />
                    </TabContainer>
                  }
                </div>       
              </div>      
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

const profileContainerWithStyles = withStyles(styles)(ProfileContainer);

const mapStateToProps = (state, ownProps) => ({
  contacts: state.entities.contacts.data,
  transcripts: state.entities.transcripts.data,
});

export default connect(mapStateToProps, {
  getTranscriptsRequest
})(profileContainerWithStyles);
