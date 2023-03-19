<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Enter food item here"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn id="search" v-on:click="searchFood(), (showCustomForm = false)"
      >Search</v-btn
    >
    <br />
    <br />
    <v-btn id="addCustom" v-on:click="showCustomForm = true">Add Custom</v-btn>
    <br /><br />
    <v-container v-if="showCustomForm">
      <new-food-form />
    </v-container>
    <v-container v-if="(responseAvailable, !showCustomForm)">
      <v-card
        class="foodItem"
        v-for="food in food"
        v-bind:key="food.fdcId"
        elevation="4"
        outlined
        min-height="25"
        v-on:click="selectItem(food.fdcId), (showItemDetails = true)"
      >
        <v-card-title>{{ food.description }}</v-card-title>
        <v-card-subtitle> {{ food.brandOwner }}</v-card-subtitle>
        <br />
        <p v-if="food.fdcId === thisFood.fdcId">
          <v-btn id="save" @click="saveItem">Add Food</v-btn>
          <br /><br />

          Nutritional Details:
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Data Type</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Calories (cal)</td>
                  <td>{{ selectedFood.calories }}</td>
                </tr>
                <tr>
                  <td>Total Fat (g)</td>
                  <td>{{ selectedFood.totalFat }}</td>
                </tr>
                <tr>
                  <td>Total Carbohydrates (g)</td>
                  <td>{{ selectedFood.totalCarbohydrates }}</td>
                </tr>
                <tr>
                  <td>Protein (g)</td>
                  <td>{{ selectedFood.protein }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            id="more"
            v-on:click="showExpandedDetails = true"
            v-show="!showExpandedDetails"
            >Show More</v-btn
          >
          <v-simple-table v-show="showExpandedDetails">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Saturated Fat (g)</td>
                  <td>{{ selectedFood.saturatedFat }}</td>
                </tr>
                <tr>
                  <td>Unsaturated Fat (g)</td>
                  <td>{{ selectedFood.unsaturatedFat }}</td>
                </tr>
                <tr>
                  <td>Trans Fat (g)</td>
                  <td>{{ selectedFood.transFat }}</td>
                </tr>
                <tr>
                  <td>Cholesterol (g)</td>
                  <td>{{ selectedFood.cholesterol }}</td>
                </tr>
                <tr>
                  <td>Sodium (g)</td>
                  <td>{{ selectedFood.sodium }}</td>
                </tr>

                <tr>
                  <td>Dietary Fiber (g)</td>
                  <td>{{ selectedFood.dietaryFiber }}</td>
                </tr>
                <tr>
                  <td>Total Sugars (g)</td>
                  <td>{{ selectedFood.totalSugars }}</td>
                </tr>
                <tr>
                  <td>Added Sugars (g)</td>
                  <td>{{ selectedFood.addedSugars }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            id="less"
            v-on:click="showExpandedDetails = false"
            v-show="showExpandedDetails"
            >Hide</v-btn
          >
        </p>
      </v-card>
    </v-container>
    <br />
  </v-container>
</template>

<script>
import FoodAPIService from "../services/FoodAPIService";
import FoodService from "../services/FoodService";
import NewFoodForm from "./NewFoodForm.vue";

export default {
  components: {
    NewFoodForm,
  },
  name: "food-search",
  props: ["currentMeal"],
  data() {
    return {
      showCustomForm: false,
      showItemDetails: false,
      showExpandedDetails: false,
      responseAvailable: false,
      search: "",
      food: [],
      thisFood: {
        fdcId: 0,
      },
      selectedFood: {
        foodBrand: "",
        foodName: "",
        servingSize: 1,
        calories: null,
        totalFat: null,
        saturatedFat: null,
        unsaturatedFat: null,
        transFat: null,
        cholesterol: null,
        sodium: null,
        totalCarbohydrates: null,
        dietaryFiber: null,
        totalSugars: null,
        addedSugars: null,
        protein: null,
      },
      today: this.currentDate(),
    };
  },
  methods: {
    currentDate() {
      let current = new Date();

      let date = `${current.getFullYear()}-${(current.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${current.getDate().toString().padStart(2, "0")}`;
      console.log(date);
      return date;
    },
    searchFood() {
      console.log(this.search);
      FoodAPIService.getFood(this.search).then((response) => {
        this.responseAvailable = true;
        this.food = response.data;
      });
    },
    selectItem(fdcId) {
      this.thisFood.fdcId = fdcId;
      for (let i = 0; i < this.food.length; i++) {
        if (this.food[i].fdcId === fdcId) {
          this.selectedFood = this.mapFoodObject(this.food[i]);
        }
      }
    },
    saveItem() {
      FoodService.saveFood(this.$route.params.mealId, this.selectedFood)
        .then((response) => {
          if (response.status == 201) {
            FoodService.getTodaysMeals(this.today).then((response) => {
              this.$store.commit("SET_DAILY_MEALS", response.data);
            });
            this.$router.push({
              name: "meal",
              params: { mealId: this.$route.params.mealId },
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    mapFoodObject(food) {
      let newFood = {};
      newFood.foodBrand = food.brandOwner;
      newFood.foodName = food.description;
      for (let i = 0; i < food.foodNutrients.length; i++) {
        if (food.foodNutrients[i].name.includes("Energy")) {
          newFood.calories = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Total lipid")) {
          newFood.totalFat = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes(" saturated")) {
          newFood.saturatedFat = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("unsaturated")) {
          newFood.unsaturatedFat = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("trans")) {
          newFood.transFat = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Cholesterol")) {
          newFood.cholesterol = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Sodium")) {
          newFood.sodium = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Carbohydrate")) {
          newFood.totalCarbohydrates = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Fiber, total")) {
          newFood.dietaryFiber = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Sugars, total")) {
          newFood.totalSugars = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Sugars, added")) {
          newFood.addedSugars = food.foodNutrients[i].amount;
        }
        if (food.foodNutrients[i].name.includes("Protein")) {
          newFood.protein = food.foodNutrients[i].amount;
        }
      }
      return newFood;
    },
  },
};
</script>

<style>
.foodItem {
  color: lightblue;
}
</style>
