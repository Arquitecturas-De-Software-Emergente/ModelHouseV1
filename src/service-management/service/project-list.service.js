import http from "@/shared/services/http-common";
export class ProjectListService {
    getProjectListByBusinessId(businessId){
        return http.securityApi.get(`/business_profile/${businessId}/project`);
    }
    getProjectById(id){
        return http.securityApi.get(`/project/${id}/profile`);
    }
    geteProjects() {
        return http.securityApi.get(`/project`);
    }
    getProjectsBusinessProfile(businessId) {
        return http.securityApi.get(`/project/${businessId}/business_profile`);
    }
    getProjectsUserProfile(userId) {
        return http.securityApi.get(`/project/${userId}/user_profile`);
    }
    updateProjectByStatus(id, status) {
        return http.securityApi.put(`/project/${id}/status/${status}`);
    }
}