import http from "@/shared/services/http-common";
export class ReviewService {
    getReviewProjectId(projectId) {
        return http.serviceManagementApi.get(`/review/${projectId}`);
    }
    createReview(projectId,userProfileId, data) {
        return http.serviceManagementApi.post(`project/${projectId}/user_profile/${userProfileId}/review`, data);
    }
    deleteReview(id) {
        return http.serviceManagementApi.delete(`/review/${id}`);
    }
}