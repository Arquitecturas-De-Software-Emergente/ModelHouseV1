import http from "../../shared/services/http-common";
export class BusinessListService {
  searchRemodeler() {
    return http.securityApi.get("/business_profile");
  }
  searchBusinessProfile(businessId, state) {
    return http.get(`/account/${businessId}/business_profile`, state);
  }
}
