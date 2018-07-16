package com.fyp.Repository;

import com.fyp.Entity.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {

    @Override
    public List<Food> findAll();

}
