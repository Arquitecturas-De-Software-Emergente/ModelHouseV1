import http from "@/shared/services/http-common";
export class ProposalService {
    getProposalByRequestId(requestId) {
        return http.serviceManagementApi.get(`/request/${requestId}/proposal`);
    }
    getProposal() {
        return http.serviceManagementApi.get(`/proposal`);
    }
    updateProposal(id, data) {
        return http.serviceManagementApi.put(`/proposal/${id}`, data);
    }
    updateProposalByStatus(id, data) {
        return http.serviceManagementApi.put(`/proposal/${id}/status`, data);
    }
}