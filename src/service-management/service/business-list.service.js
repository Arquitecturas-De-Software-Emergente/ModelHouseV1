import http from "../../shared/services/http-common";
export class BusinessListService {
  searchRemodeler() {
    return http.securityApi.get("/business_profile");
  }
  searchBusinessProfile(accountId) {
    return http.securityApi.get(`/account/${accountId}/business_profile`);
  }

}
