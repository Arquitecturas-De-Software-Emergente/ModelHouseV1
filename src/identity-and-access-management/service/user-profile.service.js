import http from "../../shared/services/http-common";

export class UserProfile {
  searchUserProfile(userId) {
    return http.localApi.get(`/user/${userId}/user_profile`);
  }

  async uploadFile(file, userProfile) {
    try {
      const uri = `user_profile/upload/${userProfile}`; 
      const request = new FormData();
      request.append('file', file);

      const response = await http.localApi.post(uri, request);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error("Error in uploadFile:", error);
    }
    return false;
  }

  async createProfile(id, phoneNumber, firstName, lastName, gender, address) {
    try {
      const uri = `account/${id}/user_profile`; 
      const response = await http.localApi.post(uri, {
        phoneNumber,
        firstName,
        lastName,
        gender,
        address,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in createProfile:", error);
    }
    return null;
  }

  async updateUserProfile(phoneNumber, firstName, lastName, gender, address, id) {
    try {
      const uri = `user_profile/${id}`; 
      const response = await http.localApi.put(uri, {
        phoneNumber,
        firstName,
        lastName,
        gender,
        address,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
    }
    return null;
  }
}
