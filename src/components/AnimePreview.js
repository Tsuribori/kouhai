import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  image: {
    paddingTop: theme.spacing.unit * 3,
  }
});
  
function AnimePreview(props) {
  return (
    <Grid item
      xs={12}
      sm={6}
      md={3}
      lg={2}
    >
      <Card>
        <CardActionArea>
          <div className={props.classes.image}>
            <Grid
              container
              justify="center"
            >
              <Grid
                item
                xs={10}
              >
                <CardMedia 
                  component="img"
                  image={props.image_url}
                  title={props.title}
                />
              </Grid>
            </Grid>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {props.title} 
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/anime/${props.mal_id}`}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

AnimePreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimePreview);
