import React from 'react';
import { Link } from "react-router-dom";
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Geocode from "react-geocode";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Divider,
  Collapse,
  Button,
  Box,
  TextField
      } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import "./Card.css";
import MapCard from "./MapCard";
const axios = require('axios').default;
Geocode.setApiKey(process.env.REACT_APP_API_KEY);
Geocode.setRegion("us");
Geocode.enableDebug();

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dict: {},
      restaurant: undefined,
      customer : undefined,
      driver: undefined,
      expanded: false,
      resAddress : "",
      cusAddress : "",
      wrongAddress : false,
      rating : 0,
      comment : ""
    }
    this.orderInfo = this.orderInfo.bind(this);
    this.fillDict = this.fillDict.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.acceptOrder = this.acceptOrder.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    this.fillDict();
    this.orderInfo();
  }

  handleChange(content) {
    this.setState(content);
  }

  handleExpandClick() {
    this.setState({expanded : !this.state.expanded});
  }

  fillDict() {
    let menu = this.props.order.content;
    let tempDict = this.state.dict;
    for (let i = 0; i < menu.length; i++) {
      if (tempDict[menu[i].dishName] === undefined) {
        tempDict[menu[i].dishName] = 1;
      } else {
        tempDict[menu[i].dishName] = tempDict[menu[i].dishName] + 1;
      }
    }
    this.setState({dict : tempDict});
  }

  orderInfo() {
    axios.get("/api/restaurant/" + this.props.order.restaurantId).then(
      response => {
        this.setState({restaurant: response.data});
        let resAddress = response.data.address + "," + response.data.city;
        Geocode.fromAddress(resAddress).then(
          res => {
            const { lat, lng } = res.results[0].geometry.location;
            this.setState({resAddress : lat + "," + lng});
          },
          error => {
            this.setState({wrongAddress : true});
          }
        );
      }
    ).catch(err => console.log(err));
    axios.get("/api/customer/" + this.props.order.customerId).then(
      response => {
        this.setState({customer: response.data});
        let cusAddress = response.data.address + "," + response.data.city;
        Geocode.fromAddress(cusAddress).then(
          res => {
            const { lat, lng } = res.results[0].geometry.location;
            this.setState({cusAddress : lat + "," + lng});
          },
          error => {
            this.setState({wrongAddress : true});
          }
        );
      }
    ).catch(err => console.log(err));
    if (this.props.order.driverId) {
      axios.get("/api/driver/" + this.props.order.driverId).then(
        response => {
          this.setState({driver: response.data});
        }
      ).catch(err => console.log(err));
    }
  }

  deleteOrder() {
    axios.delete("/api/order/" + this.props.order.id).then(
      response => {
        this.props.getOrders();
      }
    ).catch(err => console.log(err));
  }

  acceptOrder() {
    axios.post("/api/driver/accept", {
      orderId : this.props.order.id,
      driverId : sessionStorage.getItem("userId")
    }).then(
      response => {
        this.props.getOrders();
      }
    ).catch(err => console.log(err));
  }

  finishOrder() {
    axios.post("/api/driver/finish", {
      orderId : this.props.order.id
    }).then(
      response => {
        this.props.getOrders();
      }
    ).catch(err => console.log(err));
  }

  deleteComment() {
    axios.delete("/api/order/deleteComment/" + this.props.order.id).then(
      response => {
        this.props.getOrders();
      }
    ).catch(err => console.log(err));
  }

  addComment() {
    axios.post("/api/order/addComment", {
      orderId : this.props.order.id,
      rating : this.state.rating,
      content : this.state.comment
    }).then(
      response => {
        this.props.getOrders();
      }
    ).catch(err => console.log(err));
  }

  render() {
    return this.state.dict && this.state.restaurant && this.state.customer ? (
      <div>
        <Card>
          <Typography variant="body1" style={{position : "relative", backgroundColor: "#FAFAD2"}} >
            {this.props.userType === "customer" ? 
              <Link to={"/customer/restaurant/" + this.state.restaurant.id}>
                <img className="orderCardImage" src= {this.state.restaurant.information.imageUrl} alt={this.state.restaurant.information.restaurantName} />
              </Link> : null
            }
            <i><b>Order from {this.state.restaurant.information.restaurantName}</b></i>
            {this.props.userType === "customer" && !this.props.order.delivery ? (
              <IconButton size="small" style={{position : "absolute", right : "0"}} onClick={this.deleteOrder}>
                <ClearIcon />
              </IconButton>
            ) : null}
          </Typography>
          <Divider />
          <CardContent>
            {Object.keys(this.state.dict).map(key => <Typography variant="body1" color="textSecondary" component="p" key={key}><i>{key}</i> ... x {this.state.dict[key]}</Typography>)}
            <Divider />
            <br />
            <Grid container direction="column" alignItems="flex-end" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1" color="primary"><i>Subtotal : $ {this.props.order.price}</i></Typography>
              </Grid>
              {this.props.userType === "driver" && !this.props.order.delivery ? 
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" size="small" onClick={this.acceptOrder}>
                    Accept this order
                  </Button>
                </Grid> : null
              }
              {this.props.userType === "driver" && this.props.order.delivery && this.props.order.endTime === null ?
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" size="small" onClick={this.finishOrder}>
                    Finish the order
                  </Button>
                </Grid> : null
              }
            </Grid>
            <br />
            <Divider />
          </CardContent>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
          >
          <Typography><b>Check Order Status</b></Typography>
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography color="textSecondary" paragraph><i><b>From :</b></i> {this.state.restaurant.address}, {this.state.restaurant.city}, {this.state.restaurant.state}, {this.state.restaurant.zip}</Typography>
              <Typography color="textSecondary" paragraph><i><b>To :</b></i> {this.state.customer.address}, {this.state.customer.city}, {this.state.customer.state}, {this.state.customer.zip}</Typography>
              <Divider />
              <Typography color="textSecondary" paragraph><i><b>Customer contact :</b></i> {this.state.customer.phoneNumber}</Typography>
              <Typography color="textSecondary" paragraph><i><b>Restaurant contact :</b></i> {this.state.restaurant.phoneNumber}</Typography>
              {this.state.driver ? <Typography color="textSecondary" paragraph><i><b>Driver contact :</b></i> {this.state.driver.phoneNumber}</Typography> : null}
              {this.props.order.startTime === null ? (
                <Typography paragraph><i>Waiting for checking out...</i></Typography>
              ) : null}
              {this.props.order.startTime !== null && !this.props.order.delivery ? (
                <Typography paragraph><i>Waiting for a driver...</i></Typography>
              ) : null}
              {this.props.order.startTime !== null && this.props.order.delivery && this.props.order.endTime === null ? (
                <Typography paragraph><i>In delivery...</i></Typography>
              ) : null}
              {this.props.order.startTime !== null && !this.props.order.delivery ? (
                <Typography paragraph><i>Order placed at {new Date(Date.parse(this.props.order.startTime)).toLocaleString()}</i></Typography>
              ) : null}
              {this.props.order.endTime !== null ? (
                <Typography paragraph><i>Order already arrived at {new Date(Date.parse(this.props.order.endTime)).toLocaleString()}</i></Typography>
              ) : null}
              {this.props.order.startTime !== null && this.props.order.delivery && this.state.wrongAddress ? <Typography variant="body1" color="secondary">The address can't be loaded, please contact the driver for detailed route information</Typography> : null}
              {this.props.order.startTime !== null && this.props.order.delivery && !this.state.wrongAddress && this.state.resAddress && this.state.cusAddress ? <MapCard resAddress={this.state.resAddress} cusAddress={this.state.cusAddress} /> : null}
              <Divider />
              {this.props.userType === "customer" && this.props.order.endTime !== null && this.props.order.comment !== null ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={this.props.order.comment.rating} readOnly />
                  <Typography color="textSecondary" variant="body2"><i>{this.props.order.comment.content}</i></Typography>
                  <IconButton onClick={this.deleteComment}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : null}
              {this.props.userType === "customer" && this.props.order.endTime !== null && this.props.order.comment === null ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend" variant="body2"><i>Rating : </i></Typography>
                  <Rating name="simple-controlled" value={this.state.rating} onChange={event => this.handleChange({rating: event.target.value})} />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Please add your comment"
                    type="text"
                    value={this.state.comment}
                    onChange={event => this.handleChange({comment: event.target.value})}
                  />
                  <IconButton onClick={this.addComment}>
                    <AddIcon />
                  </IconButton>
                </Box>
              ) : null}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    ) : <div />;
  }
}

export default OrderCard;