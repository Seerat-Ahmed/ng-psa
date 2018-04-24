import React, {Component} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import TextBar from './textBar';

class AudioPlayer extends Component {

  constructor() {
    super();
    this.textClicked = this.textClicked.bind(this);
    this.onListen = this.onListen.bind(this);
    this.onSeeked = this.onSeeked.bind(this);

    this.state = {
      objectIndexInFocus: null,
      objectIndexPresent: false,
      percentageElapsed: 0
    };
  }

  formatToSeconds(interval) {
    return interval;
    // const strInterval = interval.toString();
    // console.log(strInterval);
    // const split = strInterval.split('.');
    // const minutes = parseFloat(split[0]*60);
    // const seconds = parseFloat(split[1].substring(0, 2));
    // const subSeconds = parseFloat(`0.${split[1].substring(2, split[1].length)}`);
    // return minutes + seconds + subSeconds;
  }

  textClicked(index) {
    const { text } = this.props;
    const textObject = text[index];
    this.audioPlayer.audioEl.currentTime = this.formatToSeconds(textObject.from);
    this.audioPlayer.audioEl.play();
  }

  getObjectInFocus(seconds) {
    const { text } = this.props;
    let objectIndexInFocus = 0, objectIndexPresent = false, percentageElapsed = 0;
    text.some((textObject, index) => {
      const from = this.formatToSeconds(textObject.from);
      const to = this.formatToSeconds(textObject.to);

      if (seconds > from && seconds < to) {
        objectIndexInFocus = index;
        objectIndexPresent = true;

        const interval = to - from;
        const elapsed = seconds - from;
        percentageElapsed = elapsed/interval*100;


        return true;
      }
      return false;
    });

    this.setState({objectIndexInFocus, objectIndexPresent, percentageElapsed});
  }

  onSeeked(){
    this.getObjectInFocus(this.audioPlayer.audioEl.currentTime);
  }

  onListen(seconds) {
    this.getObjectInFocus(seconds);
  }

  render() {
    const { objectIndexInFocus, objectIndexPresent, percentageElapsed } = this.state;
    const { url, text } = this.props;

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop" /> Audio player with text highlight
          </div>
          <div className="card-body">
            <ReactAudioPlayer
              ref={o => this.audioPlayer = o}
              src={url}
              autoPlay
              controls
              listenInterval={100}
              onListen={this.onListen}
              onSeeked={this.onSeeked}
            />
            <div>
              {text.map((p, i) => (
                <div
                  className="col-md-12" key={`text#${i}`}
                  onClick={() => { this.textClicked(i) }}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className={`p-3 mb-3 ${objectIndexPresent && (i === objectIndexInFocus) ?
                      'bg-secondary' : 'bg-primary'
                    }`}
                  >
                    <div>
                      {`Speaker # ${p.speaker}`}
                    </div>
                    <TextBar
                      isHighlighted={objectIndexPresent && (i === objectIndexInFocus)}
                      percentage={percentageElapsed}
                      text={p.text}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;
