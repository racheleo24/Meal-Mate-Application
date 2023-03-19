<template>
    <v-container id="meal-plan">
        <v-row>
            <v-col
                v-for="meal in this.$store.state.dailyMealPlan"
                v-bind:key="meal.id"
                id="daily-meal-plan"
            >
                {{ meal.meal_type }} <br />
                {{ meal.food_item }} <br />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
#daily-meal-plan {
    border: 2px solid black;
}
</style>
