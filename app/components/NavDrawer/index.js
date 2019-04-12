import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { ArrowForwardIos, Home } from '@material-ui/icons/';

const styles = {
  list: {
    width: 250,
  },
  buttonClosed: {
    position: 'fixed',
    left: 0,
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  buttonArrow: {
    transform: 'translate(40%, 0)',
  },
};

class NavDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = open => () => {
    this.setState({
      open,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.state.open && (
          <IconButton
            className={classes.buttonClosed}
            onClick={this.toggleDrawer(true)}
          >
            <ArrowForwardIos fontSize="large" className={classes.buttonArrow} />
          </IconButton>
        )}
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>
                <ListItem button component="a" href="/dashboard">
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavDrawer);
