import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Loading from './Loading.js';
import AnimeDetail from './AnimeDetail.js';
const jikanjs = require('jikanjs');

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loading />,
      series: 'Loading...',
    }
  }
  
  componentDidMount() {
    this.getDetail();
  }

  getDetail = () => new Promise(resolve => {
    const id = this.props.match.params['mal_id'];
    jikanjs.loadAnime(id).then((response) => {
      const detail = <AnimeDetail
        key={response.mal_id}
        {...response} 
      />
      this.setState({ content: detail, series: response.title });
      resolve();
    });
  });

  render() {
    return (
      <DocumentTitle title={this.state.series}>
        {this.state.content}
      </DocumentTitle>
    );
  }
}

export default Detail;
