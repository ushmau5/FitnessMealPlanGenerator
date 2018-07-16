package com.fyp.DAO;


import com.fyp.Entity.FakeData;
import com.fyp.Entity.Meal;
import com.fyp.Entity.MealPlan;
import com.fyp.Repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
public class MealDao {

    @Autowired
    MealRepository mealRepository;

    private static FakeData fakeData = new FakeData();

    /**
     * Get list of meals from FakeData
     * @return
     */
    public Map<Integer, Meal> getAllMealsFromOffline() {
        return fakeData.getMeals();
    }

    /**
     * Return a list of all meals from the repository
     * @return
     */
    public List<Meal> getAllMealsFromDatabase() {
        return mealRepository.findAll();
    }

    /**
     * Find meal by its DB index value
     * @param mealId
     * @return
     */
    public Meal findById(Integer mealId) {
       return mealRepository.findOne(mealId);
    }


    /**
     * find meal and add userId to like set
     * @param mealId
     * @param userId
     */
    public boolean likeMeal(Integer mealId, String userId) {
        Meal meal = mealRepository.findOne(mealId);
        meal.getLikes().add(userId);
        mealRepository.save(meal);
        return true;
    }

}
