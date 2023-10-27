import http from "../../shared/services/http-common";
export class UserSignUpService {
  register(data) {
    return http.securityApi.post("/register", data);
  }
}
