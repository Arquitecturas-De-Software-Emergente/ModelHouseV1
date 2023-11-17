import http from "../../shared/services/http-common";
export class EditProfileService{
    profileByUserId(accountId){
        return http.localApi.get(`/account/${accountId}/user_profile`);
    }
    updateProfileByUserId(userId, data){
        return http.localApi.put(`/user_profile/${userId}`, data);
    }
}