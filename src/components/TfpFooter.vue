<template>
  <div class="footer">
    <v-bottom-navigation grow>
      <router-link v-bind:to="{ name: 'home' }" class="navigation">
        <v-btn value="home">
          <v-icon>mdi-home</v-icon>

          Home
        </v-btn>
      </router-link>
      <router-link
        class="navigation"
        v-bind:to="{ name: 'daily-view' }"
        v-if="$store.state.token != ''"
      >
        <v-btn value="today">
          <v-icon>mdi-food-fork-drink</v-icon>

          Meals
        </v-btn>
      </router-link>
      <router-link
        class="navigation"
        v-bind:to="{ name: 'calendar' }"
        v-if="$store.state.token != ''"
      >
        <v-btn value="calendar">
          <v-icon>mdi-calendar-blank-outline</v-icon>

          Calendar
        </v-btn>
      </router-link>
      <router-link
        class="navigation"
        v-bind:to="{ name: 'analytics' }"
        v-if="$store.state.token != ''"
      >
        <v-btn value="analytics">
          <v-icon>mdi-chart-box-outline</v-icon>

          Analytics
        </v-btn>
      </router-link>
      <router-link
        class="navigation"
        v-bind:to="{ name: 'logout' }"
        v-if="$store.state.token != ''"
      >
        <v-btn value="logout">
          <v-icon>mdi-exit-to-app</v-icon>

          Logout
        </v-btn></router-link
      >
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "tfp-footer",
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--has-bg {
  background: none;
}

.v-icon.v-icon {
  text-decoration: none;
  line-height: none;
}
.navigation {
  text-decoration: none;
}
</style>
