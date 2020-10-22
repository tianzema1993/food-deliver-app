import React from 'react';
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider
}
from '@material-ui/core';

class RestaurantBar extends React.Component {
  render() {
    return (
      <div>
        <br />
        <h3><b><i>Restaurant ToolBar</i></b></h3>
        <br />
        <List component="nav">
          <Link to={"/restaurant/home"} className="link">
            <ListItem>
              <ListItemText primary={"Home Page"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/restaurant/information"} className="link">
            <ListItem>
              <ListItemText primary={"Restaurant Information"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/restaurant/menu"} className="link">
            <ListItem>
              <ListItemText primary={"Menu"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/restaurant/order"} className="link">
            <ListItem>
              <ListItemText primary={"My Active Orders"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/restaurant/history"} className="link">
            <ListItem>
              <ListItemText primary={"My Order History"} />
            </ListItem>
            <Divider />
          </Link>
        </List>
      </div>
    );
  }
}

export default RestaurantBar;