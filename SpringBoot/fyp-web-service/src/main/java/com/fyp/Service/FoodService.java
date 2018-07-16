package com.fyp.Service;

import com.fyp.DAO.FoodDao;
import com.fyp.Entity.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FoodService {

    @Autowired
    private FoodDao foodDao;

    /**
     * RQ allFood from FakeData
     * @return
     */
    public Map<String,Food> getFoodFromOffline() {
        return foodDao.getFoodFromOffline();
    }

    /**
     * RQ All Foods from MongoDB
     * Convert List of Foods to a HashMap with food id as the key
     * @return
     */
    public Map<String,Food> getAllFoodFromDatabase() {
        List<Food> allFoodList = foodDao.getAllFoodFromDatabase();
        Map<String,Food> allFoodMap = new HashMap<>();

        for (Food food : allFoodList) {
            allFoodMap.put(food.getId(), food);
        }
        return allFoodMap;
    }

}
