<template>
  <v-container class="text-center">
    <p id="title">Daily Calorie Intake</p>
    <br />
    <v-progress-circular
      :rotate="-90"
      :size="250"
      :width="25"
      :value="percentCalories"
      color="#4BC9A1"
    >
      <div>
        <p id="calories">{{ remainingCalories }}</p>

        <p id="calorie-limit">remaining<br />of {{ goalCalories }} calories</p>
      </div>
    </v-progress-circular>
  </v-container>
</template>

<script>
export default {
  computed: {
    dailyCalories() {
      let total = 0;
      this.$store.state.dailyMeals.forEach((meal) => {
        meal.foodItems.forEach((food) => {
          total += food.calories;
        });
      });
      return total;
    },
    goalCalories() {
      return this.$store.state.profile.dailyCalories;
    },
    remainingCalories() {
      return this.goalCalories - this.dailyCalories;
    },
    percentCalories() {
      return (this.dailyCalories / this.goalCalories) * 100;
    },
  },
};
</script>

<style scoped>
#title {
  font-weight: bold;
  font-size: 16px;
}
.text-center {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 3px 3px #dedede;
}
.v-progress-circular {
  color: #4bc9a1;
}
#calories-consumed {
  margin-top: 10px;
}
#calories {
  font-weight: bold;
  font-size: 50px;
  color: #251e62;
}
#calorie-limit {
  font-size: 14px;
  color: #251e62;
}
</style>
