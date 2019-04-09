/**
 *
 * DashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { Link, List, ListItem } from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPuzzles } from './actions';
import makeSelectDashboardContainer, {
  makeSelectDashboardContainerPuzzles,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.loadPuzzles();
  }

  render() {
    const { puzzles } = this.props;
    return (
      <List>
        {Object.keys(puzzles).map(parentId => (
          <ListItem>
            <Link href={`/home/${parentId}`}>{parentId}</Link>
            {`(${Object.keys(puzzles[parentId]).length} version${
              Object.keys(puzzles[parentId]).length > 1 ? 's' : ''
            })`}
          </ListItem>
        ))}
      </List>
    );
  }
}

DashboardContainer.propTypes = {
  loadPuzzles: PropTypes.func.isRequired,
  puzzles: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardContainer: makeSelectDashboardContainer(),
  puzzles: makeSelectDashboardContainerPuzzles(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPuzzles }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardContainer', reducer });
const withSaga = injectSaga({ key: 'dashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardContainer);
