<template>
    <div class="content">
      <h1>{{ title }}</h1>
      <form @submit.prevent="submitForm" class="p-fluid">
        <div class="p-field">
          <label for="name">Nombre:</label>
          <InputText id="name" v-model="profile.name" required />
        </div>
  
        <div class="p-field">
          <label for="description">Descripción:</label>
          <Textarea id="description" v-model="profile.description" rows="4" required />
        </div>
  
        <div class="p-field">
          <label for="address">Dirección:</label>
          <InputText id="address" v-model="profile.address" />
        </div>
  
        <div class="p-field">
          <label for="webSite">Sitio Web:</label>
          <InputText id="webSite" v-model="profile.webSite" />
        </div>
  
        <div class="p-field">
          <label for="phoneNumber">Número de Teléfono:</label>
          <InputText id="phoneNumber" type="number" v-model="profile.phoneNumber" />
        </div>
        <div class="form-group-2">
            <input
            class="file-form"
            type="file"
            name="demo[]"
            accept="*/*"
            id="fileUpload"
            style="display: none"
            multiple
            />
            <label for="fileUpload" class="file-upload-label"
            >Add File <i class="pi pi-file"></i>
            </label>
        </div>
        <Dialog-v v-model="showDialog" header="Solicitud Enviada" :visible="this.showDialog">
            <p>Tu solicitud se ha enviado con éxito.</p>
            <button @click="closeDialog">Cerrar</button>
        </Dialog-v>
        <div class="p-field">
          <Button-v type="submit" label="Guardar" class="p-button-success" />
        </div>
        </form>       
    </div>
</template>
<script>
export default {
    name: "formBusinessProfile",
    components: {
        
    },
    data() {
      return {
        title: 'Business Profile',
        profile: {
            name: '',
            description: '',
            address: '',
            webSite: '',
            phoneNumber: '',
        },
        showDialog: false,
      };
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', JSON.stringify(this.profile));
        },
    }
}
</script>
<style scoped>
    .content {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    }

    h1 {
    text-align: center;
    }
    .file-upload-label {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e6e6e6;
        border: none;
        padding: 12px;
        border-radius: 5px;
        margin: 10px 0;
    }
    .p-fluid .p-field {
    margin-bottom: 20px;
    }

    label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    }

    .p-inputtext,
    .p-inputtextarea,
    .p-button {
    width: 100%;
    box-sizing: border-box;
    }

    .p-button-success {
        background-color: #004A63;
        color: #fff;
        margin-top: 10px;  
    }
</style>