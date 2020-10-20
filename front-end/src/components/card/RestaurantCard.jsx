import React from 'react';
import { Link } from "react-router-dom";
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Collapse,
    IconButton,
    Avatar,
    Divider,
    Box
        } from "@material-ui/core";
import DirectionsIcon from '@material-ui/icons/Directions';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./Card.css";
const axios = require('axios').default;

class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments : undefined,
      expanded: false
    }
    this.findComments = this.findComments.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  componentDidMount() {
    this.findComments();
  }

  findComments() {
    axios.get("/api/restaurant/getComments/" + this.props.restaurantId).then(
      response => {
        this.setState({comments : response.data});
      }
    ).catch(err => console.log(err));
  }

  handleExpandClick() {
    this.setState({expanded : !this.state.expanded});
  }

  render() {
    return this.props.userId && this.props.restaurantId && this.props.restaurantInfo && this.state.comments ? (
      <Card>
        <CardHeader
          style={{backgroundColor: "#FAFAD2", height: "40px"}}
          avatar={
            <Avatar aria-label="recipe" style={{backgroundColor: "#FF4500"}}>
              {this.props.restaurantInfo.restaurantName.substring(0, 1)}
            </Avatar>
          }
          action={
            this.props.restaurantInfo.open ? (
              <Link to={"/customer/restaurant/" + this.props.restaurantId} className="link">
                <IconButton aria-label="settings" onClick={() => this.handleClick}>
                  <DirectionsIcon color="primary" fontSize="large" />
                </IconButton>
              </Link>
            ) : <Typography color="secondary">Closed</Typography>}
            titleTypographyProps={{variant:'h5'}}
            title={this.props.restaurantInfo.restaurantName}
        />
        <img className="photoCardImage" src= {this.props.restaurantInfo.imageUrl} alt={this.props.restaurantInfo.restaurantName} />
        <CardContent style={{backgroundColor: "#e6f7ff"}}>
          <Typography variant="body1" color="textSecondary" component="p">
            <i>{this.props.restaurantInfo.description}</i>
          </Typography>
      </CardContent>
      <IconButton
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
      >
      <Typography><b>See Comments</b></Typography>
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {this.state.comments.length > 0 ? this.state.comments.map((comment,index) => (
            <Box key={index} component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={comment.rating} readOnly />
              <Typography color="textSecondary" variant="body2"><i>{comment.content}</i></Typography>
              <Divider />
            </Box>
          )) : <Typography variant="body1" color="primary"><i>This restaurant doesn't have any comments</i></Typography>}
        </CardContent>
      </Collapse>
      </Card>
    ) : <div />;
  }
}

export default RestaurantCard;