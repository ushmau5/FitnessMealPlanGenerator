package com.fyp;

import com.fyp.Entity.Food;
import com.fyp.Entity.Meal;
import com.fyp.Entity.MealPlan;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class HelperMethods {

    /**
     *
     * @param val
     * @param decimalPlaces
     * @return
     */
    public static double roundDoubleTo(double val, double decimalPlaces) {
        int scalingFactor = (int) Math.pow(10, decimalPlaces);
        return (double) Math.round(val * scalingFactor) / scalingFactor;
    }


    /**
     * Method to generate meal plan based on preferences
     * @param calories
     * @param foodPreferenceArray
     * @param allMeals
     * @return
     */
    public static MealPlan calculateMealPlan(
            int calories,
            List<ConcurrentHashMap<String, Food>> foodPreferenceArray,
            List<Meal> allMeals
    )
    {
        MealPlan mealPlan = new MealPlan();
        Map<Integer, Meal> mealsForMealPlan = new HashMap<>();

        int mealNum = 1; // used to keep track of lists of viable meals
        // For current list of food preferences for this meal
        for (ConcurrentHashMap<String, Food> foodPreferencesForMeal : foodPreferenceArray) {
            if (foodPreferencesForMeal != null) {

                // For the current food from the meal preference
                for (Map.Entry<String, Food> foodPrefEntry : foodPreferencesForMeal.entrySet()) {
                    Collections.shuffle(allMeals); // to void meals being the same if food preferences are the same.
                    Meal mealContainingFood = new Meal();
                    // For the current meal
                    for (Meal meal : allMeals) {
                        // For the current food in the meal
                        for (Map.Entry<String, Food> foodEntry : meal.getMealFoods().entrySet()) {
                            if ( foodEntry.getKey().equalsIgnoreCase(foodPrefEntry.getKey()) ) {
                                mealContainingFood = meal;
                            }
                        }
                    }
                    mealsForMealPlan.put(mealNum, mealContainingFood);
                    mealNum++;
                    break; // jump out of loop once a suitable meal has been found
                }
            }
        }
        scaleServingSizes(calories, mealsForMealPlan);
        mealPlan.setMealPlan(mealsForMealPlan);
        mealPlan.calculateTotals();
        mealPlan.setNumberOfMeals(mealsForMealPlan.size());
        return mealPlan;
    }

    /**
     * Generate random meal plan
     * @param calories
     * @param numberOfMeals
     * @param allMeals
     * @return
     */
    public static MealPlan calculateRandomMealPlan(
            int calories,
            int numberOfMeals,
            List<Meal> allMeals
    )
    {
        MealPlan mealPlan = new MealPlan();
        Map<Integer, Meal> mealsForMealPlan = new HashMap<>();
        int mealNum = 1; // used to keep track of lists of viable meals

        for (int i = 0; i < numberOfMeals; i ++) {
            Collections.shuffle(allMeals);
            mealsForMealPlan.put(mealNum, allMeals.get(0));
            mealNum++;
        }

        scaleServingSizes(calories, mealsForMealPlan);
        mealPlan.setMealPlan(mealsForMealPlan);
        mealPlan.calculateTotals();
        mealPlan.setNumberOfMeals(mealsForMealPlan.size());
        return mealPlan;
    }

    /**
     * Scale the serving sizes based on the calories and meals for the day.
     * @param mealsForMealPlan
     */
    public static void scaleServingSizes(int calories, Map<Integer, Meal> mealsForMealPlan) {
        int numOfMeals = mealsForMealPlan.size();
        double calsPerMeal = calories / numOfMeals;

        for (Map.Entry<Integer, Meal> mealEntry : mealsForMealPlan.entrySet()) {
            double calsPerFood = calsPerMeal / (mealEntry.getValue().getMealFoods().size());
            for (Map.Entry<String, Food> foodEntry : mealEntry.getValue().getMealFoods().entrySet()) {
                double servingSize = (calsPerFood / foodEntry.getValue().getCalories());
                foodEntry.getValue().setServing(HelperMethods.roundDoubleTo(servingSize, 1));
            }
            // Calculate the new totals
            mealEntry.getValue().calculateTotals();
        }
    }



}
