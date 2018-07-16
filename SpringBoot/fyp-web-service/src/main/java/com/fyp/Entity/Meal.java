package com.fyp.Entity;

import org.springframework.data.annotation.Id;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Meal {

    @Id
    private int id;

    private Map<String, Food> mealFoods;
    private Set<String> likes; // Set of userID's that like this food
    private String name;
    private double calories = 0;
    private double protein = 0;
    private double carbs = 0;
    private double fats = 0;
    private double tanimoto = 0; // Tanimoto Coefficient used in similarity measure

    /**
     *
     * @param id - the meal id
     * @param name - the meal name
     * @param mealFoods - the foods in the meal
     */
    public Meal(int id, String name, Map<String, Food> mealFoods) {
        this.id = id;
        this.name = name;
        this.mealFoods = mealFoods;
        likes = new HashSet<>();
        calculateTotals();
    }

    /**
     * Empty constructor
     */
    public Meal() {}

    public void calculateTotals() {
        calories = 0;
        protein = 0;
        carbs = 0;
        fats = 0;
        for (Map.Entry<String, Food> foodEntry : mealFoods.entrySet()) {
            calories += foodEntry.getValue().getCalories();
            protein += foodEntry.getValue().getProtein();
            carbs += foodEntry.getValue().getCarbs();
            fats += foodEntry.getValue().getFats();
        }
    }

    public Map<String, Food> getMealFoods() {
        return mealFoods;
    }

    public void setMealFoods(Map<String, Food> mealFoods) {
        this.mealFoods = mealFoods;
        calculateTotals();
    }

    public Set<String> getLikes() {
        return likes;
    }

    public void setLikes(Set<String> likes) {
        this.likes = likes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
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

    public double getTanimoto() {
        return tanimoto;
    }

    public void setTanimoto(double tanimoto) {
        this.tanimoto = tanimoto;
    }
}
