import React from 'react';
import {
  Typography, Grid, Menu, MenuItem, IconButton, Button, Dialog, TextField
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
const axios = require('axios').default;

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      warnOpen: false,
      resetFailed : "",
      dropFailed : "",
      passwordDialogOpen : false,
      phoneDialogOpen : false,
      addressDialogOpen : false,
      oldPassword: "",
      newPassword: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zip: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openWarnDialog = this.openWarnDialog.bind(this);
    this.closeWarn = this.closeWarn.bind(this);
    this.openPasswordDialog = this.openPasswordDialog.bind(this);
    this.closePasswordDialog = this.closePasswordDialog.bind(this);
    this.openPhoneDialog = this.openPhoneDialog.bind(this);
    this.closephoneDialog = this.closephoneDialog.bind(this);
    this.openAddressDialog = this.openAddressDialog.bind(this);
    this.closeAddressDialog = this.closeAddressDialog.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.resetPhone = this.resetPhone.bind(this);
    this.resetAddress = this.resetAddress.bind(this);
    this.logout = this.logout.bind(this);
    this.dropAccount = this.dropAccount.bind(this);
  }

  handleChange(content) {
    this.setState(content);
  }

  openMenu(event) {
    this.setState({anchorEl: event.currentTarget});
  }

  closeMenu() {
    this.setState({anchorEl: null});
  }

  openWarnDialog() {
    this.setState({warnOpen: true, anchorEl: null});
  }

  closeWarn() {
    this.setState({warnOpen: false, dropFailed : ""});
  }

  openPasswordDialog() {
    this.setState({passwordDialogOpen: true, anchorEl: null});
  }

  closePasswordDialog() {
    this.setState({passwordDialogOpen: false, oldPassword : "", newPassword : "", resetFailed : ""});
  }

  openPhoneDialog() {
    this.setState({phoneDialogOpen: true, anchorEl: null});
  }

  closephoneDialog() {
    this.setState({phoneDialogOpen: false, phoneNumber : ""});
  }

  openAddressDialog() {
    this.setState({addressDialogOpen: true, anchorEl: null});
  }

  closeAddressDialog() {
    this.setState({addressDialogOpen: false, address: "", city: "", state: "", zip: ""});
  }

  logout() {
    this.setState({anchorEl: null});
    this.props.logoutUser();
  }

  dropAccount(event) {
    event.preventDefault();
    let type = this.props.currentUser.type;
    axios.delete("/api/" + type + "/" + this.props.currentUser.id).then(
      response => {
        this.closeWarn();
        this.logout();
        console.log("Successfully delete the user");
      }
    ).catch(err => {
      this.setState({dropFailed : err.response.data});
      console.log(err.response.data);
    });
  }

  resetPassword(event) {
    event.preventDefault();
    let type = this.props.currentUser.type;
    axios.post("/api/" + type + "/resetPassword", {
      id : this.props.currentUser.id,
      password : this.state.oldPassword,
      newPassword : this.state.newPassword
    }).then(
      response => {
        this.closePasswordDialog();
        console.log("Password update");
      }
    ).catch(err => {
      this.setState({resetFailed : err.response.data});
      console.log(err.response.data);
    });
  }

  resetPhone(event) {
    event.preventDefault();
    let type = this.props.currentUser.type;
    axios.post("/api/" + type + "/resetPhone", {
      id : this.props.currentUser.id,
      phoneNumber : this.state.phoneNumber
    }).then(
      response => {
        this.closephoneDialog();
        console.log("Phone update");
      }
    ).catch(err => {
      console.log(err);
    });
  }

  resetAddress(event) {
    event.preventDefault();
    let type = this.props.currentUser.type;
    axios.post("/api/" + type + "/resetAddress", {
      id : this.props.currentUser.id,
      address : this.state.address,
      city : this.state.city,
      state : this.state.state,
      zip : this.state.zip
    }).then(
      response => {
        this.closeAddressDialog();
        console.log("Address update");
      }
    ).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Grid container>
        <IconButton edge="end" style={{color: "white"}} aria-label="menu" onClick={this.openMenu} >
          <SettingsIcon/>
          <Typography variant="h5">My Account</Typography>
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          getContentAnchorEl={null}
          onClose={this.closeMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openPasswordDialog}>Reset Password</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openPhoneDialog}>Update Contact Information</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openAddressDialog}>Update Address</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.logout}>Logout</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openWarnDialog}>Drop My Account</MenuItem>
        </Menu>
        <Dialog open={this.state.warnOpen} onClose={this.closeWarn}>
          <div className="dialog">
            <Typography variant="h6" color="error">Warn!!!</Typography>
            <Typography variant="h6">Do you want to drop your account?</Typography>
            <Typography color="textSecondary"><i>(This will erase your order information as well)</i></Typography>
            <Typography variant="body1" color="error">
                {this.state.dropFailed}
              </Typography>
            <br />
            <Button type="submit"
                fullWidth
                variant="contained"
                color="secondary" 
                onClick={this.dropAccount} 
            >
              Yes
            </Button>
            <Button onClick={this.closeWarn}>No</Button>
          </div>
        </Dialog>
        <Dialog open={this.state.passwordDialogOpen} onClose={this.closePasswordDialog}>
          <div className="dialog">
            <form onSubmit={this.resetPassword}>
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
              <Typography variant="body1" color="error">
                {this.state.resetFailed}
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Old Password"
                  type="password"
                  value={this.state.oldPassword}
                  autoFocus
                  onChange={event => this.handleChange({oldPassword: event.target.value})}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  type="password"
                  value={this.state.newPassword}
                  onChange={event => this.handleChange({newPassword: event.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Password
              </Button>
              <Button onClick={this.closePasswordDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
        <Dialog open={this.state.phoneDialogOpen} onClose={this.closephoneDialog}>
          <div className="dialog">
            <form onSubmit={this.resetPhone}>
              <Typography component="h1" variant="h5">
                Reset Your Phone Number
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="New Phone Number"
                  type="text"
                  value={this.state.phoneNumber}
                  autoFocus
                  onChange={event => this.handleChange({phoneNumber: event.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Phone Number
              </Button>
              <Button onClick={this.closephoneDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
        <Dialog open={this.state.addressDialogOpen} onClose={this.closeAddressDialog}>
          <div className="dialog">
            <form onSubmit={this.resetAddress}>
              <Typography component="h1" variant="h5">
                Reset Your Address
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Address"
                  type="text"
                  value={this.state.address}
                  autoFocus
                  onChange={event => this.handleChange({address: event.target.value})}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="City"
                  type="text"
                  value={this.state.city}
                  onChange={event => this.handleChange({city: event.target.value})}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="State"
                  type="text"
                  value={this.state.state}
                  onChange={event => this.handleChange({state: event.target.value})}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Zip Code"
                  type="text"
                  value={this.state.zip}
                  onChange={event => this.handleChange({zip: event.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Address
              </Button>
              <Button onClick={this.closeAddressDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
      </Grid>
    );
  }
}

export default UserMenu;