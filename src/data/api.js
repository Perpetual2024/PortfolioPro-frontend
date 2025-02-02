import axios from "axios";

const BASE_URL = 'http://127.0.0.1:5555/projects'

export const fetchProject = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5555/projects`);
        return response.data;
        } catch (error) {
            console.error(error);
            return[];
            }
            };



