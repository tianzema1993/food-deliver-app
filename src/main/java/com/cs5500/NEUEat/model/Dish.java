package com.cs5500.NEUEat.model;

import java.util.Objects;

public class Dish {

  private String dishName;
  private double price;
  private String imageUrl;

  public Dish() {
  }

  public Dish(String dishName, double price, String imageUrl) {
    this.dishName = dishName;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  public String getDishName() {
    return dishName;
  }

  public void setDishName(String dishName) {
    this.dishName = dishName;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Dish)) {
      return false;
    }
    Dish dish = (Dish) o;
    return Double.compare(dish.getPrice(), getPrice()) == 0 &&
        getDishName().equals(dish.getDishName()) &&
        getImageUrl().equals(dish.getImageUrl());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getDishName(), getPrice(), getImageUrl());
  }

  @Override
  public String toString() {
    return "Dish{" +
        "dishName='" + dishName + '\'' +
        ", price=" + price +
        ", imageUrl='" + imageUrl + '\'' +
        '}';
  }
}
