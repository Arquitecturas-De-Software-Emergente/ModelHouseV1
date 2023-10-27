<template>
    <div class="proposal-container">
      <div class="proposal-title">
        <h1>Your Proposal</h1>
      </div>
      <form class="form">
        <div class="form-group">
          <label for="title">Title</label>
          <InputText id="title" class="custom-input" type="text" v-model="title" placeholder="Title"/>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <Textarea-v id="description" class="custom-input" autoResize v-model="description" rows="5" cols="30" placeholder="Description"/>
        </div>
        <div class="form-group-2">
          <input class="file-form" type="file" name="demo[]" accept="*/*" id="fileUpload" style="display: none;" multiple>
          <label for="fileUpload" class="file-upload-label">Add File <i class="pi pi-file"></i>
          </label>
        </div>
        <div class="form-group-2">
          <label for="activities">Activities</label>
          <div v-for="(activity, index) in activities" :key="index" class="input-with-button">
            <InputText id="activities" class="custom-input-2" type="text" v-model="activities[index]" placeholder="Activity" />
            <button class="remove-button" @click="removeActivity(index)"><i class="pi pi-trash"></i></button>
          </div>
          <button class="add-button" type="button" @click="addActivity"><i class="pi pi-plus-circle"></i></button> <!-- Agrega type="button" aquí -->
          <!-- <InputText class="custom-input-2" type="text" v-model="activities" placeholder="Activities"/> -->
        </div>
        <div class="form-group-2">
          <label for ="resources">Resources</label>
          <div v-for="(resource, index) in resources" :key="index" class="input-with-button">
            <InputText class="custom-input-2" type="text" v-model="resources[index]" placeholder="Resource" />
            <input id="quantityForm" class="quantity-form" type="number" v-model="quantityForm" step="any" min="0" max="999999">
            <button class="remove-button" @click="removeResource(index)"><i class="pi pi-trash"></i></button>
          </div>
          <button class="add-button" type="button" @click="addResource"><i class="pi pi-plus-circle"></i>
          </button>
        </div>
        <div class="submit-button">
          <button class="submit-button-form" @click.prevent="submitProposal">
            <span class="submit-button-label">Send</span>
          </button>
        </div>
      </form>
    </div>
  </template>
  
<script>
  import { ProposalService } from "../service/proposal.service";
  // import { ProjectResourceService } from "../service/project-resource.service";
  // import { ProjectActivityService } from "../service/project-activity.service";
  export default {
    name: "Proposal-Form-Page",
    props: ['proposalId'],
    data() {
      return {
        title: "",
        description: "",
        quantityForm: 0,
        file: "",
        activities: [""],
        resources: [""],
      };
    },
    methods: {
      addActivity() {
        this.activities.push(""); // Agregar un nuevo campo vacío para Activities
      },
      removeActivity(index) {
        this.activities.splice(index, 1); // Eliminar el campo de Activities en el índice especificado
      },
      addResource() {
        this.resources.push(""); // Agregar un nuevo campo vacío para Resources
      },
      removeResource(index) {
        this.resources.splice(index, 1); // Eliminar el campo de Resources en el índice especificado
      },
      
      submitProposal() {
        const proposalService = new ProposalService();
        console.log('Proposal-Form-Page created111')
          const proposalData = {
            title: this.title,
            description: this.description,
            file: this.file,
            // activities: this.activities,
            // resources: this.resources,
          };
          console.log(proposalData)
          const response = proposalService.updateProposal(this.proposalId, proposalData)
          console.log('Response:', response.status)
          if (response.status === 200) {
            console.log('Proposal sent successfully', response)
          } 
      },
    },
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

  .form-group-2 {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .form-group-2 label {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .custom-input {
    width: 100%; /* El InputText ocupará todo el ancho del formulario */
  }
  .custom-input-2{
    background-color: #E6E6E6;
    width: 100%;
    border: none;
  }
  .remove-button{
    border: none;
    background-color: #E6E6E6;
    border-radius: 5px;
    padding: 12px;
    margin: 0 0 0 10px;
    cursor: pointer
  }
  .add-button {
    cursor: pointer;
    background-color: #E6E6E6;
    border: none;
    padding: 5px;
    border-radius: 5px;
    height: 45px;
    margin: 0 0 10px;
  }
  .quantity-form {
    width: 30%;
    margin: 0 0 0 10px;
    border-radius: 5px;
    padding: 12px;
    border: none;
    background-color: #E6E6E6;
  }
  .input-with-button {
    display: flex;
    align-items: center;
    padding: 0 0 10px 0;
  }
  .file-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;;
  }
  .file-upload-label{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #E6E6E6;
    border: none;
    padding: 12px;
    border-radius: 5px;
    margin: 10px 0; 
  }
  .file-upload-label i {
    margin: 0 0 0 10px;
  }

  .submit-button{
    display: flex;
    justify-content: center;
  }
  .submit-button-form{
    cursor: pointer;
    background-color: #02AA8B;
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 25px;
    height: 45px;
    width: 80%;
  }
</style>