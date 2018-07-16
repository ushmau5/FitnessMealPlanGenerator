package com.fyp.Repository;

import com.fyp.Entity.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MealRepository extends MongoRepository<Meal, Integer>{

    @Override
    public List<Meal> findAll();

}
