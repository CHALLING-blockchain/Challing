import axios from "axios";
const base = {
  baseUrl: process.env.REACT_APP_API_SERVER_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
};

class UserAPI {
  register(code) {
    const body = {
      code: code,
    };
    console.log(base.baseUrl);
    return axios.post(`${base.baseUrl}/auth/login`, body);
  }
}

export default new UserAPI();
