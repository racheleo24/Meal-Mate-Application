<template>
  <v-container>
    <h1 id="page-title">Weekly Analytics</h1>
    <v-container class="macro-graph">
      <h2>Macro Intake</h2>
      <div class="progressBars">
        <v-progress-circular
          class="carbs"
          :value="weeklyCarbTotal"
          :size="100"
          :width="10"
          >Carbs <br />
          {{ this.weeklyCarbTotal }}%</v-progress-circular
        >

        <v-progress-circular
          class="protein"
          :value="weeklyProteinTotal"
          :size="100"
          :width="10"
          >Protein <br />
          {{ this.weeklyProteinTotal }}%</v-progress-circular
        >

        <v-progress-circular
          class="fat"
          :value="weeklyFatTotal"
          :size="100"
          :width="10"
          >Fat <br />
          {{ this.weeklyFatTotal }}%</v-progress-circular
        >
        <p id="chart-subtitle-one">
          Based off of recommended daily carb, protein, and fat intake.
        </p>
      </div>
    </v-container>
    <v-container class="barGraph">
      <h2 id="bar-title">Caloric Intake</h2>
      <p id="chart-subtitle-two">
        Daily Goal:
        {{ this.$store.state.profile.dailyCalories }} cal
      </p>
      <CanvasJSChart :options="options" />
      <br />
    </v-container>
  </v-container>
</template>

<script>
import CanvasJSChart from "../assets/CanvasJSVueComponent.vue";

export default {
  components: {
    CanvasJSChart,
  },
  data() {
    return {
      today: this.currentDate(),
      chart: null,
      weeklyCarbTotal: this.calculateCarbPercentage(),
      weeklyProteinTotal: this.calculateProteinPercentage(),
      weeklyFatTotal: this.calculateFatPercentage(),
      options: {
        animationEnabled: true,
        title: {
          text: "",
        },
        data: [
          {
            type: "column",
            dataPoints: [
              { label: "Sun", y: this.getCalories(1), color: "#4bc9a1" },
              { label: "Mon", y: this.getCalories(2), color: "#251e62" },
              { label: "Tues", y: this.getCalories(3), color: "orange" },
              { label: "Wed", y: this.getCalories(4), color: "#4bc9a1" },
              { label: "Thur", y: this.getCalories(5), color: "#251e62" },
              { label: "Fri", y: this.getCalories(6), color: "orange" },
              { label: "Sat", y: this.getCalories(7), color: "#4bc9a1" },
            ],
          },
        ],
      },
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
    getCalories(dayOfWeek) {
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
      return totalCalories;
    },
    calculateCarbPercentage() {
      let totalCarbs = 0;
      let goalCarb = 1785;
      this.$store.state.weeklyMeals[3].forEach((meal) => {
        meal.foodItems.forEach((food) => {
          return (totalCarbs = totalCarbs + parseInt(food.totalCarbohydrates));
        });
      });
      return Math.round((totalCarbs / goalCarb) * 100);
    },
    calculateProteinPercentage() {
      let totalProtein = 0;
      let goalProtein = 630;
      this.$store.state.weeklyMeals[3].forEach((meal) => {
        meal.foodItems.forEach((food) => {
          return (totalProtein = totalProtein + parseInt(food.protein));
        });
      });
      return Math.round((goalProtein / totalProtein) * 100);
    },
    calculateFatPercentage() {
      let totalFat = 0;
      let goalFat = 511;
      this.$store.state.weeklyMeals[3].forEach((meal) => {
        meal.foodItems.forEach((food) => {
          return (totalFat = totalFat + parseInt(food.totalFat));
        });
      });
      return Math.round((goalFat / totalFat) * 100);
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.v-progress-circular.carbs {
  color: #4bc9a1;
  font-weight: bold;
}

.v-progress-circular.protein {
  color: #251e62;
  font-weight: bold;
}
.v-progress-circular.fat {
  color: orange;
  font-weight: bold;
}
.barGraph {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 3px 3px #dedede;
  padding-bottom: 0px;
}
#chart-subtitle-one {
  font-size: 12px;
}
#chart-subtitle-two {
  font-size: 14px;
  margin-bottom: 10px;
}
.macro-graph {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 3px 3px #dedede;
}
#bar-title {
  margin-bottom: 5px;
}
#page-title {
  margin-bottom: 15px;
}
</style>