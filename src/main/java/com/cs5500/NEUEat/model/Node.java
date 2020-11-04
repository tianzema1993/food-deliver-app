package com.cs5500.NEUEat.model;

import java.util.HashMap;
import java.util.Map;

public class Node {

  // childMap stores its descendent
  Map<Character, Node> childMap = new HashMap<>();
  // infoMap store restaurantId and count
  Map<String, Integer> infoMap = new HashMap<>();

  public Node() {
  }

  public void insertRestaurant(String restaurantId) {
    if (!this.infoMap.containsKey(restaurantId)) {
      this.infoMap.put(restaurantId, 1);
    } else {
      int count = this.infoMap.get(restaurantId);
      this.infoMap.put(restaurantId, count + 1);
    }
  }

  public void deleteRestaurant(String restaurantId) {
    if (this.infoMap.containsKey(restaurantId)) {
      int count = this.infoMap.get(restaurantId);
      if (count == 1) {
        this.infoMap.remove(restaurantId);
      } else {
        this.infoMap.put(restaurantId, count - 1);
      }
    }
  }
}
