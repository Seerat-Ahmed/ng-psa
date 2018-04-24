import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
} from 'reactstrap';
import { getTranscriptsRequest } from '../../redux/actions';
import isEmpty from 'lodash/isEmpty';
import each from 'lodash/each';
import last from 'lodash/last';
import AudioPlayer from './AudioPlayer';

class AudioText extends Component {

  componentWillMount(){
    if(isEmpty(this.props.transcripts)) {
      this.props.getTranscriptsRequest();
    }
  }

  render() {
    const { location, transcripts } = this.props;
    const { search } = location;
    const id = search && search.substring(4);
    const transcript = transcripts && transcripts[id];
    const url = transcript && transcript.audiofile;

    const text = [];
    if (transcript && transcript.transformed) {
      each(transcript.transformed, (part, index) => {
        let offset = 0;
        for(let i = 0; i < index; i++) {
          offset = offset + last(part[1]).to
        }

        each(part[1], t => {
          t.from = t.from + offset;
          t.to = t.to + offset;
          text.push(t);
        })
      })
    }
    // console.log('searchg');
    // console.log(transcript);
    // console.log(text);
    return url && text.length ?
      <AudioPlayer url={url} text={text} /> : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  transcripts: state.entities.transcripts.data,
});

export default connect(mapStateToProps, {
  getTranscriptsRequest
})(AudioText);
