<template>
  <v-container class="hydrationStatus">
    <p id="title">Hydration</p>
    <section id="glass-icons">
      <v-icon
        color="#251E62"
        id="indivdual-glass"
        v-for="n in hydration.numGlasses"
        :key="n"
        >mdi-cup-water</v-icon
      >
    </section>
    <v-btn
      @click="
        hydration.numGlasses > 0 ? hydration.numGlasses-- : null,
          adjustHydration(-8),
          updateHydration()
      "
      >-</v-btn
    >
    <v-progress-circular
      :value="hydrationPercentage"
      rotate="90"
      size="100"
      color="#4BC9A1"
      text="Percentage"
      width="8"
      id="hydration-circle"
      >{{ hydrationPercentage }}%</v-progress-circular
    >
    <v-btn
      @click="
        hydration.numGlasses < maximumNumberOfGlasses
          ? hydration.numGlasses++
          : null,
          adjustHydration(8),
          updateHydration()
      "
      >+</v-btn
    >
    <br />
    <br />
  </v-container>
</template>
<script>
import FoodService from "../services/FoodService";
export default {
  data() {
    return {
      maximumNumberOfGlasses: 8,
      hydration: {
        userId: this.$store.state.user.id,
        numGlasses: this.$store.state.dailyHydration.numGlasses,
        hydrationTotal: this.$store.state.dailyHydration.hydrationTotal,
      },
    };
  },
  computed: {
    hydrationPercentage() {
      if (this.hydration.hydrationTotal == 0) {
        return 0;
      } else {
        return (this.hydration.numGlasses / this.maximumNumberOfGlasses) * 100;
      }
    },
  },
  methods: {
    updateHydration() {
      FoodService.changeHydrationAmount(this.hydration).then((response) => {
        if (response.status == 202) {
          console.log(response);
          this.$store.commit("SET_DAILY_HYDRATION", this.hydration);
        }
      });
    },
    adjustHydration(int) {
      if (
        this.hydration.hydrationTotal + int >= 0 &&
        this.hydration.hydrationTotal + int <= 64
      ) {
        this.hydration.hydrationTotal = this.hydration.hydrationTotal + int;
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
#glass-icons {
  padding: 12px 0 12px 0;
}
#hydration-circle {
  margin: 0 12px 0px 12px;
}
.hydrationStatus {
  border-radius: 5px;
  border: 1px solid rgb(165, 165, 165);
  box-shadow: 3px 3px #dedede;
}
</style>
