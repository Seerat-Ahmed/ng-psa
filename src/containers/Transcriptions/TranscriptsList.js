import React, { Component } from 'react';
import {
  Card,
  CardBody,
} from 'reactstrap';
import map from 'lodash/map';
import { Link } from 'react-router-dom';

class TranscriptsList extends Component {

  render() {
    const { list } = this.props;

    return (
      <div>
        {map(list, (t, id) => (
          <Card key={`transcript-id-${id}`}>
            <CardBody>
              <Link to={`/audio-text?id=${id}`} >
                {`Transcription ${id}`}
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

export default TranscriptsList;