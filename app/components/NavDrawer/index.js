import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withLogout from 'containers/WithLogout';

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { Dashboard, Menu, PowerSettingsNew } from '@material-ui/icons/';

const styles = {
  list: {
    width: 250,
  },
};

const LogoutButton = withLogout(({ logout }) => (
  <ListItem button onClick={logout}>
    <ListItemIcon>
      <PowerSettingsNew />
    </ListItemIcon>
    <ListItemText primary="Log Out" />
  </ListItem>
));

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
        <IconButton
          className={classes.buttonClosed}
          onClick={this.toggleDrawer(true)}
        >
          <Menu fontSize="large" />
        </IconButton>
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
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <LogoutButton />
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
