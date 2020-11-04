package com.cs5500.NEUEat.repository;

import com.cs5500.NEUEat.model.SearchEngine;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SearchEngineRepository extends MongoRepository<SearchEngine, String> {

}
