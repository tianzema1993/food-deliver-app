package com.cs5500.NEUEat.service;


import java.util.List;
import java.util.Optional;

public interface UserService<T> {

  T addUser(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip);

  int deleteUser(String id);

  Optional<T> getUser(String id);

  String getUserIdByName(String userName);

  Optional<T> getUserByName(String userName);

  List<T> getUsers();

  boolean passwordMatch(String id, String password);

  int updatePassword(String id, String oldPassword, String newPassword);

  int updatePhoneNumber(String id, String newNumber);

  int updateAddress(String id, String address, String city, String state, String zip);
}
