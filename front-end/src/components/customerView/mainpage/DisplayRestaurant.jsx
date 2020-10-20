import React from 'react';
import {
  Grid, Typography, Button
} from '@material-ui/core';
import { Link } from "react-router-dom";
import "./Customer.css";
import DishCard from "../../card/DishCard";
const axios = require('axios').default;

class DisplayRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: this.props.match.params.restaurantId,
      restaurant: undefined,
      subtotal: 0,
      shopcart: []
    }
    this.getRestaurant = this.getRestaurant.bind(this);
    this.addDish = this.addDish.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant() {
    axios.get("/api/restaurant/" + this.state.restaurantId).then(
      response => {
        this.setState({restaurant: response.data});
      }
    ).catch(err => console.log(err));
  }

  addDish(action, dish) {
    if (action === "add") {
      let tempArray = this.state.shopcart;
      tempArray.push(dish);
      this.setState({subtotal: this.state.subtotal + dish.price, shopcart: tempArray});
    } else if (action === "minus") {
      let tempArray2 = this.state.shopcart.filter(preDish => preDish.dishName !== dish.dishName);
      this.setState({subtotal: this.state.subtotal - dish.price, shopcart: tempArray2});
    }
  }

  addToCart() {
    axios.post("/api/order/addToCart", {
      customerId: this.props.currentUser.id,
      restaurantId: this.state.restaurantId,
      shopcart: this.state.shopcart
    }).then(response => console.log(response.data)).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser && this.state.restaurant ? (
      <div>
        <Typography variant="h4">
        <img className="littleImage" src= {this.state.restaurant.information.imageUrl} alt={this.state.restaurant.information.restaurantName} />
        <i><b>Welcome to {this.state.restaurant.information.restaurantName}</b></i>
        </Typography>
        {!this.state.restaurant.information.open ? (
          <Typography variant="body1" color="error">Closed, will go back soon...</Typography>
        ) : null}
        <br />
        <Typography variant="body1" color="textSecondary" component="p">
          <i>{this.state.restaurant.information.description}</i>
        </Typography>
        <br />
        <br />
        <br />
        <Grid container spacing={3} justify="space-evenly">
          {this.state.restaurant.menu.map((dish, index) => (
            <Grid item xs={3} key={index}>
              <DishCard dish={dish} addDish={this.addDish} currentUser={this.props.currentUser} />
            </Grid>
          ))}
        </Grid>
        <div className="checkoutBox">
          <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="h5"><i>Subtotal : $ {this.state.subtotal}</i></Typography>
              </Grid>
          </Grid>
          <br />
          <Grid container justify="flex-end">
              <Grid item>
                <Link to={"/customer/home"} style={{textDecoration: "none"}}>
                  <Button variant="outlined" color="primary" size="large" disabled={!this.state.restaurant.information.open || this.state.subtotal === 0} onClick={this.addToCart}>
                    Add to Cart
                  </Button>
                </Link>
              </Grid>
          </Grid>
        </div>
      </div>
    ) : <div>This restaurant is not available</div>
  }
}

export default DisplayRestaurant;