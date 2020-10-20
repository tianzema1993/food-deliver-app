package com.cs5500.NEUEat.service;

import com.cs5500.NEUEat.model.Comment;
import com.cs5500.NEUEat.model.Dish;
import com.cs5500.NEUEat.model.Order;
import java.util.List;
import java.util.Optional;

public interface OrderService {

  int addOrderToCart(String customerId, String restaurantId, List<Dish> content);

  // Order can only be canceled when in cart or not in delivery
  int checkoutOrder(String id);

  // checkout all orders in the shopping cart
  int checkoutAll(List<Order> orders);

  int cancelOrder(String id);

  Optional<Order> getOrder(String id);

  // Driver accept the order, the order can only be accepted if it already started and not in delivery
  int acceptOrder(String id, String driverId);

  // Driver finish the order, the order can only be finished if it is in delivery and not finished
  int finishOrder(String id);

  // Customer check orders in the cart
  List<Order> customerCart(String customerId);

  // Customer check all active orders, no matter there is or isn't a driver and the order isn't finished
  List<Order> customerGetActiveOrders(String customerId);

  // Customer check order history
  List<Order> customerFindPastOrders(String customerId);

  // Driver check all orders that waiting for a driver
  List<Order> getAllPendingOrders();

  // Driver get current order
  Order driverGetActiveOrder(String driverId);

  // Driver check order history
  List<Order> driverFindPastOrders(String driverId);

  // Restaurant check all active orders, no matter there is or isn't a driver
  List<Order> restaurantGetActiveOrders(String restaurantId);

  // Restaurant check order history
  List<Order> restaurantFindPastOrders(String restaurantId);

  int addComment(String id, int rating, String content);

  int deleteComment(String id);

  List<Comment> restaurantGetComments(String restaurantId);
}
