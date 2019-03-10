import React, { Component } from 'react';
import PropTypes from 'prop-types';
import scroll from 'react-scroll';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, CssBaseline, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowUpward } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PopularList from './PopularList.js';
import Detail from './Detail.js';
import Schedule from './Schedule.js';
import Top from './Top.js';
import Search from './Search.js';

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  search: {
    display: "flex",
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end", 
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      searchPage: false,
    }
    this.handleMenu = this.handleMenu.bind(this); 
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  handleClick = () => {
    scroll.animateScroll.scrollToTop();
  }

  handleIconHide = () => {
    this.setState({ searchPage: !this.state.searchPage });
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);
    const paths = [
      {
        url: '/',
        name: 'Popular'
      },
      {
        url: '/top',
        name: 'Top'
      },
      {
       url: '/schedule',
       name: 'Schedule'
      }
    ];
    return (
      <Router>
        <CssBaseline>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                >
                  {paths.map((path) => (
                    <MenuItem 
                      key={path.url}
                      component={Link} 
                      to={path.url}
                      onClick={this.handleClose}
                    >
                      {path.name}
                    </MenuItem>
                  ))};
                </Menu>
                {!this.state.searchPage &&
                <div className={classes.search}>
                  <IconButton
                    component={Link}
                    to="/search"
                    color="inherit"
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
                }
              </Toolbar>
            </AppBar>
          </div>
          <div>
            <Route exact path="/" component={PopularList} />
            <Route path="/anime/:mal_id(\d*)" component={Detail} />
            <Route path="/top" component={Top} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/search" 
              render={(props) => <Search {...props} handleHide={this.handleIconHide}/>}
            />
          </div>
          <Fab onClick={this.handleClick} className={classes.fab} color="primary">
            <ArrowUpward />
          </Fab>
        </CssBaseline>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
