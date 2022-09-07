import axios from "axios";

// 인스턴스 : 사례
const instance = axios.create({
  baseURL: "http://3.36.70.96:8080",
});

let Member_token = localStorage.getItem("Member_token");
instance.defaults.headers.common["authorization"] = "Bearer " + Member_token;

export default instance;
