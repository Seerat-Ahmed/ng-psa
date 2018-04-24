import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextBar extends Component {

  getWordBox(word, wordIndex, wordsLength, percentage, isHighlighted) {
    const wordPercentage = (wordIndex+1)/wordsLength * 100;

    const className = isHighlighted && (wordPercentage <= percentage) ? 'bg-primary' : '';

    return <span key={`word-${word}-${wordIndex}`} className={className} style={{ marginRight: 8 }}>{word}</span>;
  }

  render() {
    const { text, percentage, isHighlighted } = this.props;
    const words = text.split(' ');

    return (
      <div>
        {words.map((word, index) => (
          this.getWordBox(word, index, words.length, percentage, isHighlighted)
        ))}
      </div>
    )
  }
}

TextBar.propTypes = {
  text: PropTypes.string,
  percentage: PropTypes.number,
  isHighlighted: PropTypes.bool,
};

export default TextBar;
