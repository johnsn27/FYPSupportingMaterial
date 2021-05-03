import React, { Component } from 'react';

class HighlightWordsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
    };
  }

  async componentDidMount() {
    try {
      const { text } = this.props;
      console.log('text', text)
      const responseArr = [];
      const aysncfunc = async () => {
        for (let i = 0; i < text.length; i += 1) {
          const textItem = text[i];
          const textItemLower = textItem.toLowerCase();
          const response = await fetch(`https://ex855xrbha.execute-api.eu-west-1.amazonaws.com/dev/highlight_words?text=${textItemLower}`);
          const responseJson = await response.json();
          if (responseJson.words.length > 0) {
            responseArr.push(responseJson);
          }
        }
      };

      await aysncfunc();

      this.setState(
        {
          dataSource: responseArr,
        },
        () => { },
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { dataSource } = this.state;
    let wipString = '';
    if (dataSource.length > 0) {
      const { words } = dataSource[0];
      if (words) {
        words.map((word) => {
          wipString += `${word}, `;
          return wipString;
        });
        wipString = wipString.slice(0, -2);
      }

      return (
        <div className="highlight_words">
          <p>You could remove the following words to decrease the sentiment of the article:</p>
          <p>{wipString}</p>
        </div>
      );
    }

    return (
      <div className="highlight_words" />
    );
  }
}

export default HighlightWordsView;
