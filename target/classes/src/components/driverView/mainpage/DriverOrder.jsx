import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class DriverOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: undefined
    }
    this.getActiveOrder = this.getActiveOrder.bind(this);
  }

  componentDidMount() {
    this.getActiveOrder();
  }

  getActiveOrder() {
    axios.get("/api/driver/myActiveOrder/" + this.props.currentUser.id).then(
      response => {
        this.setState({order: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.order ? (
      <div>
        <Grid container justify="space-evenly" spacing={3}>
          <Grid item xs={5}>
            <OrderCard order={this.state.order} userType={this.props.currentUser.type} getOrders={this.getActiveOrder} />
          </Grid>
        </Grid>
      </div>
    ) : <Typography variant="h5"><i>You don't have any active order...</i></Typography>
  }
}

export default DriverOrder;