import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import RestaurantBar from "./sidebar/RestaurantBar";
import RestaurantOrder from "./mainpage/RestaurantOrder";
import RestaurantHome from "./mainpage/RestaurantHome";
import RestaurantHistory from "./mainpage/RestaurantHistory";
import RestaurantInfo from "./mainpage/RestaurantInfo";
import RestaurantMenu from "./mainpage/RestaurantMenu";

class RestaurantView extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeView("Restaurant")
  }
  render() {
    return this.props.currentUser ? (
      <Router>
        <Grid container justify="flex-start">
          <Grid item sm={3}>
            <RestaurantBar />
          </Grid>
          <Grid item sm={9}>
            <div className="grid-item">
              <Switch>
                <Route path="/restaurant/home" render={props => <RestaurantHome {...props} currentUser={this.props.currentUser} />} />
                <Route path="/restaurant/information" render={props => <RestaurantInfo {...props} currentUser={this.props.currentUser} />} />
                <Route path="/restaurant/menu" render={props => <RestaurantMenu {...props} currentUser={this.props.currentUser} />} />
                <Route path="/restaurant/order" render={props => <RestaurantOrder {...props} currentUser={this.props.currentUser} />} />
                <Route path="/restaurant/history" render={props => <RestaurantHistory {...props} currentUser={this.props.currentUser} />} />
                <Redirect path="/restaurant" to="/restaurant/home" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    ) : <div />;
  }
}

export default RestaurantView;