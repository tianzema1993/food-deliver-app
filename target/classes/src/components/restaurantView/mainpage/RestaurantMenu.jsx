import React from 'react';
import {
  Grid
} from '@material-ui/core';
import DishCard from "../../card/DishCard";
import EmptyDish from '../../card/EmptyDish';
const axios = require('axios').default;

class RestaurantMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : undefined
    }
    this.getAllDishes = this.getAllDishes.bind(this);
  }

  componentDidMount() {
    this.getAllDishes();
  }

  getAllDishes() {
    axios.get("/api/restaurant/menu/" + this.props.currentUser.id).then(
      response => {
        this.setState({menu: response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.currentUser ? (
      <Grid container spacing={3} justify="space-evenly">
        {this.state.menu ? 
          (this.state.menu.map((dish, index) => (
            <Grid item xs={3} key={index}>
              <DishCard dish={dish} getAllDishes={this.getAllDishes} currentUser={this.props.currentUser} />
            </Grid>
          ))) : null
        }
        <Grid item xs={3}>
          <EmptyDish getAllDishes={this.getAllDishes} currentUser={this.props.currentUser} />
        </Grid>
      </Grid>
    ) : <div>The restaurant is not available</div>
  }
}

export default RestaurantMenu;