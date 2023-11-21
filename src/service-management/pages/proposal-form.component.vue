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
          <label for="activities">Activities</label>
          <div v-for="(activity, index) in activities" :key="index" class="input-with-button">
            <InputText id="activityInput" class="custom-input-2" type="text" v-model="activities[index].description" placeholder="Activity" />
            <button class="remove-button" @click="removeActivity(index)"><i class="pi pi-trash"></i></button>
          </div>
          <button class="add-button" type="button" @click="addActivity"><i class="pi pi-plus-circle"></i></button> <!-- Agrega type="button" aquí -->
        </div>
        <div class="form-group-2">
          <label for="resources">Resources</label>
          <div v-for="(resource, index) in resources" :key="index" class="input-with-button">
            <InputText class="custom-input-2" type="text" v-model="resources[index].name" placeholder="Resource" />
            <input class="quantity-form" type="number" v-model="resources[index].quantity" step="any" min="0" max="999999">
            <button class="remove-button" @click="removeResource(index)"><i class="pi pi-trash"></i></button>
          </div>
          <button class="add-button" type="button" @click="addResource"><i class="pi pi-plus-circle"></i></button>
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
  import { ProjectResourceService } from "../service/project-resource.service";
  import { ProjectActivityService } from "../service/project-activity.service";
  
  export default {
    name: "Proposal-Form-Page",
    props: ['proposalId'],
    data() {
      return {
        title: "",
        description: "",
        quantityForm: 0,
        file: "",
        activities: [{ description: "", isChecked: false }],
        resources: [{ name: "", quantity: 0 }],
      };
    },
    methods: {
      addActivity() {
        this.activities.push({ description: "", isChecked: false });
      },
      removeActivity(index) {
        this.activities.splice(index, 1); // Eliminar el campo de Activities en el índice especificado
      },
      addResource() {
      this.resources.push({ name: "", quantity: 0 }); // Ahora cada nuevo recurso tiene su propia variable quantity
      },
      removeResource(index) {
        this.resources.splice(index, 1); // Eliminar el campo de Resources en el índice especificado
      },
      
      async submitProposal() {
        const proposalService = new ProposalService();
        const activityService = new ProjectActivityService();
        const resourceService = new ProjectResourceService(); // Importa el servicio de recursos
      
        const proposalData = {
          title: this.title,
          description: this.description,
          file: this.file,
        };
      
        try {
          // Enviar la propuesta y obtener la respuesta
          const proposalResponse = await proposalService.updateProposal(
            this.proposalId,
            proposalData
          );
      
          if (proposalResponse.status === 200) {
            console.log("Proposal sent successfully", proposalResponse);
      
            // Crear un array de actividades con el formato correcto
            const validActivities = this.activities
              ? this.activities
                .filter((activity) => activity && activity.description)
                .map((activity) => ({
                  description: activity.description,
                  isChecked: activity.isChecked,
                }))
              : [];
      
            if (validActivities.length === 0) {
              // Si no hay actividades, agregar una actividad predeterminada
              validActivities.push({ description: "", isChecked: false });
            }
      
            // Enviar las actividades solo con descripciones válidas
            const activityData = {
              activities: validActivities,
            };
      
            const activityResponse = await activityService.createProjectActivity(
              this.proposalId,
              activityData
            );
      
            if (activityResponse.status === 200) {
              console.log("Activities sent successfully", activityResponse);
      
              // Enviar los recursos al backend
              const resourceResponses = await Promise.all(
                this.resources.map(async (resource) => {
                  const resourceData = {
                    quantity: resource.quantity,
                    description: resource.name,
                    image: "string",
                    isChecked: false,
                  };
      
                  return await resourceService.createProjectResource(
                    this.proposalId,
                    resourceData
                  );
                })
              );
      
              // Verifica si todas las respuestas de recursos fueron exitosas
              const allResourcesSentSuccessfully = resourceResponses.every(
                (response) => response.status === 200
              );
      
              if (allResourcesSentSuccessfully) {
                console.log("All resources sent successfully");
                // Puedes realizar más acciones después de enviar los recursos si es necesario.
              } else {
                console.error("Failed to send one or more resources");
              }
            } else {
              console.error("Failed to send activities", activityResponse);
            }
          } else {
            console.error("Failed to send proposal", proposalResponse);
          }
        } catch (error) {
          console.error("Error:", error);
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