import React, { Component } from 'react';
import Loading from './Loading.js';
import AnimeDetail from './AnimeDetail.js';
const jikanjs = require('jikanjs');

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loading />
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
      this.setState({ content: detail });
      resolve();
    });
  });

  render() {
    return this.state.content;
  }
}

export default Detail;
