package com.cs5500.NEUEat.controller;

import com.cs5500.NEUEat.exception.CommentAlreadyExistException;
import com.cs5500.NEUEat.exception.OrderAlreadyCheckoutException;
import com.cs5500.NEUEat.exception.OrderAlreadyDeliverException;
import com.cs5500.NEUEat.exception.OrderNotExistException;
import com.cs5500.NEUEat.model.Comment;
import com.cs5500.NEUEat.model.Dish;
import com.cs5500.NEUEat.model.Order;
import com.cs5500.NEUEat.service.OrderServiceImpl;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order")
public class OrderController {

  private final OrderServiceImpl orderService;

  @Autowired
  public OrderController(OrderServiceImpl orderService) {
    this.orderService = orderService;
  }

  @PostMapping(path = "/addToCart")
  public int addOrderToCart(@RequestBody String jsonOrder) {
    JSONObject order = new JSONObject(jsonOrder);
    String customerId = order.getString("customerId");
    String restaurantId = order.getString("restaurantId");
    JSONArray shopcart = order.getJSONArray("shopcart");
    Gson gson = new Gson();
    List<Dish> list = new ArrayList<>();
    for (Object object : shopcart) {
      list.add(gson.fromJson(object.toString(), Dish.class));
    }
    return orderService.addOrderToCart(customerId, restaurantId, list);
  }

  @DeleteMapping(path = "{id}")
  public int deleteOrder(@PathVariable("id") String id)
      throws OrderNotExistException, OrderAlreadyDeliverException {
    int res = orderService.cancelOrder(id);
    if (res == 0) {
      throw new OrderNotExistException("Order doesn't exist");
    }
    if (res == -1) {
      throw new OrderAlreadyDeliverException(
          "Can't cancel order. It is either in delivery or finished");
    }
    return res;
  }

  @PostMapping(path = "/checkoutAll")
  public int checkoutUsers(@RequestBody String jsonOrders)
      throws OrderNotExistException, OrderAlreadyCheckoutException {
    JSONObject orders = new JSONObject((jsonOrders));
    JSONArray orderList = orders.getJSONArray("orders");
    Gson gson = new Gson();
    List<Order> list = new ArrayList<>();
    for (Object object : orderList) {
      list.add(gson.fromJson(object.toString(), Order.class));
    }
    int res = orderService.checkoutAll(list);
    if (res == 0) {
      throw new OrderNotExistException("Order doesn't exist");
    }
    if (res == -1) {
      throw new OrderAlreadyCheckoutException("Order already checkout");
    }
    return res;
  }

  @PostMapping(path = "/addComment")
  public int addComment(@RequestBody String jsonOrder)
      throws CommentAlreadyExistException, OrderNotExistException {
    JSONObject order = new JSONObject(jsonOrder);
    String orderId = order.getString("orderId");
    int rating = order.getInt("rating");
    String content = order.getString("content");
    int res = orderService.addComment(orderId, rating, content);
    if (res == 0) throw new CommentAlreadyExistException("Each order can only has one comment");
    if (res == -1) throw new OrderNotExistException("Order doesn't exist");
    return res;
  }

  @DeleteMapping(path = "/deleteComment/" + "{id}")
  public int deleteComment(@PathVariable("id") String id) throws OrderNotExistException {
    int res = orderService.deleteComment(id);
    if (res == -1) throw new OrderNotExistException("Order doesn't exist");
    return res;
  }

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({OrderNotExistException.class, OrderAlreadyDeliverException.class,
      OrderAlreadyCheckoutException.class, CommentAlreadyExistException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}
