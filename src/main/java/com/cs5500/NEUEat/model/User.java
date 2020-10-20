package com.cs5500.NEUEat.model;

import org.springframework.data.annotation.Id;

public class User {

  @Id
  private String id;
  private String userName;
  private String password;
  private String phoneNumber;
  private String address;
  private String city;
  private String state;
  private String zip;
  private String type;

  public User() {
  }

  public User(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    this.userName = userName;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  @Override
  public String toString() {
    return "User{" +
        "id='" + id + '\'' +
        ", userName='" + userName + '\'' +
        ", password='" + password + '\'' +
        ", phoneNumber='" + phoneNumber + '\'' +
        ", address='" + address + '\'' +
        ", city='" + city + '\'' +
        ", state='" + state + '\'' +
        ", zip='" + zip + '\'' +
        ", type='" + type + '\'' +
        '}';
  }
}
