<template>
    <v-container>
        <v-card class="card">
            <v-card-title class="title"
                ><v-icon style="color: orange">mdi-coffee</v-icon> &nbsp;
                Breakfast</v-card-title
            >
            <v-card-text
                v-for="food in $store.state.breakfast.foodItems"
                v-bind:key="food.id"
            >
                {{ food.foodName }}
            </v-card-text>
            <v-card-actions>
                <v-btn v-on:click="addNewMeal(Breakfast)">+</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="card">
            <v-card-title class="title"
                ><v-icon style="color: #4bc9a1">mdi-food-variant</v-icon> &nbsp;
                Lunch</v-card-title
            >
            <v-card-text
                v-for="food in $store.state.lunch.foodItems"
                v-bind:key="food.id"
            >
                {{ food.foodName }}
            </v-card-text>
            <v-card-actions>
                <v-btn v-on:click="addNewMeal(Lunch)">+</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="card">
            <v-card-title class="title"
                ><v-icon style="color: #251e62">mdi-pasta</v-icon> &nbsp;
                Dinner</v-card-title
            >
            <v-card-text
                v-for="food in $store.state.dinner.foodItems"
                v-bind:key="food.id"
            >
                {{ food.foodName }}
            </v-card-text>
            <v-card-actions>
                <v-btn v-on:click="addNewMeal(Dinner)">+</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="card">
            <v-card-title class="title"
                ><v-icon style="color: red">mdi-food-apple</v-icon> &nbsp;
                Snacks</v-card-title
            >
            <v-card-text
                v-for="food in $store.state.snacks.foodItems"
                v-bind:key="food.id"
            >
                {{ food.foodName }}
            </v-card-text>
            <v-card-actions>
                <v-btn v-on:click="addNewMeal(Snack)">+</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import FoodService from "../services/FoodService";

export default {
    data() {
        return {
            breakfastId: 0,
            lunchId: 0,
            dinnerId: 0,
            snackId: 0,
            Breakfast: {
                userId: 0,
                mealType: "Breakfast",
                foodItems: [],
                numberOfServings: 1,
                isCompleted: false,
            },
            Lunch: {
                userId: 0,
                mealType: "Lunch",
                foodItems: [],
                numberOfServings: 1,
                isCompleted: false,
            },
            Dinner: {
                userId: 0,
                mealType: "Dinner",
                foodItems: [],
                numberOfServings: 1,
                isCompleted: false,
            },
            Snack: {
                userId: 0,
                mealType: "Snack",
                foodItems: [],
                numberOfServings: 1,
                isCompleted: false,
            },
        };
    },
    methods: {
        addNewMeal(meal) {
            let mealExists = false;
            for (let i = 0; i < this.$store.state.dailyMeals.length; i++) {
                if (
                    this.$store.state.dailyMeals[i].mealType === meal.mealType
                ) {
                    mealExists = true;
                    this.$router.push({
                        path: `/meal/${this.$store.state.dailyMeals[i].mealId}`,
                    });
                }
            }
            if (!mealExists) {
                FoodService.addMeal(meal).then((response) => {
                    if (response.status == 201) {
                        let thisMealId = response.data;
                        meal.mealId = thisMealId;
                        this.$store.commit("ADD_MEAL", meal);
                        this.$router.push({ path: `/meal/${meal.mealId}` });
                    }
                });
            }
        },
    },
    created() {
        (this.breakfastId = this.$store.state.breakfast.mealId),
            (this.lunchId = this.$store.state.lunch.mealId),
            (this.dinnerId = this.$store.state.dinner.mealId),
            (this.snackId = this.$store.state.snacks.mealId);
        this.Breakfast.userId = this.$store.state.user.id;
        this.Lunch.userId = this.$store.state.user.id;
        this.Dinner.userId = this.$store.state.user.id;
        this.Snack.userId = this.$store.state.user.id;
    },
};
</script>

<style scoped>
.v-btn {
    color: rgb(0, 0, 0);
    font-weight: bolder;
}
.card {
    border-radius: 5px;
    border: 1px solid rgb(165, 165, 165);
    box-shadow: 3px 3px #dedede;
}
.v-card__text {
    padding: 0;
}

.title {
    font-size: 16px;
    font-weight: bold;
}
</style>
