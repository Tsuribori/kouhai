import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Loading from './Loading.js';
import AnimePreview from './AnimePreview.js';
import InfiniteScroll from 'react-infinite-scroller';
const jikanjs = require('jikanjs');

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
  },
});

class PopularList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      moreContent: true,
    }
  }

  loadMorePopular = (page) => new Promise(resolve => {
    let content = this.state.content;
    jikanjs.loadTop('anime', page, 'airing').then((response) => {
      if (Object.keys(response.top).length < 50) {
        this.setState({ moreContent: false });
      };
      const newPage = (
        response.top.map((obj) => (
          <AnimePreview
            key={obj.mal_id}
            mal_id={obj.mal_id}
            title={obj.title}
            image_url={obj.image_url}
          />
        ))
      );
      content.push(newPage);
      this.setState({ content: content });
      resolve();
    });
  });
 
  render() {
    return (
      <DocumentTitle title='Popular'>
        <InfiniteScroll
          loadMore={this.loadMorePopular}
          initialLoad={true}
          hasMore={this.state.moreContent}
          loader={<Loading key='popularLoader' />}
        >
          <div className={this.props.classes.root}>
            <Grid container
              spacing={8}
              justify="center"
            >
              {this.state.content}
            </Grid>
          </div>
        </InfiniteScroll>
      </DocumentTitle>
    );
  }
}

PopularList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopularList);    
