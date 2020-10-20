package com.cs5500.NEUEat.repository;

import com.cs5500.NEUEat.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository()
public interface OrderRepository extends MongoRepository<Order, String> {

}
