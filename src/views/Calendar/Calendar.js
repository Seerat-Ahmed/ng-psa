import React, { Component } from 'react';
// 
import BigCalendar from 'react-big-calendar'

import moment from 'moment'

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


// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)

// import { getEvents } from './gcal'
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css'
// this weird syntax is just a shorthand way of specifying loaders


class Calendar extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    // getEvents((events) => {
    //   this.setState({events})
    // })
  }
  render () {
    return (
      <Card>
        <CardBody>
          {/* // React Components in JSX look like HTML tags */}
          <BigCalendar
            style={{height: '420px'}}
            events={this.state.events}
          />
        </CardBody>
        
      </Card>
    )
  }
}

export default Calendar;
