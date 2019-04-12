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
import { Home, Menu } from '@material-ui/icons/';

const styles = {
  list: {
    width: 250,
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
            <Menu fontSize="large" />
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
