import http from "../../shared/services/http-common";

export class ProjectResourceService {
    createProjectResource(proposalId, data) {
        return http.serviceManagementApi.post(
        `/proposal/${proposalId}/project_resource`,
        data
        );
    }
    getProjectResource(proposalId) {
        return http.serviceManagementApi.get(
        `/proposal/${proposalId}/project_resource`
        );
    }
    updateProjectResource(id, data) {
        return http.serviceManagementApi.put(`/project_resource/${id}`, data);
    }
}
