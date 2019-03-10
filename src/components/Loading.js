import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  padded: {
    paddingTop: theme.spacing.unit * 5,
  }
});

function Loading(props) {
  return (
    <Grid container
      justify="center"
      className={props.classes.padded}
    >
      <Grid item>
        <CircularProgress/>
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
