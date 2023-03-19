import axios from "axios";

export default {
    createProfile(profile) {
        return axios.post("/create-profile", profile);
    },
    getProfile() {
        return axios.get("/my-profile");
    }
};
