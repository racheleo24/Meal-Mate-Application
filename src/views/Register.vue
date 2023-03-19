<template>
  <div id="register" class="text-center">
    <form class="form-register" @submit.prevent="register">
      <h1 id="banner" class="h3 mb-3 font-weight-normal">
        Enter your information here to get started!
      </h1>
      <div class="alert alert-danger" role="alert" v-if="registrationErrors">
        {{ registrationErrorMsg }}
      </div>
      <v-container class="inputs">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.username"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.confirmPassword"
              label="Confirm Password"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-btn id="button" type="submit"> Create Account </v-btn>
      <br />
      <br />
      <router-link :to="{ name: 'login' }">Have an account?</router-link>
      <br />
      <br />
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
      },
      registrationErrors: false,
      registrationErrorMsg: "There were problems registering this user.",
    };
  },
  methods: {
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = "Password & Confirm Password do not match.";
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              authService
                .login(this.user)
                .then((response) => {
                  if (response.status == 200) {
                    this.$store.commit("SET_AUTH_TOKEN", response.data.token);
                    this.$store.commit("SET_USER", response.data.user);
                    this.$router.push({
                      path: "/create-profile",
                      query: { registration: "success" },
                    });
                  }
                })
                .catch((error) => {
                  const response = error.response;
                  if (response.status == 400) {
                    this.registrationErrorMsg =
                      "Bad Request: Validation Errors";
                  }
                });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status == 400) {
              this.registrationErrorMsg = "Bad Request: Validation Errors";
            }
          });
      }
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = "There were problems registering this user.";
    },
  },
};
</script>

<style scoped>
#banner {
  color: black;
  padding: 30px;
}
</style>
