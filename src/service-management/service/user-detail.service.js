import http from "../../shared/services/http-common";
export class UserProfile {
    searchUserProfile(accountId) {
        return http.securityApi.get(`/account/${accountId}/user_profile`);
      }
}
