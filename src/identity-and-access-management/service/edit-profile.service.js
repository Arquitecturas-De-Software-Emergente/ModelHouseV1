import http from "../../shared/services/http-common";
export class EditProfileService{
    userprofileByUserId(Id){
        return http.securityApi.get(`/user_profile/${Id}`);
    }
    businessProfileByUserId(Id){
        return http.securityApi.get(`/business_profile/${Id}`);
    }
    updateProfileByUserId(userId, data){
        return http.securityApi.put(`/user_profile/${userId}`, data);
    }
}