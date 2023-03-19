<template>
  <v-container class="home">
    <h1>
      Hello {{ profile.firstName }},<br />
      Welcome Back!
    </h1>
    <br />
    <weekly-summary />
    <daily-summary />
    <hydration-summary />
  </v-container>
</template>

<script>
import DailySummary from "../components/DailySummary.vue";
import HydrationSummary from "../components/HydrationSummary.vue";
import WeeklySummary from "../components/WeeklySummary.vue";
import FoodService from "../services/FoodService.js";
import UserService from "../services/UserService.js";

export default {
  name: "home",
  components: {
    WeeklySummary,
    DailySummary,
    HydrationSummary,
  },
  data() {
    return {
      user: {},
      profile: {},
      today: this.currentDate(),
    };
  },
  methods: {
    currentDate() {
      let current = new Date();

      let date = `${current.getFullYear()}-${(current.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`;
      return date;
    },
  },
  created() {
    this.user = this.$store.state.user;

    UserService.getProfile().then((response) => {
      this.$store.commit("SET_PROFILE", response.data);
      this.profile = this.$store.state.profile;
    });

    FoodService.getTodaysMeals(this.today).then((response) => {
      this.$store.commit("SET_DAILY_MEALS", response.data);
    });

    if (this.$store.state.weeklyMeals.length == 0) {
      FoodService.getWeeklyMealsData(1).then((response) => {
        this.$store.commit("SET_WEEKLY_MEALS", response.data);
        FoodService.getWeeklyMealsData(2).then((response) => {
          this.$store.commit("SET_WEEKLY_MEALS", response.data);
          FoodService.getWeeklyMealsData(3).then((response) => {
            this.$store.commit("SET_WEEKLY_MEALS", response.data);
            FoodService.getWeeklyMealsData(4).then((response) => {
              this.$store.commit("SET_WEEKLY_MEALS", response.data);
            });
          });
        });
      });
    }

    if (this.$store.state.weeklyHydration.length == 0) {
      FoodService.getWeeklyHydrationData(1).then((response) => {
        this.$store.commit("SET_WEEKLY_HYDRATION", response.data);
        FoodService.getWeeklyHydrationData(2).then((response) => {
          this.$store.commit("SET_WEEKLY_HYDRATION", response.data);
          FoodService.getWeeklyHydrationData(3).then((response) => {
            this.$store.commit("SET_WEEKLY_HYDRATION", response.data);
            FoodService.getWeeklyHydrationData(4).then((response) => {
              this.$store.commit("SET_WEEKLY_HYDRATION", response.data);
            });
          });
        });
      });
    }
  },
};
</script>

<style scoped></style>
