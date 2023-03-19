<template>
    <v-container id="login" class="text-center">
        <form class="form-signin" @submit.prevent="login">
            <h1 id="banner">
                Welcome Back!
            </h1>
            <div
                class="alert alert-danger"
                role="alert"
                v-if="invalidCredentials"
            >
                Invalid username and password!
            </div>
            <div
                class="alert alert-success"
                role="alert"
                v-if="this.$route.query.registration"
            >
                Thank you for registering, please sign in.
            </div>

            <div id="inputs">
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
                    </v-row>
                </v-container>
            </div>
            <br />
            <v-btn id="button" type="submit">Sign in</v-btn>
            <br />
            <div id="register">
                <router-link :to="{ name: 'register' }"
                    >Need an account? <br />
                    Begin your journey here.</router-link
                >
            </div>
        </form>
    </v-container>
</template>

<script>
import authService from "../services/AuthService";

export default {
    name: "login",
    components: {},
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            invalidCredentials: false,
        };
    },
    methods: {
        login() {
            authService
                .login(this.user)
                .then((response) => {
                    if (response.status == 200) {
                        this.$store.commit(
                            "SET_AUTH_TOKEN",
                            response.data.token
                        );
                        this.$store.commit("SET_USER", response.data.user);
                        this.$router.push("/");
                    }
                })
                .catch((error) => {
                    const response = error.response;

                    if (response.status === 401) {
                        this.invalidCredentials = true;
                    }
                });
        },
    },
};
</script>

<style scoped>
#login {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
}
#banner {
    color: black;
    padding: 30px;
}
#inputs {
    text-align: center;
}
#button {
    margin: 15px;
}
#register {
    text-align: center;
    margin: 15px;
}
</style>
