import axios from "axios";

const http = axios.create({
    baseURL: "https://api.nal.usda.gov/fdc/v1/foods/list",
});

export default {
    getFood(food) {
        return http.get(this.baseURL, {
            params: {
                api_key: "ba4ce7KRmMjGHscisymVHam5YBOnyHoFgZXQ2Ocm",
                query: food,
                pageSize: 25,
                pageNumber: 1,
            },
        });
    },
};
