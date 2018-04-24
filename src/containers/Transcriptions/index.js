import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getTranscriptsRequest } from '../../redux/actions';
import TranscriptsList from './TranscriptsList';
import isEmpty from 'lodash/isEmpty';


class Transcriptions extends Component {

  componentWillMount(){
    if(isEmpty(this.props.data)) {
      this.props.getTranscriptsRequest();
    }
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const { data, request } = this.props;

    return (
      <div className="animated fadeIn">
        {request.loading ? (
            <i className="fa fa-spinner fa-3x fa-spin" aria-hidden="true"/>
          ) : (
            <TranscriptsList list={data} />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.entities.transcripts,
});

export default connect(mapStateToProps, {
  getTranscriptsRequest
})(Transcriptions);