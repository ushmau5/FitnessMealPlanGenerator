package com.fyp.Controller;

import com.fyp.Entity.Meal;
import com.fyp.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meal")
public class MealController {

    @Autowired
    private MealService mealService;

    /**
     * Add userId to the set containing users that like the meal.
     * - If the meal is already liked your uid is removed and meal is un-liked
     * @param mealId
     * @param userId
     */
    @RequestMapping(value = "{id}/like", method = RequestMethod.POST)
    public boolean likeMeal(
            @PathVariable("id") Integer mealId,
            @RequestBody String userId) {
        return mealService.likeMeal(mealId, userId);
    }

    /**
     * Return a list of meals similar to meal indexed by mealId
     * @param mealId
     * @return
     */
    @RequestMapping(value = "{id}/similar", method = RequestMethod.GET)
    public List<Meal> getSimilarMeals(@PathVariable("id") Integer mealId) {
        return mealService.getSimilarMeals(mealId);
    }

}
