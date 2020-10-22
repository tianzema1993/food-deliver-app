import React from 'react';
import { Typography, Divider } from '@material-ui/core';
const axios = require('axios').default;

class RestaurantHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant : undefined
    }
    this.getRestaurant = this.getRestaurant.bind(this);
  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant() {
    let restaurantId = this.props.currentUser.id;
    axios.get("/api/restaurant/" + restaurantId).then(
      response => {
        this.setState({restaurant : response.data});
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.state.restaurant ? (
      <div>
        <Typography paragraph variant="h5">Welcome to the <i><b>NEUEat</b></i> !</Typography>
        <Typography paragraph>If you are a new user, please provide your restaurant information and menu using the links in sidebar</Typography>
        <Typography paragraph>Once you finish them, your restaurant will be visible to the customers</Typography>
        <Typography paragraph>To be noticed, you can always update them</Typography>
        <Typography paragraph>Enjoy!!!</Typography>
        <Divider />
        <br />
        <div>Restaurant Information status : 
        {this.state.restaurant.information !== null ? <Typography color="primary">verified</Typography> : <Typography color="error">empty</Typography>}
        </div>
        <br />
        <div>Menu status : 
        {this.state.restaurant.menu && this.state.restaurant.menu.length !== 0 ? <Typography color="primary">verified</Typography> : <Typography color="error">empty</Typography>}
        </div>
      </div>
    ) : <div />;
  }
}

export default RestaurantHome;