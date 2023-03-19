<template>
  <v-container
    ><v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.foodName"
              label="Item Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.foodBrand"
              label="Brand"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.calories"
              label="Calories"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.totalFat"
              label="Total Fat"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.saturatedFat"
              label="Saturated Fat"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.unsaturatedFat"
              label="Unsaturated Fat"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.transFat"
              label="Trans Fat"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.cholesterol"
              label="Cholesterol"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.sodium"
              label="Sodium"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.totalCarbohydrates"
              label="Total Carbohydrates"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.dietaryFiber"
              label="Dietary Fiber"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.totalSugars"
              label="Total Sugars"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.addedSugars"
              label="Added Sugars"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="newFood.protein"
              label="Protein"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn id="save" @click="saveFood">Add Food</v-btn>
  </v-container>
</template>

<script>
import FoodService from "../services/FoodService";

export default {
  data() {
    return {
      newFood: {
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
    saveFood() {
      FoodService.saveFood(this.$route.params.mealId, this.newFood)
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
  },
};
</script>

<style scoped></style>
