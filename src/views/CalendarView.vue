<template>
  <div>
    <!-- title and weekly toggle -->
    <div id="header">
      <h1 id="title">Weekly Log</h1>
      <v-btn fab text small color="grey darken-2" v-on:click="togglePrevWeek">
        <v-icon small class="chevron-icon"> mdi-chevron-left </v-icon>
      </v-btn>
      {{ logs.weeks[currentWeekIdx].title }}
      <v-btn fab text small color="grey darken-2" v-on:click="toggleNextWeek">
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
    </div>

    <!-- daily cards -->
    <v-container id="cards">
      <div v-for="(day, index) in logs.weeks[currentWeekIdx].data" :key="index">
        <v-card class="mx-auto" max-width="100%" outlined>
          <v-list-item three-line>
            <v-progress-circular
              :rotate="-90"
              :size="50"
              :width="5"
              :value="caloriePercentage(day.calories)"
              v-bind:class="getClass(caloriePercentage(day.calories))"
              id="food-progress"
            >
              <v-icon>mdi-food-variant</v-icon>
            </v-progress-circular>
            <v-list-item-content id="dailyText">
              <div class="date">{{ day.dayOfWeek }} | {{ day.date }}</div>
              <v-list-item-title class="text-h4 mb-1">
                Consumed: {{ day.calories }} cal
              </v-list-item-title>
              <v-list-item-subtitle>
                Hydration: {{ day.water }} oz.
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                Meals Logged: {{ day.meals }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="grey">
              <v-progress-circular
                :value="hydrationPercentage(day.water)"
                size="50"
                text="Percentage"
                color="#251E62"
                ><v-icon>mdi-cup-water</v-icon>
              </v-progress-circular></v-list-item-avatar
            >
          </v-list-item>
          <!-- <v-card-actions>
          <v-btn outlined rounded text> Modify </v-btn>
        </v-card-actions> -->
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      calories: this.sumCalories(0, "01-16"),
      currentWeekIdx: 0,
      logs: {
        weeks: [
          {
            name: "Week One",
            title: "Jan 1/16 - Jan 1/22",
            data: [
              {
                dayOfWeek: "Monday",
                date: "1-16",
                calories: this.sumCalories(0, "01-16"),
                water: this.getHydration(0, "01-16"),
                meals: this.sumMeals(0, "01-16"),
              },
              {
                dayOfWeek: "Tuesday",
                date: "1-17",
                calories: this.sumCalories(0, "01-17"),
                water: this.getHydration(0, "01-17"),
                meals: this.sumMeals(0, "01-17"),
              },
              {
                dayOfWeek: "Wednesday",
                date: "1-18",
                calories: this.sumCalories(0, "01-18"),
                water: this.getHydration(0, "01-18"),
                meals: this.sumMeals(0, "01-18"),
              },
              {
                dayOfWeek: "Thursday",
                date: "1-19",
                calories: this.sumCalories(0, "01-19"),
                water: this.getHydration(0, "01-19"),
                meals: this.sumMeals(0, "01-19"),
              },
              {
                dayOfWeek: "Friday",
                date: "1-20",
                calories: this.sumCalories(0, "01-20"),
                water: this.getHydration(0, "01-20"),
                meals: this.sumMeals(0, "01-20"),
              },
              {
                dayOfWeek: "Saturday",
                date: "1-21",
                calories: this.sumCalories(0, "01-21"),
                water: this.getHydration(0, "01-21"),
                meals: this.sumMeals(0, "01-21"),
              },
              {
                dayOfWeek: "Sunday",
                date: "1-22",
                calories: this.sumCalories(0, "01-22"),
                water: this.getHydration(0, "01-22"),
                meals: this.sumMeals(0, "01-22"),
              },
            ],
          },
          {
            name: "Week Two",
            title: "Jan 1/23 - Jan 1/29",
            data: [
              {
                dayOfWeek: "Monday",
                date: "1/23",
                calories: this.sumCalories(1, "01-23"),
                water: this.getHydration(1, "01-23"),
                meals: this.sumMeals(1, "01-23"),
              },
              {
                dayOfWeek: "Tuesday",
                date: "1/24",
                calories: this.sumCalories(1, "01-24"),
                water: this.getHydration(1, "01-24"),
                meals: this.sumMeals(1, "01-24"),
              },
              {
                dayOfWeek: "Wednesday",
                date: "1/25",
                calories: this.sumCalories(1, "01-25"),
                water: this.getHydration(1, "01-25"),
                meals: this.sumMeals(1, "01-25"),
              },
              {
                dayOfWeek: "Thursday",
                date: "1/26",
                calories: this.sumCalories(1, "01-26"),
                water: this.getHydration(1, "01-26"),
                meals: this.sumMeals(1, "01-26"),
              },
              {
                dayOfWeek: "Friday",
                date: "1/27",
                calories: this.sumCalories(1, "01-27"),
                water: this.getHydration(1, "01-27"),
                meals: this.sumMeals(1, "01-27"),
              },
              {
                dayOfWeek: "Saturday",
                date: "1/28",
                calories: this.sumCalories(1, "01-28"),
                water: this.getHydration(1, "01-28"),
                meals: this.sumMeals(1, "01-28"),
              },
              {
                dayOfWeek: "Sunday",
                date: "1/29",
                calories: this.sumCalories(1, "01-29"),
                water: this.getHydration(1, "01-29"),
                meals: this.sumMeals(1, "01-29"),
              },
            ],
          },
          {
            name: "Week Three",
            title: "Jan 1/30 - Feb 2/5",
            data: [
              {
                dayOfWeek: "Monday",
                date: "1/30",
                calories: this.sumCalories(2, "01-30"),
                water: this.getHydration(2, "01-30"),
                meals: this.sumMeals(2, "01-30"),
              },
              {
                dayOfWeek: "Tuesday",
                date: "1/31",
                calories: this.sumCalories(2, "01-31"),
                water: this.getHydration(2, "01-31"),
                meals: this.sumMeals(2, "01-31"),
              },
              {
                dayOfWeek: "Wednesday",
                date: "2/1",
                calories: this.sumCalories(2, "02-01"),
                water: this.getHydration(2, "02-01"),
                meals: this.sumMeals(2, "02-01"),
              },
              {
                dayOfWeek: "Thursday",
                date: "2/2",
                calories: this.sumCalories(2, "02-02"),
                water: this.getHydration(2, "02-02"),
                meals: this.sumMeals(2, "02-02"),
              },
              {
                dayOfWeek: "Friday",
                date: "2/3",
                calories: this.sumCalories(2, "02-03"),
                water: this.getHydration(2, "02-03"),
                meals: this.sumMeals(2, "02-03"),
              },
              {
                dayOfWeek: "Saturday",
                date: "2/4",
                calories: this.sumCalories(2, "02-04"),
                water: this.getHydration(2, "02-04"),
                meals: this.sumMeals(2, "02-04"),
              },
              {
                dayOfWeek: "Sunday",
                date: "2/5",
                calories: this.sumCalories(2, "02-05"),
                water: this.getHydration(2, "02-05"),
                meals: this.sumMeals(2, "02-05"),
              },
            ],
          },
          {
            name: "Week Four",
            title: "Feb 2/6 - Feb 2/12",
            data: [
              {
                dayOfWeek: "Monday",
                date: "2/6",
                calories: this.sumCalories(3, "02-06"),
                water: this.getHydration(3, "02-06"),
                meals: this.sumMeals(3, "02-06"),
              },
              {
                dayOfWeek: "Tuesday",
                date: "2/7",
                calories: this.sumCalories(3, "02-07"),
                water: this.getHydration(3, "02-07"),
                meals: this.sumMeals(3, "02-07"),
              },
              {
                dayOfWeek: "Wednesday",
                date: "2/8",
                calories: this.sumCalories(3, "02-08"),
                water: this.getHydration(3, "02-08"),
                meals: this.sumMeals(3, "02-08"),
              },
              {
                dayOfWeek: "Thursday",
                date: "2/9",
                calories: this.sumCalories(3, "02-09"),
                water: this.getHydration(3, "02-09"),
                meals: this.sumMeals(3, "02-09"),
              },
              {
                dayOfWeek: "Friday",
                date: "2/10",
                calories: this.sumCalories(3, "02-10"),
                water: this.getHydration(3, "02-10"),
                meals: this.sumMeals(3, "02-10"),
              },
              {
                dayOfWeek: "Saturday",
                date: "2/11",
                calories: this.sumCalories(3, "02-11"),
                water: this.getHydration(3, "02-11"),
                meals: this.sumMeals(3, "02-11"),
              },
              {
                dayOfWeek: "Sunday",
                date: "2/12",
                calories: this.sumCalories(3, "02-12"),
                water: this.getHydration(3, "02-12"),
                meals: this.sumMeals(3, "02-12"),
              },
            ],
          },
        ],
        // and so on for each day of the week
      },
    };
  },
  methods: {
    // Prev & Next Methods
    togglePrevWeek() {
      if (this.currentWeekIdx != 0) {
        this.currentWeekIdx -= 1;
      }
    },
    toggleNextWeek() {
      if (this.currentWeekIdx != this.logs.weeks.length - 1) {
        this.currentWeekIdx += 1;
      }
    },
    sumCalories(week, date) {
      let calories = 0;
      this.$store.state.weeklyMeals[week].forEach((meal) => {
        if (meal.dateConsumed.includes(date)) {
          meal.foodItems.forEach((food) => {
            return (calories = calories + parseInt(food.calories));
          });
        }
      });
      return calories;
    },
    sumMeals(week, date) {
      let mealTotal = 0;
      this.$store.state.weeklyMeals[week].forEach((meal) => {
        if (meal.dateConsumed.includes(date)) {
          return mealTotal++;
        }
      });
      return mealTotal;
    },
    getHydration(week, date) {
      let hydrationTotal = 0;
      this.$store.state.weeklyHydration[week].forEach((hydration) => {
        if (hydration.hydrationDate.includes(date)) {
          return (hydrationTotal = hydrationTotal + hydration.hydrationTotal);
        }
      });
      return hydrationTotal;
    },
    caloriePercentage(consumed) {
      let goal = this.$store.state.profile.dailyCalories;
      let percent = (consumed / goal) * 100;
      return percent;
    },
    hydrationPercentage(consumed) {
      let goal = 64;
      let percent = (consumed / goal) * 100;
      return percent;
    },
    getClass(num) {
      if ((num > 75.0) & (num < 100.0)) {
        return "medium";
      }
      if (num > 100) {
        return "low";
      }
      if (num < 75) {
        return "normal";
      }
    },
  },
};
</script>
<style scoped>
.v-card {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 3px 3px #dedede;
}
.mdi-chevron-right,
.mdi-chevron-left {
  font-size: 26px !important;
}
.low {
  color: red;
}
.medium {
  color: orange;
}
.normal {
  color: #4bc9a1;
}
.date {
  font-weight: bold;
  font-size: 16px;
}
#title {
  margin-top: 10px;
}
#cards {
  padding-top: 5px;
  padding-bottom: 8px;
}
#food-progress {
  margin-left: 10px;
  margin-right: 15px;
}
</style>
