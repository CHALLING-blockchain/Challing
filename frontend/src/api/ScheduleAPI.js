import axios from "axios";
const base = {
  baseUrl: process.env.REACT_APP_API_SERVER_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
};

class ScheduleAPI {
  challenge(body) {
    console.log("body", body);
    return axios.post(`${base.baseUrl}/schedule/challenge`, body);
  }

  vote(body) {
    console.log("body", body);
    return axios.post(`${base.baseUrl}/schedule/vote`, body);
  }
}

export default new ScheduleAPI;
