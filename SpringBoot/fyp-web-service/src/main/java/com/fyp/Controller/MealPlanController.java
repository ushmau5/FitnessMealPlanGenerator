package com.fyp.Controller;

import com.fyp.Entity.Food;
import com.fyp.Entity.MealPlan;
import com.fyp.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/mealplan")
public class MealPlanController {

    @Autowired
    private MealService mealService;


    /**
     * Get MealPlan from FakeData - used for testing
     * @param calories
     * @param numberOfMeals
     * @param foodPreferencesArray
     * @return
     */
    @RequestMapping(value = "/{calories}/{numberOfMeals}/offline", method = RequestMethod.POST)
    public MealPlan getMealPlanFromOffline(
            @PathVariable("calories") int calories,
            @PathVariable("numberOfMeals") int numberOfMeals,
            @RequestBody List<HashMap<String, Food>> foodPreferencesArray) {
        return mealService.getMealPlanFromOffline();
    }

    /**
     * Get MealPlan from MongoDB based on food preferences
     * NOTE: ConcurrentHashMap automatically excludes null entries and is used over HashMap
     * @param calories
     * @param numberOfMeals
     * @param foodPreferencesArray
     * @return
     */
    @RequestMapping(value = "/{calories}/{numberOfMeals}", method = RequestMethod.POST)
    public MealPlan getMealPlanFromDatabase(
            @PathVariable("calories") int calories,
            @PathVariable("numberOfMeals") int numberOfMeals,
            @RequestBody List<ConcurrentHashMap<String, Food>> foodPreferencesArray) {
        return mealService.getMealPlanFromDatabase(calories, foodPreferencesArray);
    }

    /**
     * Generate a random MealPlan from meals in MongoDB
     * @param calories
     * @param numberOfMeals
     * @return
     */
    @RequestMapping(value = "/random/{calories}/{numberOfMeals}", method = RequestMethod.GET)
    public MealPlan getRandomMealPlanFromDatabase(
            @PathVariable("calories") int calories,
            @PathVariable("numberOfMeals") int numberOfMeals) {
        // Using numberOfMeals - 1  as number seems to be one above what it should be
        // Front end changes could have major complications
        return mealService.getRandomMealPlanFromDatabase(calories, (numberOfMeals-1));
    }

}
