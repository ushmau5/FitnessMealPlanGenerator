package com.fyp.Config;

import com.fyp.Entity.FakeData;
import com.fyp.Entity.Food;
import com.fyp.Entity.Meal;
import com.fyp.Repository.FoodRepository;
import com.fyp.Repository.MealRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.Map;

@EnableMongoRepositories(basePackageClasses = { FoodRepository.class, MealRepository.class })
@Configuration
public class MongoDBConfig {


    /** Push foods
    @Bean
    CommandLineRunner commandLineRunner(FoodRepository foodRepository) {
        return args -> {
            // save foods to repository
            FakeData fakeData = new FakeData();
            for (Map.Entry<String, Food> entry : fakeData.getFoods().entrySet()) {
                foodRepository.save(entry.getValue());
            }
        };
    }
     **/

   /**
    @Bean
    CommandLineRunner commandLineRunner(MealRepository mealRepository) {
        return args -> {
            // save meals to repository
            FakeData fakeData = new FakeData();
            for (Map.Entry<Integer, Meal> entry : fakeData.getMeals().entrySet()) {
                mealRepository.save(entry.getValue());
            }
        };
    }
    **/

}

