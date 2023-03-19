<template>
  <v-container class="main">
    <p id="title">Weekly Summary</p>
    <template id="summary">
      <div class="text-center">
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(1)"
          v-bind:class="getClass(calculatePercentage(1))"
          >Su</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(2)"
          v-bind:class="getClass(calculatePercentage(2))"
          >M</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(3)"
          v-bind:class="getClass(calculatePercentage(3))"
          >Tu</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(4)"
          v-bind:class="getClass(calculatePercentage(4))"
          >W</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(5)"
          v-bind:class="getClass(calculatePercentage(5))"
          >Th</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(6)"
          v-bind:class="getClass(calculatePercentage(6))"
          >F</v-progress-circular
        >
        <v-progress-circular
          :rotate="-90"
          :value="calculatePercentage(7)"
          v-bind:class="getClass(calculatePercentage(7))"
          >Sa</v-progress-circular
        >
      </div>
    </template>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
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
    calculatePercentage(dayOfWeek) {
      let totalCalories = 0;
      let mealIds = [];
      if (dayOfWeek == 1) {
        mealIds = [84, 85, 86];
      } else if (dayOfWeek == 2) {
        mealIds = [87, 88, 89];
      } else if (dayOfWeek == 3) {
        mealIds = [90, 91, 92];
      } else if (dayOfWeek == 4) {
        mealIds = [93, 94, 95];
      } else if (dayOfWeek == 5) {
        mealIds = [96, 97, 98];
      } else {
        mealIds = [];
      }
      this.$store.state.weeklyMeals[3].forEach((meal) => {
        if (
          meal.mealId == mealIds[0] ||
          meal.mealId == mealIds[1] ||
          meal.mealId == mealIds[2]
        ) {
          meal.foodItems.forEach((food) => {
            return (totalCalories += food.calories);
          });
        }
      });
      if (totalCalories == 0) {
        return 0;
      }
      return (totalCalories / this.$store.state.profile.dailyCalories) * 100;
    },
    getClass(num) {
      if ((num > 75.0) & (num < 100.0)) {
        return "medium";
      }
      if (num > 100) {
        return "low";
      }
    },
  },
};
</script>
<style scoped>
#title {
  font-weight: bold;
  font-size: 16px;
}
.main {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  box-shadow: 3px 3px #dedede;
  /* border-bottom: 1px solid rgb(165, 165, 165); */
}
.v-progress-circular {
  margin: 0.4rem;
  color: #4bc9a1;
}
.low {
  color: red;
}
.medium {
  color: orange;
}
</style>
