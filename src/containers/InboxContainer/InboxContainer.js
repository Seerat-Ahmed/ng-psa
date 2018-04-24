import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmailsRequest } from '../../redux/actions';
import './InboxContainer.scss';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

// Helper methods
const getPrettyDate = (date) => {
  date = date.split(' ')[0];
  const newDate = date.split('-');
  const month = months[0];
  return `${month} ${newDate[2]}, ${newDate[0]}`;
}

// Remove the seconds from the time
const getPrettyTime = (date) => {
  const time = date
    .split(' ')[1]
    .split(':');
  return `${time[0]}:${time[1]}`;
}

class InboxContainer extends Component {
  constructor(args) {
    super(args);

    this.state = {
      selectedEmailId: 0,
      currentSection: 'inbox',
      emails: []
    };
  }

  componentDidMount(){
    this.props.fetchEmails();
  }

  componentWillReceiveProps(nextProps){
    // Assign unique IDs to the emails
    const emails = nextProps.emails;
    let id = 0;

    for (const email of emails) {
      email.id = id++;
    }

    this.setState((prevState)=> ({ emails }));

  }
  openEmail(id) {
    const emails = this.state.emails;
    const index = emails.findIndex(x => x.id === id);
    emails[index].read = 'true';
    this.setState({ selectedEmailId: id, emails });
  }

  deleteMessage(id) {
    // Mark the message as 'deleted'
    const emails = this.state.emails;
    const index = emails.findIndex(x => x.id === id);
    emails[index].tag = 'deleted';

    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emails) {
      if (email.tag === this.state.currentSection) {
        selectedEmailId = email.id;
        break;
      }
    }

    this.setState({emails, selectedEmailId});
  }

  render() {
    const currentEmail = this
      .state
      .emails
      .find(x => x.id === this.state.selectedEmailId);
    return (
      <div>
        <div className="inbox-container">
          <EmailList
            emails={this
            .state
            .emails
            .filter(x => x.tag === this.state.currentSection)}
            onEmailSelected={(id) => {
            this.openEmail(id);
          }}
            selectedEmailId={this.state.selectedEmailId}
            currentSection={this.state.currentSection}/>
          <EmailDetails
            email={currentEmail}
            onDelete={(id) => {
            this.deleteMessage(id);
          }}/>
        </div>
      </div>
    )
  }
}

/* Email classes */
const EmailListItem = ({email, onEmailClicked, selected}) => {
  let classes = "email-item";
  if (selected) {
    classes += " selected"
  }

  return (
    <div
      onClick={() => {
      onEmailClicked(email.id);
    }}
      className={classes}>
      <div className="email-item__unread-dot" data-read={email.read}></div>
      <div className="email-item__subject truncate">{email.subject}</div>
      <div className="email-item__details">
        <span className="email-item__from truncate">{email.from}</span>
        <span className="email-item__time truncate">{getPrettyDate(email.time)}</span>
      </div>
    </div>
  );
}

const EmailDetails = ({email, onDelete}) => {
  if (!email) {
    return (
      <div className="email-content empty"></div>
    );
  }

  const date = `${getPrettyDate(email.time)} · ${getPrettyTime(email.time)}`;

  const getDeleteButton = () => {
    if (email.tag !== 'deleted') {
      return <span
        onClick={() => {
        onDelete(email.id);
      }}
        className="delete-btn fa fa-trash-o"></span>;
    }
    return undefined;
  }

  return (
    <div className="email-content">
      <div className="email-content__header">
        <h3 className="email-content__subject">{email.subject}</h3>
        {getDeleteButton()}
        <div className="email-content__time">{date}</div>
        <div className="email-content__from">{email.from}</div>
      </div>
      <div className="email-content__message">{email.message}</div>
    </div>
  );
};

/* EmailList contains a list of Email components */
const EmailList = ({emails, onEmailSelected, selectedEmailId}) => {
  if (emails.length === 0) {
    return (
      <div className="email-list empty">
        Nothing to see here, great job!
      </div>
    );
  }

  return (
    <div className="email-list">
      {
        emails.map((email, key) => (
          <EmailListItem
            key={key}
            onEmailClicked={(id) => {
              onEmailSelected(id);
            }}
            email={email}
            selected={selectedEmailId === email.id} />
        ))
      }
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  emails: state.entities.emails
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmails: () => dispatch(getEmailsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxContainer);
