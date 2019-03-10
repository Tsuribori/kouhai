import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { StarRate, Movie, LiveTv, Tv, AccessTime, Info, Style } from '@material-ui/icons';

const styles = theme => ({
  nested: { 
    paddingLeft: theme.spacing.unit * 10,
  }
});

function AnimeDetail(props) {
   return (
     <div> 
     <Card>
       <CardActionArea>
         <Grid
           container
           justify="center"
         >
           <Grid item>
             <CardMedia
               component="img"
               image={props.image_url}
               title={props.title}
             />
           </Grid>
           <Grid item>
             <CardContent>
               <Typography gutterBottom variant="h5" component="h3">
                 {props.title}
               </Typography>
               <Typography variant="subtitle1" color="textSecondary">
                 {props.english_title}
               </Typography>
             </CardContent>
           </Grid>
         </Grid>
       </CardActionArea>
     </Card>
     
     <Paper>      
     <List>
       <ListItem>
         <ListItemIcon>
            <StarRate />
         </ListItemIcon>
         <ListItemText
           primary={props.score}
           secondary="score"
         />
       </ListItem>
       <ListItem>
         <ListItemIcon>
           <Movie />
         </ListItemIcon>
         <ListItemText
           primary={props.type}
           secondary="type"
         />
       </ListItem>
       { props.episodes &&
       <ListItem>
         <ListItemIcon>
           <LiveTv />
         </ListItemIcon>
         <ListItemText
           primary={props.episodes}
           secondary="episodes"
         />
       </ListItem>
       }
       <ListItem>
         <ListItemIcon>
           <Tv />
         </ListItemIcon>
         <ListItemText
           primary={props.status}
           secondary="status"
         />
       </ListItem>
       { props.broadcast &&
       <ListItem>
         <ListItemIcon>
           <AccessTime />
         </ListItemIcon>
         <ListItemText
           primary={props.broadcast}
           secondary="broadcast"
         />
       </ListItem>
       }
       { props.synopsis &&
       <ListItem alignItems="flex-start">
         <ListItemIcon>
           <Info />
         </ListItemIcon>
         <ListItemText
           primary={props.synopsis}
           secondary="synopsis"
         />
       </ListItem>
       }
       <ListItem>
         <ListItemIcon>
           <Style />
         </ListItemIcon>
         <ListItemText
           primary="Genres"
         />
       </ListItem>
         <List className={props.classes.nested}>
           {props.genres.map((genre) => (
             <ListItem key={genre.name}>
               <ListItemText primary={genre.name} />
             </ListItem>
           ))}
         </List>
     </List>
     </Paper>
     </div>
   );
}

AnimeDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimeDetail);
