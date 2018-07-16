package com.fyp.Service;

import com.fyp.DAO.MealDao;
import com.fyp.Entity.Food;
import com.fyp.Entity.Meal;
import com.fyp.Entity.MealPlan;
import com.fyp.HelperMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MealService extends HelperMethods{

    @Autowired
    private MealDao mealDao;

    /**
     * RQ MealPlan from FakeData
     *
     * @return
     */
    public MealPlan getMealPlanFromOffline() {
        MealPlan mealPlan = new MealPlan();
        mealPlan.setMealPlan(mealDao.getAllMealsFromOffline());
        mealPlan.setNumberOfMeals(2);
        mealPlan.setCalories(425);
        return mealPlan;
    }

    /**
     * Construct MealPlan using..
     * - Meal Preferences
     * - List of all meals from repo
     */
    public MealPlan getMealPlanFromDatabase(int calories, List<ConcurrentHashMap<String, Food>> foodPreferenceArray) {
        List<Meal> allMeals = mealDao.getAllMealsFromDatabase();
        return HelperMethods.calculateMealPlan(calories, foodPreferenceArray, allMeals);
    }

    /**
     * Construct random MealPlan
     */
    public MealPlan getRandomMealPlanFromDatabase(int calories, int numberOfMeals) {
        List<Meal> allMeals = mealDao.getAllMealsFromDatabase();
        return HelperMethods.calculateRandomMealPlan(calories, numberOfMeals, allMeals);
    }


    /**
     * like / un-like meal
     * @param mealId
     * @param userId
     * @return
     */
    public boolean likeMeal(Integer mealId, String userId) {
        return mealDao.likeMeal(mealId, userId);
    }

    /**
     * Get meals similar to meal in DB index by mealId using
     * - Collaborative Filtering w/ Tanimoto Co-efficient
     * @param mealId
     * @return
     */
    public List<Meal> getSimilarMeals(Integer mealId) {
        List<Meal> allMeals = mealDao.getAllMealsFromDatabase();
        Meal userInputMeal = mealDao.findById(mealId);
        List<Meal> similarMeals = new ArrayList<>();

        for (Meal meal : allMeals) {
            Set<String> likesMealA = userInputMeal.getLikes();
            Set<String> likesMealB = meal.getLikes();
            List<String> likesBoth = new ArrayList<>(likesMealA);
            likesBoth.retainAll(likesMealB); // retain all userId that are common in both lists
            double tanimotoCoefficient = (double) likesBoth.size() / (double) ((likesMealA.size() + likesMealB.size()) - likesBoth.size());

            // If they are >= 50% in similarity
            if (tanimotoCoefficient >= 0.20) {
                meal.setTanimoto(tanimotoCoefficient);
                similarMeals.add(meal);
            }
        }
        return similarMeals;
    }

}
