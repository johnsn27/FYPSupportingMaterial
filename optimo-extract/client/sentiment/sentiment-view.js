/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighlightWordsView from './highlight-words-view';

class SentimentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalSentiment: '',
    };
  }

  async componentDidMount() {
    try {
      const { text } = this.props;
      const responseArr = [];
      const aysncfunc = async () => {
        for (let i = 0; i < text.length; i += 1) {
          const textItem = text[i];
          const response = await fetch(`https://fhzyv065bh.execute-api.eu-west-1.amazonaws.com/dev/sentiment?text=${textItem}`);
          const responseJson = await response.json();
          const responseSentiment = responseJson.sentiment;
          if (responseSentiment && responseSentiment.length > 0) {
            responseArr.push(responseSentiment);
          }
        }
      };

      await aysncfunc();

      let pos = 0;
      let nr = 0;
      let neg = 0;
      responseArr.forEach((response) => {
        if (response === 'pos') {
          pos += 1;
        } else if (response === 'nr') {
          nr += 1;
        } else {
          neg += 1;
        }
      });

      let sentiment = '';
      if (pos >= nr && pos >= neg) {
        sentiment = 'positive';
      } else if (nr >= pos && nr >= neg) {
        sentiment = 'neutral';
      } else {
        sentiment = 'negative';
      }

      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(
        {
          finalSentiment: sentiment,
        },
        () => { },
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { finalSentiment } = this.state;
    const { text } = this.props;
    const sentiment = finalSentiment;
    if (sentiment === 'neutral') {
      return (
        <React.Fragment>
          <div>
            <div className="sentiment-view">
              <h2>Editorial Guidelines</h2>
              <div id="egassessment">
                <p id="reqtext">Sentiment</p>
                <span className="checkmark">
                  <div className="checkmark_circle" />
                  <div className="checkmark_stem" />
                  <div className="checkmark_kick" />
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="sentiment-view">
          <h2>Editorial Guidelines</h2>
          <div id="egassessment">
            <p id="reqtext">Sentiment</p>
            <p id="redx">X</p>
          </div>
          <HighlightWordsView text={text} />
        </div>
      </React.Fragment>
    );
  }
}

SentimentView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SentimentView;
