package com.cs5500.NEUEat.service;

import com.cs5500.NEUEat.model.Comment;
import com.cs5500.NEUEat.model.Dish;
import com.cs5500.NEUEat.model.Restaurant;
import com.cs5500.NEUEat.model.RestaurantInfo;
import com.cs5500.NEUEat.repository.RestaurantRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServiceImpl implements RestaurantService, UserService<Restaurant> {

  @Autowired
  RestaurantRepository restaurantRepository;
  PasswordService passwordService = new PasswordService();


  @Override
  public int addDish(String id, Dish dish) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      Set<Dish> set;
      if (restaurant.get().getMenu() == null) {
        set = new HashSet<>();
      } else {
        set = new HashSet<>(restaurant.get().getMenu());
      }
      set.add(dish);
      restaurant.get().setMenu(new ArrayList<>(set));
      restaurantRepository.save(restaurant.get());

      System.out.println("Add the dish");
      return 1;
    }
    System.out.println("Can't add the dish");
    return -1;
  }

  @Override
  public int removeDish(String id, Dish dish) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      List<Dish> temp = restaurant.get().getMenu();
      if (temp.contains(dish)) {
        temp.remove(dish);
        restaurant.get().setMenu(temp);
        restaurantRepository.save(restaurant.get());

        System.out.println("Remove the dish");
        return 1;
      } else {
        System.out.println("Dish not in the menu");
        return 0;
      }
    }
    System.out.println("Can't remove the dish");
    return -1;
  }

  @Override
  public List<Dish> getAllDishes(String id) {
    Optional<Restaurant> restaurant = this.getUser(id);
    System.out.println("Get all dishes from restaurant: " + id);
    return restaurant.map(Restaurant::getMenu).orElse(null);
  }

  @Override
  public RestaurantInfo getInformation(String id) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      System.out.println("Get the restaurant information");
      if (restaurant.get().getInformation() == null) {
        return new RestaurantInfo();
      } else {
        return restaurant.get().getInformation();
      }
    }
    return null;
  }

  @Override
  public int updateInfo(String id, RestaurantInfo info) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {

      restaurant.get().setInformation(info);
      restaurantRepository.save(restaurant.get());
      System.out.println("Update the information");
      return 1;
    }
    System.out.println("Can't update the information");
    return -1;
  }

  @Override
  public Restaurant addUser(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    if (this.getUserIdByName(userName) == null) {
      String newPassword = passwordService.generatePassword(password);
      Restaurant restaurant = new Restaurant(userName, newPassword, phoneNumber, address, city,
          state,
          zip);
      restaurantRepository.insert(restaurant);
      System.out.println("Restaurant added to the database");
      return restaurant;
    }
    System.out.println("Restaurant can't be added to the database");
    return null;
  }

  @Override
  public int deleteUser(String id) {
    if (this.getUser(id).isPresent()) {
      restaurantRepository.deleteById(id);
      System.out.println("Restaurant deleted from the database");
      return 1;
    }
    System.out.println("Restaurant can't be deleted from the database");
    return -1;
  }

  @Override
  public Optional<Restaurant> getUser(String id) {
    if (id != null) {
      return restaurantRepository.findById(id);
    }
    return Optional.empty();
  }

  @Override
  public String getUserIdByName(String userName) {
    List<Restaurant> restaurants = this.getUsers();
    for (Restaurant restaurant : restaurants) {
      if (restaurant.getUserName().equals(userName)) {
        return restaurant.getId();
      }
    }
    System.out.println("Given userName doesn't found in restaurant database");
    return null;
  }

  @Override
  public Optional<Restaurant> getUserByName(String userName) {
    return this.getUser(getUserIdByName(userName));
  }

  @Override
  public List<Restaurant> getUsers() {
    return restaurantRepository.findAll();
  }

  @Override
  public boolean passwordMatch(String id, String password) {
    Optional<Restaurant> restaurant = this.getUser(id);
    return restaurant.isPresent() && passwordService
        .passwordMatch(password, restaurant.get().getPassword());
  }

  @Override
  public int updatePassword(String id, String oldPassword, String newPassword) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      if (this.passwordMatch(id, oldPassword)) {
        restaurant.get().setPassword(passwordService.generatePassword(newPassword));
        restaurantRepository.save(restaurant.get());
        System.out.println("Update the password");
        return 1;
      } else {
        System.out.println("Password doesn't match");
        return 0;
      }
    }
    System.out.println("Can't update the password");
    return -1;
  }

  @Override
  public int updatePhoneNumber(String id, String newNumber) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      restaurant.get().setPhoneNumber(newNumber);
      restaurantRepository.save(restaurant.get());
      System.out.println("Update the phone number");
      return 1;
    }
    System.out.println("Can't update the phone number");
    return -1;
  }

  @Override
  public int updateAddress(String id, String address, String city, String state,
      String zip) {
    Optional<Restaurant> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      restaurant.get().setAddress(address);
      restaurant.get().setCity(city);
      restaurant.get().setState(state);
      restaurant.get().setZip(zip);
      restaurantRepository.save(restaurant.get());
      System.out.println("Update the address");
      return 1;
    }
    System.out.println("Can't update the address");
    return -1;
  }
}
