import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

if (currentToken != null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
    state: {
        token: currentToken || "",
        user: currentUser || {},
        profile: {},
        dailyMeals: [],
        breakfast: {},
        lunch: {},
        dinner: {},
        snacks: {},
        // Add call for the recentMeals method in server
        recentMeals: [],
        // Whichever week is on the current calendar view
        activeWeek: [],
        dailyHydration: {
            userId: 0,
            hydrationTotal: 0,
            numGlasses: 0
        },
        weeklyMeals: [],
        weeklyHydration: [],
    },
    mutations: {
        SET_AUTH_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        SET_PROFILE(state, payload) {
            state.profile = payload;
        },
        SET_DAILY_HYDRATION(state, payload) {
            state.dailyHydration = payload;
        },
        LOGOUT(state) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.token = "";
            state.user = {};
            axios.defaults.headers.common = {};
            state.profile = {};
            state.dailyMeals = [];
            state.breakfast = {};
            state.lunch = {};
            state.dinner = {};
            state.snacks = {};
            state.recentMeals = [];
            state.activeWeek = [];
            state.dailyHydration = {
                userId: 0,
                hydrationTotal: 0,
                numGlasses: 0
            };
            state.weeklyMeals = [];
            state.weeklyHydration = [];
        },
        SET_DAILY_MEALS(state, payload) {
            payload.forEach((element) => {
                if (element.mealType == "Breakfast") {
                    state.breakfast = element;
                }
                if (element.mealType == "Lunch") {
                    state.lunch = element;
                }
                if (element.mealType == "Dinner") {
                    state.dinner = element;
                }
                if (element.mealType == "Snack") {
                    state.snacks = element;
                }
            });
            state.dailyMeals = payload;
        },
        ADD_MEAL(state, payload) {
            state.dailyMeals.push(payload);
        },
        SET_WEEKLY_MEALS(state, payload) {
            state.weeklyMeals.push(payload);
        },
        SET_WEEKLY_HYDRATION(state, payload) {
            state.weeklyHydration.push(payload);
        },
    },
});
