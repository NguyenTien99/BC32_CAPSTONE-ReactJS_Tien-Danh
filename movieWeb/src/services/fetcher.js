import axios from "axios";

const fetcher = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api",
    headers: {
        Tokencybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTUxNjgwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxNjY0NDAwfQ.oR9K8iSTqbo-t0Q_a-WFnKePPaMAr7sdlgR5xKAtQWA"

    }
})

//interceptor
fetcher.interceptors.response.use(
    (response) => {
        return response.data.content
    },

    (error) => {
        return Promise.reject(error.response.data.content)
    }
)

fetcher.interceptors.request.use(
    (config) => {
        // thêm authorization vào header config (nếu có)
        const { accessToken } = JSON.parse(localStorage.getItem("user")) || {};
        
        if(accessToken) {
             config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default fetcher;