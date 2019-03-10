import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Loading from './Loading.js';
import AnimePreview from './AnimePreview.js';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from 'material-ui-search-bar';
const jikanjs = require('jikanjs');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContent: [],
      query: "",
      searchActive: false,
    }
  }

  componentDidMount() {
    this.props.handleHide();
  }

  componentWillUnmount() {
    this.props.handleHide();
  }

  onSearch = (query) => {
    if (query.length > 2) {
      this.setState({ query: query, searchContent: [], searchActive: true });
    };
  };

  loadMoreResults = (page) => new Promise(resolve => {
    let content = this.state.searchContent;
    jikanjs.search('anime', this.state.query).then((response) => {
      const newPage = (
        response.results.map((obj) => (
          <AnimePreview 
            key={obj.mal_id}
            mal_id={obj.mal_id}
            title={obj.title}
            image_url={obj.image_url}
          />
        ))
      );
      content.push(newPage);
      this.setState({ searchContent: content });
      resolve();
    });
  });

  render() {
    return (
      <div>
      <SearchBar
        value={this.state.value}
        onChange={this.onSearch}
        onRequestSearch={this.onSearch}
      />
      <InfiniteScroll
        loadMore={this.loadMoreResults}
        hasMore={this.state.searchActive}
        loader={<Loading key='searchLoader' />}
      >
        <div className={this.props.classes.root}>
          <Grid container
            spacing={8}
            justify="center"
          >
            {this.state.searchContent}
          </Grid>
        </div>
      </InfiniteScroll>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
