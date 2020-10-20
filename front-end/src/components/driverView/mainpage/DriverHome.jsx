import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class DriverHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getPendingOrders = this.getPendingOrders.bind(this);
  }

  componentDidMount() {
    this.getPendingOrders();
  }

  getPendingOrders() {
    axios.get("/api/driver/pendingOrders/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <div>
        <Grid container justify="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} getOrders={this.getPendingOrders} />
            </Grid>
          )) : <Typography variant="h5"><i>There is no available order...</i></Typography>}
        </Grid>
      </div>
    ) : <Typography variant="h5"><i>You already have an active order in delivery...</i></Typography>
  }
}

export default DriverHome;