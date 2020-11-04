import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {
  Grid, Typography
} from '@material-ui/core';
import RestaurantCard from "../../card/RestaurantCard";
import "./Customer.css";
const axios = require('axios').default;

class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      restaurants: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.findRestaurants = this.findRestaurants.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.findRestaurants(this.searchText);
  }

  findRestaurants(query) {
    if (query !== undefined && query !== "") {
      axios.get("/api/restaurant/search/" + query).then(
        response => {
          this.setState({restaurants: response.data})
        }
      ).catch(err => console.log(err));
    } else {
      axios.get("/api/restaurant/all").then(
        response => {
          let temp = response.data.filter(restaurant => restaurant.information != null && restaurant.menu != null);
          this.setState({searchText: "", restaurants: temp});
        }
      ).catch(err => console.log(err));
    }
  }

  handleChange(content) {
    this.setState(content);
  }

  handleSearch(event) {
    event.preventDefault();
    this.findRestaurants(this.state.searchText);
  }

  render() {
    return this.props.currentUser ? (
      <div>
        <Grid container justify="center">
          <Grid item>
            <Paper component="form" onSubmit={this.handleSearch} style={{width: 400, padding: '2px 4px', display: "spac"}} >
              <InputBase
                style={{marginLeft: '10px', width: 325}}
                placeholder="Search Restaurant or Food"
                value={this.state.searchText}
                onChange={event => this.handleChange({searchText: event.target.value})}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <div className="cardbody">
              <Grid container justify="space-evenly" spacing={2}>
                {this.state.restaurants && this.state.restaurants.length !== 0 ? this.state.restaurants.map(restaurant => (
                  <Grid item xs={5} key={restaurant.id}>
                    <RestaurantCard userId={this.props.currentUser.id} restaurantId={restaurant.id} restaurantInfo={restaurant.information} />
                  </Grid>
                )) : <Typography variant="h5"><i>No result matches your search, please try again...</i></Typography>}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    ) : <div />;
  }
}

export default CustomerHome;