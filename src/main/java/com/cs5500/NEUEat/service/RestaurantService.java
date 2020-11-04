package com.cs5500.NEUEat.service;

import com.cs5500.NEUEat.model.Comment;
import com.cs5500.NEUEat.model.Dish;
import com.cs5500.NEUEat.model.Restaurant;
import com.cs5500.NEUEat.model.RestaurantInfo;
import java.util.List;

public interface RestaurantService {

  int addDish(String id, Dish dish);

  int removeDish(String id, Dish dish);

  List<Dish> getAllDishes(String id);

  RestaurantInfo getInformation(String id);

  int updateInfo(String id, RestaurantInfo info);
}
