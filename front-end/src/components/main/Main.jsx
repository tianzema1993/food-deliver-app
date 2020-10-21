import React from 'react';
import TopBar from '../topbar/Topbar';
import Login from '../login/Login';
import Register from '../register/Register';
import CustomerView from '../customerView/CustomerView';
import DriverView from '../driverView/DriverView';
import RestaurantView from '../restaurantView/RestaurantView';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Grid
} from '@material-ui/core';
import './Main.css';
const axios = require('axios').default;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userId"),
      userType: sessionStorage.getItem("userType"),
      currentUser: undefined,
      view: "Home"
    }
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if (this.state.userId && this.state.userType) {
      axios.get("/api/" + this.state.userType + "/" + this.state.userId).then(
        response => {
          this.setState({currentUser: response.data})
        }
      ).catch(err => console.log(err));
    }
  }

  changeUser(newUser, action) {
    this.setState({currentUser: newUser});
    if (action === "login") {
      this.setState({userId: newUser.id, userType: newUser.type});
      sessionStorage.setItem("userId", newUser.id);
      sessionStorage.setItem("userType", newUser.type);
    } else if (action === "logout") {
      sessionStorage.clear();
      this.setState({userId: undefined, userType: undefined});
    }
  }

  changeView(type) {
    this.setState({view: type + "'s View"});
  }

  render() {
    return (
      <Router>
        <Grid container justify="flex-start">
          <Grid item xs={12}>
            <TopBar changeUser={this.changeUser} view={this.state.view} currentUser={this.state.currentUser} />
          </Grid>
          <Grid item xs={12}>
            <div className="grid-main">
              <Switch>
                {this.state.userType && this.state.userType === "customer" ? (
                  <Route path="/customer" render={props => <CustomerView {...props} currentUser={this.state.currentUser} changeView={this.changeView} />} />
                ) : (
                  <Redirect path="/customer" to="/login" />
                )}
                {this.state.userType && this.state.userType === "driver" ? (
                  <Route path="/driver" render={props => <DriverView {...props} currentUser={this.state.currentUser} changeView={this.changeView} />} />
                ) : (
                  <Redirect path="/driver" to="/login" />
                )}
                {this.state.userType && this.state.userType === "restaurant" ? (
                  <Route path="/restaurant" render={props => <RestaurantView {...props} currentUser={this.state.currentUser} changeView={this.changeView} />} />
                ) : (
                  <Redirect path="/restaurant" to="/login" />
                )}
                {!this.state.userType ? (
                  <Route path="/login" render={props => <Login {...props} changeUser={this.changeUser} />} />
                ) : (
                  <Redirect path="/login" to={"/" + this.state.userType} />
                )}
                {!this.state.userType ? (
                  <Route path="/register" render={props => <Register {...props} changeUser={this.changeUser} />} />
                ) : (
                  <Redirect path="/register" to={"/" + this.state.userType} />
                )}
                <Redirect path="/" to={"/login"} />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    );
  }
}

export default Main;