import http from "../../shared/services/http-common";

export class FavoriteService {
    getFavorite(userProfileId){
        return http.securityApi.get(`/favorite/${userProfileId}`);
    }
    addFavorite(user_profile, business_profile){
        return http.securityApi.post(`/userProfile/${user_profile}/businessProfile/${business_profile}`);
    }
    deleteFavorite(favoriteId){
        return http.securityApi.delete(`/favorite/${favoriteId}`);
    }
}