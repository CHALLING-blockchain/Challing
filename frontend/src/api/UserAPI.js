import axios from "axios";
const base = {
  baseUrl: process.env.REACT_APP_API_SERVER_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
};

class UserAPI {
  kakaoLogin(code) {
    const body = {
      code: code,
    };
    return axios.post(`${base.baseUrl}/auth/login`, body);
  }

  join(body) {
    console.log("body", body);
    return axios.post(`${base.baseUrl}/user/join`, body);
  }

  mypage(email) {
    return axios.get(`${base.baseUrl}/user/mypage/${email}`);
  }

  getUserById(id) {
    return axios.get(`${base.baseUrl}/user/info/${id}`);
  }

  updateMyPage(body) {
    return axios.put(`${base.baseUrl}/user/mypage`, body);
  }

  validCheck(nickname) {
    console.log("nickname", nickname);
    return axios.get(`${base.baseUrl}/user/check/${nickname}`);
  }

  addFavorite(body) {
    return axios.post(`${base.baseUrl}/user/favorite`, body);
  }

  deleteFavorite(body) {
    console.log("delete", body);
    return axios.delete(`${base.baseUrl}/user/favorite`, { data: body });
  }

  addPhoto(body) {
    return axios.post(`${base.baseUrl}/user/photo`, body);
  }

  deletePhoto(body) {
    return axios.delete(`${base.baseUrl}/user/photo`, { daya: body });
  }
}

export default new UserAPI();
