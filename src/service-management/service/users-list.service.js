import http from "../../shared/services/http-common";
export class UserListService {
  searchUserProfile(accountId) {
    return http.securityApi.get(`/account/${accountId}/user_profile`);
  }
}