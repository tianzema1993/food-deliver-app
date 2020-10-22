import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class DriverHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getDriverHistory = this.getDriverHistory.bind(this);
  }

  componentDidMount() {
    this.getDriverHistory();
  }

  getDriverHistory() {
    axios.get("/api/driver/myOrderHistory/" + this.props.currentUser.id).then(
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
              <OrderCard order={order} userType={this.props.currentUser.type} />
            </Grid>
          )) : <Typography variant="h5"><i>You don't have any past orders...</i></Typography>}
        </Grid>
      </div>
    ) : <div />
  }
}

export default DriverHistory;