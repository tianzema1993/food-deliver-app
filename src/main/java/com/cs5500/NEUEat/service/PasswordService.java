package com.cs5500.NEUEat.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordService {
  BCryptPasswordEncoder bCryptPasswordEncoder;

  public PasswordService() {
    bCryptPasswordEncoder = new BCryptPasswordEncoder();
  }

  public String generatePassword(String oldPassword) {
    return bCryptPasswordEncoder.encode(oldPassword);
  }

  public boolean passwordMatch(String password, String encodedPassword) {
    return bCryptPasswordEncoder.matches(password, encodedPassword);
  }
}
