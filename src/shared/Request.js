import axios from "axios";

// 인스턴스 : 사례
const instance = axios.create({
  baseURL: "http://3.36.70.96:8080",
});

const nickname = localStorage.getItem("nickname");
instance.defaults.headers.common["authorization"] = "Bearer " + nickname;

export default instance;
