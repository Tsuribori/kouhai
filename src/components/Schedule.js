import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import Loading from './Loading.js';
import AnimePreview from './AnimePreview.js';
const jikanjs = require('jikanjs');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  day: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
  }, 
});

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loading />
    }
  }

  componentDidMount() {
    this.getSchedule();
  }

  getSchedule = () => new Promise(resolve => {
    jikanjs.loadSchedule().then((response) => {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const scheduleList = (
        <div className={this.props.classes.root}>
          {days.map((day) => (
            <div key={day}>
              <Typography variant="h3" component="h3" className={this.props.classes.day}>
                {day[0].toUpperCase() + day.slice(1)}
              </Typography>
              <Grid container
                spacing={8}
                justify="center"
              >
                {response[day].map((obj) => (
                  <AnimePreview
                    key={obj.mal_id}
                    {...obj}
                  />
                ))}
              </Grid>
              <Divider className={this.props.classes.divider} />
            </div>
          ))}
        </div>
      );
      this.setState({ content: scheduleList });
      resolve();
    });
  });

  render() {
    return this.state.content;
  }
}

Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Schedule);
