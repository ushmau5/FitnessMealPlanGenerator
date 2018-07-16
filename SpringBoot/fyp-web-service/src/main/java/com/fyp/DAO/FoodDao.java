package com.fyp.DAO;

import com.fyp.Entity.FakeData;
import com.fyp.Entity.Food;
import com.fyp.Repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class FoodDao{

    @Autowired
    FoodRepository foodRepository;

    public Map<String,Food> getFoodFromOffline() {
        FakeData fakeData = new FakeData();
        return fakeData.getFoods();
    }

    public List<Food> getAllFoodFromDatabase() {
        return foodRepository.findAll();
    }

}
