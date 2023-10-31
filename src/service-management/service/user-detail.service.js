import http from "../../shared/services/http-common";
export class UserProfile {
    searchUserProfile(Id) {
        return http.securityApi.get(`/account/${Id}`);
      }
}
