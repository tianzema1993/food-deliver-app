import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class RestaurantOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getRestaurantOrders = this.getRestaurantOrders.bind(this);
  }

  componentDidMount() {
    this.getRestaurantOrders();
  }

  getRestaurantOrders() {
    axios.get("/api/restaurant/myActiveOrders/" + this.props.currentUser.id).then(
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
              <OrderCard order={order} />
            </Grid>
          )) : <Typography variant="h5"><i>You don't have any active orders...</i></Typography>}
        </Grid>
      </div>
    ) : <div />
  }
}

export default RestaurantOrder;