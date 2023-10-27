import http from "@/shared/services/http-common";
export class ProposalService {
    createProposal(requestId, data) {
        return http.serviceManagementApi.post(`/request/${requestId}/proposal`, data);
    }
    getProposal(requestId) {
        return http.serviceManagementApi.get(`/request/${requestId}/proposal`);
    }
    updateProposal(requestId, data) {
        return http.serviceManagementApi.put(`/request/${requestId}/proposal`, data);
    }
}