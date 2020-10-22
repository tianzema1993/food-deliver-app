import React from 'react';
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Divider
}
from '@material-ui/core';

class CustomerBar extends React.Component {
  render() {
    return (
      <div>
        <br />
        <h3><b><i>Customer ToolBar</i></b></h3>
        <br />
        <List component="nav">
          <Link to={"/customer/home"} className="link">
            <ListItem>
              <ListItemText primary={"Home Page"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/customer/cart"} className="link">
            <ListItem>
              <ListItemText primary={"My Shopping Cart"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/customer/orders"} className="link">
            <ListItem>
              <ListItemText primary={"My Active Orders"} />
            </ListItem>
            <Divider />
          </Link>
          <Link to={"/customer/history"} className="link">
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

export default CustomerBar;