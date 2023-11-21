import http from "../../shared/services/http-common";
export class BusinessListService {
  searchRemodeler(filter) {
    return http.securityApi.get("/business_profile", {
      params: {
        filter: filter
      }
    });
  }
  searchBusinessProfile(accountId) {
    return http.securityApi.get(`/account/${accountId}/business_profile`);
  }

}
