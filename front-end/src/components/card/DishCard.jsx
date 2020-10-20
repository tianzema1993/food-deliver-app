import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Grid
      } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import "./Card.css";
const axios = require('axios').default;

class DishCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number : 0
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.removeDish = this.removeDish.bind(this);
  }

  handleAdd() {
    this.setState({number: this.state.number + 1});
    this.props.addDish("add", this.props.dish);
  }

  handleMinus() {
    this.setState({number: this.state.number - 1});
    this.props.addDish("minus", this.props.dish);
  }

  removeDish() {
    axios.post("/api/restaurant/removeDish", {
      restaurantId : this.props.currentUser.id,
      dish : this.props.dish
    }).then(
      response => {
        this.props.getAllDishes();
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.props.dish && this.props.currentUser ? (
      <Card>
        <CardHeader
          style={{backgroundColor: "#FAFAD2", height: "30px"}}
          titleTypographyProps={{variant:'body1'}}
          title={this.props.dish.dishName}
          subheader={"$ " + this.props.dish.price}
        />
        <img className="dishCardImage" src= {this.props.dish.imageUrl} alt={this.props.dish.dishName} />
        <CardActions style={{backgroundColor: "#e6f7ff"}}>
          {this.props.currentUser.type !== "restaurant" ?
          <Grid container justify="center" alignItems="center">
            <IconButton disabled={this.state.number === 0} onClick={this.handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{this.state.number}</Typography>
            <IconButton onClick={this.handleAdd}>
              <AddIcon />
            </IconButton>
          </Grid> : 
          <Grid container justify="center" alignItems="center">
            <IconButton onClick={this.removeDish}>
              <DeleteIcon />
            </IconButton>
          </Grid>
          }
        </CardActions>
      </Card>
    ) : <div />;
  }
}

export default DishCard;