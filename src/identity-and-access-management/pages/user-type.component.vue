<template>
    <div class="content">
        <h1>{{ title }}</h1>
        <div class="options">
            <div class="card" @click="selectProfile('user')">
                <img src="https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-users-icon-png-image_856952.jpg" alt="User Profile" />
                <p>User Profile</p>
            </div>
            <div class="card" @click="selectProfile('business')">
                <img src="https://png.pngtree.com/element_our/20190602/ourlarge/pngtree-company-office-goods-tool-staff-free-button-map-image_1377102.jpg" alt="Business Profile" />
                <p>Business Profile</p>
            </div>
        </div>
    </div>
  </template>
<script> 

export default {
    name: "userType",
    data() {
      return {
        title: 'User Type',
      };
    },
    methods: {
      selectProfile(profileType) {
        if(profileType == "user")
            this.$router.push({
                name: "form-user-profile"
            })
        else if(profileType == "business")
            this.$router.push({
                name: "form-business-profile"
            })
      },
    },
  };
</script>
  
  <style scoped>
    .content {
      text-align: center;
    }
  
    .options {
      display: flex;
      justify-content: space-around;
      margin-top: 100px;
      gap: 20px;
    }
    .card{
        cursor: pointer;
    }
    .card img {
      width: 150px; /* ajusta el tamaño según sea necesario */
      height: 150px; /* ajusta el tamaño según sea necesario */
      border-radius: 50%; /* para hacer las imágenes redondas, si lo deseas */
    }
</style>