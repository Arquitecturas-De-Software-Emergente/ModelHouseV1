import http from "@/shared/services/http-common";
export class ProjectListService {
    getProjectListByBusinessId(businessId){
        return http.securityApi.get(`/business_profile/${businessId}/project`);
    }
    getProjectById(id){
        return http.get(`/project/${id}/profile`);
    }
}