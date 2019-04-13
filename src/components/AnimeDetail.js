import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Link } from '@material-ui/core';
import { StarRate, Movie, LiveTv, Tv, AccessTime, Info, Style, Business, PlayArrow, DateRange } from '@material-ui/icons';
import moment from 'moment';

const styles = theme => ({
  nested: { 
    paddingLeft: theme.spacing.unit * 10,
  },
});

const formatDate = (props) => {
  if (props.aired.from === null) {
    return null;
  }
  else if (props.type === 'Movie') {
    return moment(props.aired.from).format('YYYY/MM/DD');
  }
  else {
    return `${moment(props.aired.from).format('YYYY/MM/DD')} - ${props.aired.to ? moment(props.aired.to).format('YYYY/MM/DD') : 'Ongoing'}`;
  }
};

const info = (props) => [
  {
    'name': 'score',
    'icon': <StarRate/>,
    'value': props.score,
  },
  {
    'name': 'type',
    'icon': <Movie/>,
    'value': props.type,
  },
  {
    'name': 'episodes',
    'icon': <LiveTv/>,
    'value': props.episodes,
  },
  {
    'name': 'status',
    'icon': <Tv/>,
    'value': props.status,
  },
  {
    'name': 'aired',
    'icon': <DateRange/>,
    'value': formatDate(props),
  },
  {
    'name': 'broadcast',
    'icon': <AccessTime/>,
    'value': props.broadcast,
  },
  {
    'name': 'studio',
    'icon': <Business/>,
    'value': props.studios.length > 0 ? props.studios[0].name : null,
  },
];
   
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
       {info(props).map((obj) => (
         obj.value && (
           <ListItem key={obj.name}>
             <ListItemIcon>
               {obj.icon}
             </ListItemIcon>
             <ListItemText
               primary={obj.value}
               secondary={obj.name}
             />
           </ListItem>
         )
       ))}
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
           <PlayArrow/>
         </ListItemIcon>
         <ListItemText>
           <Link 
             target="_blank"
             rel="noreferrer"
             href={props.trailer_url}
           >
             View trailer
           </Link>
         </ListItemText>
       </ListItem>
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
