import http from "@/shared/services/http-common";
export class RequestService {

getRequests(){
  return http.serviceManagementApi.get(`/request`);

}
sendRequest(userId, businessId, data) {
  return http.serviceManagementApi.post(`/userProfile/${userId}/businessProfile/${businessId}/request`, data);
}
getRequestsByUserId(userProfileId, status) {
  return http.serviceManagementApi.get(`/userProfile/${userProfileId}/status/${status}/request`);
}
  getRequestsByBusinessId(businessProfileId, status) {
    return http.serviceManagementApi.get(`/businessProfile/${businessProfileId}/status/${status}/request`);
  }
  changeRequestStatus(requestId, data) {
    return http.serviceManagementApi.put(`/request/${requestId}`, data);
  }
}