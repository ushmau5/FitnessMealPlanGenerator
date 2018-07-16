package com.fyp.Entity;

import java.util.Map;

public class MealPlan {

    private Map<Integer, Meal> mealPlan;
    private int numberOfMeals;
    private double calories = 0;
    private double protein = 0;
    private double carbs = 0;
    private double fats = 0;

    /**
     * Default constructor
     * @param mealPlan
     */
    public MealPlan(Map<Integer, Meal> mealPlan) {
        this.mealPlan = mealPlan;
        numberOfMeals = mealPlan.size();
        calculateTotals();
    }

    /**
     * Empty constructor
     */
    public MealPlan() {}

    public void calculateTotals() {
        calories = 0;
        protein = 0;
        carbs = 0;
        fats = 0;
        for (Map.Entry<Integer, Meal> mealEntry : mealPlan.entrySet()) {
            calories += mealEntry.getValue().getCalories();
            protein += mealEntry.getValue().getProtein();
            carbs += mealEntry.getValue().getCarbs();
            fats += mealEntry.getValue().getFats();
        }
    }

    public Map<Integer, Meal> getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(Map<Integer, Meal> mealPlan) {
        this.mealPlan = mealPlan;
        calculateTotals();
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public int getNumberOfMeals() {
        return numberOfMeals;
    }

    public void setNumberOfMeals(int numberOfMeals) {
        this.numberOfMeals = numberOfMeals;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }
}
