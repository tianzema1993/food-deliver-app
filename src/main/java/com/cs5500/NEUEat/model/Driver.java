package com.cs5500.NEUEat.model;

public class Driver extends User {

  public Driver() {
    this.setType("driver");
  }

  public Driver(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("driver");
  }
}
