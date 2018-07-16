package com.fyp.Entity;

import org.springframework.data.annotation.Id;

public class Food {

    @Id
    private String id;

    private String name, metric;
    private double protein, carbs, fats, calories;
    private double serving = 1.00;

    /**
     * Default constructor
     * @param id
     * @param name
     * @param serving
     * @param metric
     * @param protein
     * @param carbs
     * @param fats
     */
    public Food(String id, String name, double serving, String metric, double protein, double carbs, double fats) {
        this.id = id;
        this.name = name;
        this.serving = serving;
        this.metric = metric;
        this.protein = protein * serving;
        this.carbs = carbs * serving;
        this.fats = fats * serving;
        this.calories = (protein*4) + (carbs*4) + (fats*9);
    }

    /**
     * Empty constructor
     */
    public Food() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMetric() {
        return metric;
    }

    public void setMetric(String metric) {
        this.metric = metric;
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

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getServing() {
        return serving;
    }

    public void setServing(double serving) {
        this.serving = serving;
        reCalculateMacros();
    }

    /**
     * Re-calculate the macros, needed if serving size is changed.
     */
    private void reCalculateMacros() {
        this.protein = protein * serving;
        this.carbs = carbs * serving;
        this.fats = fats * serving;
        this.calories = (protein*4) + (carbs*4) + (fats*9);
    }

}
