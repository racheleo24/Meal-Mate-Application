import axios from "axios";

export default {
    saveFood(mealId, food) {
        return axios.post(`/add-food/${mealId}`, food);
    },

    addMeal(meal) {
        return axios.post("/add-meal", meal);
    },

    getTodaysMeals(date) {
        return axios.get(`/get-meals-by-day?day=${date}`);
    },

    changeHydrationAmount(hydration) {
        return axios.put("/change-hydration", hydration);

    },

    getWeeklyMealsData(weekId) {
        return axios.get(`get-meals-for-week?weekId=${weekId}`);
    },

    getWeeklyHydrationData(weekId) {
        return axios.get(`/get-hydration-for-week?weekId=${weekId}`);
    }
}
