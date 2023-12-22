import axios from "axios";
import config from "../config.json";

//axios에 미리 백엔드 앞부분 주소를 저장
export default axios.create({
  baseURL: `${config.backendURL}/api`,
});
