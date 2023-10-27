<template>
    <div class="proposal-container">
      <div class="proposal-title">
        <h1>Your Proposal</h1>
      </div>
      <form class="form">
        <div class="form-group">
          <label for="title">Title</label>
          <InputText class="custom-input" type="text" v-model="title" placeholder="Title"/>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <Textarea-v class="custom-input" v-model="description" rows="5" cols="30" placeholder="Description"/>
        </div>
        <div class="form-group">
          <!-- Agrega más campos de formulario aquí -->
        </div>
        <div class="form-group">
          <!-- Agrega más campos de formulario aquí -->
        </div>
        <div class="form-group">
          <!-- Agrega más campos de formulario aquí -->
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "Proposal-Form-Page",
    data() {
      return {
        value3: ""
      };
    }
  };
  </script>
  
  <style scoped>
  .proposal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .proposal-title {
    align-items: center;
    text-align: center;
    display: flex;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .proposal-title h1 {
    font-size: 24px;
  }
  
  .form {
    width: 100%; /* El formulario ocupará todo el ancho disponible */
    max-width: 500px; /* Establece un ancho máximo para una mejor legibilidad en pantallas anchas */
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .custom-input {
    width: 100%; /* El InputText ocupará todo el ancho del formulario */
  }
  </style>