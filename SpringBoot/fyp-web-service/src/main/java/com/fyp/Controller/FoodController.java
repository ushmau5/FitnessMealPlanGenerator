package com.fyp.Controller;

import com.fyp.Entity.Food;
import com.fyp.Service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;


    /**
     * Get foods from the FakeData object
     * No connection to MongoDB
     * @return
     */
    @RequestMapping(value = "/all/offline", method = RequestMethod.GET)
    public Map<String,Food> getFoodFromOffline() {
        return foodService.getFoodFromOffline();
    }

    /**
     * Returns all food documents from the food collection
     * on MongoDB
     * @return
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Map<String,Food> getAllFoodFromDatabase() {
        return foodService.getAllFoodFromDatabase();
    }

}
