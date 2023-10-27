import http from "../../shared/services/http-common";

export class ProyectActivityService {
    createProjectActivity(proposalId, data) {
        return http.serviceManagementApi.post(
        `/proposal/${proposalId}/project_activity`,
        data
        );
    }

    getProjectActivity(proposalId) {
        return http.serviceManagementApi.get(
        `/proposal/${proposalId}/project_activity`
        );
    }

    updateProjectActivity(id, data) {
        return http.serviceManagementApi.put(`/project_activity/${id}`, data);
    }
}
