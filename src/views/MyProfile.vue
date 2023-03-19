<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                <h2>My Profile</h2>
            </v-col>
            <v-col cols="12" md="3">
                <v-icon class="user-icon">mdi-account-circle</v-icon>
            </v-col>
            <v-col class="card-detail" cols="12" md="3">
                <v-card>
                    <v-card-title class="title">
                        <v-icon style="font-size: 24px; color: #4bc9a1"
                            >mdi-phone</v-icon
                        >
                        Personal Information
                    </v-card-title>
                    <v-card-text>
                        <p>First Name: {{ profile.firstName }}</p>
                        <p>Last Name: {{ profile.lastName }}</p>
                        <p>Email: {{ profile.email }}</p>
                        <p>Phone Number: {{ profile.phoneNumber }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="card-detail" cols="12" md="3">
                <v-card>
                    <v-card-title class="title">
                        <v-icon style="font-size: 24px; color: #251e62"
                            >mdi-human-male</v-icon
                        >Physical Information</v-card-title
                    >
                    <v-card-text>
                        <p>Age: {{ profile.age }}</p>
                        <p>Sex: {{ profile.sex }}</p>
                        <p>Height: {{ profile.height }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="card-detail" cols="12" md="3">
                <v-card>
                    <v-card-title class="title">
                        <v-icon style="font-size: 24px; color: orange"
                            >mdi-weight-pound</v-icon
                        >
                        Weight Information</v-card-title
                    >
                    <v-card-text>
                        <p>Current Weight: {{ profile.currentWeight }}</p>
                        <p>Goal Weight: {{ profile.goalWeight }}</p>
                        <p>Daily Calories: {{ profile.dailyCalories }}</p>
                        <p>Notifications: {{ profile.notifications }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "my-profile",
    data() {
        return {
            profileImage: localStorage.getItem("profileImage") || "",
        };
    },
    computed: {
        profile() {
            return this.$store.state.profile;
        },
    },
    methods: {
        uploadProfilePicture() {
            this.$refs.fileInput.click();
        },
    },
};
</script>
<style scoped>
.profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto;
    display: block;
}
.v-card {
    box-shadow: 3px 3px #dedede;
    border: 1px solid rgb(165, 165, 165);
    border-radius: 5px;

    align-content: center;
}
.card-detail {
    padding-top: 0px;
    padding-bottom: 0px;
}
p {
    font-weight: bold;
}
.title {
    font-weight: bold;
}
.user-icon {
    font-size: 90px;
    color: #4bc9a1;
}
</style>
