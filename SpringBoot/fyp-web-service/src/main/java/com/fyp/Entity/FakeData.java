package com.fyp.Entity;

import java.util.*;

public class FakeData {

    private Map<String, Food> all_foods, meal_one, meal_two, meal_three;
    private Map<Integer, Meal> meals;
    private MealPlan mealPlan;

    public FakeData() {
        all_foods = new HashMap<>();
        meal_one = new HashMap<>();
        meal_two = new HashMap<>();
        meal_three = new HashMap<>();
        meals = new HashMap<>();

        Food chicken = new Food("CHICK-1", "Chicken", 1, "100 gram", 28, 0.3, 1.6);
        Food rice = new Food("RICE-1", "Basmati Rice", 1, "100 gram", 7.1, 79, 0.8);
        Food tuna = new Food("TUNA-1", "Tuna (John West)", 1, "100 gram", 26.4, 0, 6.8);
        Food pasta = new Food("PASTA-1", "Pasta (Penne)", 1, "100 gram", 12, 75, 1.5);
        Food oats = new Food("OATS-1", "Oats", 1, "100 gram", 16.9, 66.3, 6.9);
        Food egg = new Food("EGG-1", "Egg (Large)", 1, "1 unit", 6.3, 0.4, 4.8);

        all_foods.put(chicken.getId(), chicken);
        all_foods.put(rice.getId(), rice);
        all_foods.put(tuna.getId(), tuna);
        all_foods.put(pasta.getId(), pasta);
        all_foods.put(oats.getId(), oats);
        all_foods.put(egg.getId(), egg);


        meal_one.put(chicken.getId(), chicken);
        meal_one.put(rice.getId(), rice);

        meal_two.put(tuna.getId(), tuna);
        meal_two.put(pasta.getId(), pasta);

        meal_three.put(oats.getId(), oats);
        meal_three.put(egg.getId(), egg);


        Meal mealOne = new Meal(0, "Chicken & Rice", meal_one);
        Meal mealTwo = new Meal(1, "Tuna & Pasta", meal_two);
        Meal mealThree = new Meal(2, "Oats & Eggs", meal_three);

        Set<String> mealOneLikes = new HashSet<>();
        Set<String> mealTwoLikes = new HashSet<>();
        Set<String> mealThreeLikes = new HashSet<>();

        for (int i = 0; i < 400; i ++) {
            String id = UUID.randomUUID().toString();
            boolean probability = false;
            probability = new Random().nextInt(2) == 0; // 50% chance of true
            if (probability) mealOneLikes.add(id);
            probability = new Random().nextInt(2) == 0; // 50% chance of true
            if (probability) mealTwoLikes.add(id);
            probability = new Random().nextInt(2) == 0; // 50% chance of true
            if (probability) mealThreeLikes.add(id);
        }

        mealOne.setLikes(mealOneLikes);
        mealTwo.setLikes(mealTwoLikes);
        mealThree.setLikes(mealThreeLikes);

        meals.put(mealOne.getId(), mealOne);
        meals.put(mealTwo.getId(), mealTwo);
        meals.put(mealThree.getId(), mealThree);

        mealPlan = new MealPlan(meals);
    }

    public MealPlan getMealPlan() {
        return this.mealPlan;
    }

    public Map<String,Food> getFoods() {
        return this.all_foods;
    }

    public Map<Integer, Meal> getMeals() { return this.meals; }

}
