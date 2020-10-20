package com.cs5500.NEUEat.repository;

import com.cs5500.NEUEat.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository()
public interface CustomerRepository extends MongoRepository<Customer, String> {

}
