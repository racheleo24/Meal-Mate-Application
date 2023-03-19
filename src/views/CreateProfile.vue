<template>
  <div id="newProfile">
    <form class="form-profile" @submit.prevent="createProfile">
      <h1 id="banner" class="h3 mb-3 font-weight-normal">
        Please complete <br />your profile:
      </h1>
      <div class="alert alert-danger" role="alert" v-if="registrationErrors">
        {{ registrationErrorMsg }}
      </div>
      <v-container class="inputs">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.firstName"
              label="First Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.lastName"
              label="Last Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.email"
              label="Email Address"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.phoneNumber"
              label="Phone Number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.age"
              label="Age (years)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-radio-group v-model="profile.sex" required label="Sex">
              <v-radio label="Female" value="Female"></v-radio>
              <v-radio label="Male" value="Male"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="8" md="4">
            <p style="text-align: left">Height</p>
            <v-text-field
              v-model="feet"
              label="Feet"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="inches"
              label="Inches"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.currentWeight"
              label="Current Weight (pounds)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="profile.goalWeight"
              label="Goal Weight (pounds)"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox
              v-model="profile.notifications"
              hide-details
              label="Subscribe to notifications?"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
      <br />
    </form>
    <v-btn id="button" type="submit"> Create Profile </v-btn>
    <br />
    <router-link :to="{ name: 'login' }">Have an account?</router-link>
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import userService from "../services/UserService.js";
export default {
  name: "create-profile",
  data() {
    return {
      feet: null,
      inches: null,
      profile: {
        id: this.$store.state.user.id,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: null,
        age: null,
        sex: "",
        height: null,
        currentWeight: null,
        goalWeight: null,
        dailyCalories: null,
        notifications: false,
      },
      registrationErrors: false,
      registrationErrorMsg: "There were problems registering this profile.",
    };
  },
  methods: {
    setDailyCalories() {
      let bmr = 0;
      let currentKgs = parseInt(this.profile.currentWeight) / 2.2;
      let heightCms = parseInt(this.profile.height) * 2.54;
      if (this.profile.sex == "Male") {
        bmr =
          66 +
          13.7 * parseInt(currentKgs) +
          5 * parseInt(heightCms) -
          6.8 * parseInt(this.profile.age);
      }
      if (this.profile.sex == "Female") {
        bmr =
          655 +
          9.6 * parseInt(currentKgs) +
          1.8 * parseInt(heightCms) -
          4.7 * parseInt(this.profile.age);
      }
      let tdee = 1.55 * parseInt(bmr);

      let deficit = 0.2 * parseInt(tdee);
      this.profile.dailyCalories = parseInt(tdee) - parseInt(deficit);
    },
    setHeight() {
      let feetInt = parseInt(this.feet);
      let inchInt = parseInt(this.inches);
      this.profile.height = feetInt * 12 + inchInt;
    },
    createProfile() {
      this.setHeight();
      this.setDailyCalories();
      userService
        .createProfile(this.profile)
        .then((response) => {
          if (response.status == 201) {
            this.$router.push({
              path: "/",
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
    },
  },
};
</script>
<style scoped>
#banner {
  margin-top: 10px;
}
#button {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>