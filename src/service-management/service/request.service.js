import http from "@/shared/services/http-common";
export class RequestService {
   /* 
  sendRequest(userId, businessId, data) {
    return http.serviceManagementApi.post(`/user/${userId}/business/${businessId}/request`, data);
  }
  getRequestsByBusinessId(businessId, status) {
    console.log(`/request/business/${businessId}/status/${status}`);
    return http.serviceManagementApi.get(`/business/${businessId}/status/${status}/request`);
  }
  getRequestsByUserId(userId, status) {
    return http.serviceManagementApi.get(`/user/${userId}/status/${status}/request`);
  }
    updateRequest(requestId, data) {
    return http.serviceManagementApi.put(`/request/${requestId}`, data);
  }
*/
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