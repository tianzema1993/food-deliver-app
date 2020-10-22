import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import DriverBar from "./sidebar/DriverBar";
import DriverOrder from "./mainpage/DriverOrder";
import DriverHome from "./mainpage/DriverHome";
import DriverHistory from "./mainpage/DriverHistory";

class DriverView extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeView("Driver")
  }
  render() {
    return this.props.currentUser ? (
      <Router>
        <Grid container justify="flex-start">
          <Grid item sm={3}>
            <DriverBar />
          </Grid>
          <Grid item sm={9}>
            <div className="grid-item">
              <Switch>
                <Route path="/driver/home" render={props => <DriverHome {...props} currentUser={this.props.currentUser} />} />
                <Route path="/driver/order" render={props => <DriverOrder {...props} currentUser={this.props.currentUser} />} />
                <Route path="/driver/history" render={props => <DriverHistory {...props} currentUser={this.props.currentUser} />} />
                <Redirect path="/driver" to="/driver/home" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    ) : <div />;
  }
}

export default DriverView;