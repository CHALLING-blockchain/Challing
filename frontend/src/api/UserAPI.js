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

  updateMyPage(body) {
    return axios.put(`${base.baseUrl}/user/mypage`, body);
  }

  validCheck(nickname) {
    console.log("nickname", nickname);
    return axios.get(`${base.baseUrl}/user/check/${nickname}`);
  }

  addFavorite(email, challengeId) {
    const body = {
      email: email,
      challengeId: challengeId,
    };
    return axios.post(`${base.baseUrl}/user/favorite`, body);
  }

  deleteFavorite(email, challengeId) {
    const body = {
      email: email,
      challengeId: challengeId,
    };
    return axios.delete(`${base.baseUrl}/user/favorite`, body);
  }

  addPhoto(email, photoUrl) {
    const body = {
      email: email,
      photoUrl: photoUrl,
    };
    return axios.post(`${base.baseUrl}/user/photo`, body);
  }

  deletePhoto(email, photoUrl) {
    const body = {
      email: email,
      photoUrl: photoUrl,
    };
    return axios.delete(`${base.baseUrl}/user/photo`, body);
  }
}

export default new UserAPI();
