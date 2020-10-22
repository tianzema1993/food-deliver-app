import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import OrderCard from "../../card/OrderCard";
const axios = require('axios').default;

class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: undefined
    }
    this.getCartOrders = this.getCartOrders.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    this.getCartOrders();
  }

  getCartOrders() {
    axios.get("/api/customer/myCart/" + this.props.currentUser.id).then(
      response => {
        this.setState({orders: response.data});
      }
    ).catch(err => console.log(err));
  }

  checkout() {
    axios.post("/api/order/checkoutAll", {orders : this.state.orders}).then(
      response => {
        this.getCartOrders();
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.orders ? (
      <div>
        <Grid container justify="space-evenly" spacing={3}>
          {this.state.orders.length > 0 ? this.state.orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={this.props.currentUser.type} getOrders={this.getCartOrders} />
            </Grid>
          )) : <Typography variant="h5"><i>Your Shopping Cart is Empty...</i></Typography>}
          {this.state.orders.length > 0 ? (
            <Grid item xs={12}>
              <div className="checkoutBox">
              <Grid container justify="flex-end">
                <Grid item>
                  <Button variant="outlined" color="secondary" size="medium" onClick={this.checkout}>
                    Check out all orders
                  </Button>
                </Grid>
              </Grid>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </div>
    ) : <div />
  }
}

export default ShopCart;