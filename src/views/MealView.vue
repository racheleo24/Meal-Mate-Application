<template>
  <v-container>
    <h1>{{ currentMeal.mealType }}</h1>
    <h2>{{ currentDate() }}</h2>
    <v-card
      class="food-item"
      v-for="food in currentMeal.foodItems"
      v-bind:key="food.id"
    >
      <div id="food-details">
        <v-card-text id="food-name"
          >{{ food.foodName }}
          <hr id="line" width="100%" size="15px" color="#4bc9a1" />
          <p id="subtitle">{{ food.foodBrand }}</p>
        </v-card-text>

        <v-card-text id="macro-list">
          <p>{{ food.calories }} calories</p>
          <p>{{ food.totalCarbohydrates }} g carbs</p>
          <p>{{ food.protein }} g protein</p>
        </v-card-text>
      </div>
    </v-card>
    <br />
    <div class="buttons">
      <router-link class="button-links" v-bind:to="{ name: 'daily-view' }">
        <v-btn id="back">Back</v-btn>
      </router-link>
      <router-link
        class="button-links"
        v-bind:to="{
          name: 'food-log',
          params: { mealId: this.$route.params.mealId },
        }"
        v-if="$store.state.token != ''"
        ><v-btn>Add Food</v-btn></router-link
      >
    </div>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    currentMeal() {
      return this.$store.state.dailyMeals.find((m) => {
        return m.mealId == this.$route.params.mealId;
      });
    },
  },
  methods: {
    currentDate() {
      const date = moment().format("MMMM Do, YYYY");
      return date;
    },
  },
};
</script>

<style>
.food-item {
  min-height: 50px;
  box-shadow: 3px 3px #dedede;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 5px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.button-links {
  text-decoration: none;
}
#food-details {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#food-name {
  flex-grow: 2;
  font-size: 20px;
  text-align: left;
  padding-left: 30px;
}
#subtitle {
  margin-top: 5px;
  font-size: 16px;
}
#macro-list {
  text-align: right;
  padding-right: 30px;
}
#line {
  margin-top: 3px;
}
</style>