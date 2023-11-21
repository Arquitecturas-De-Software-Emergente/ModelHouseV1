<template>
    <div class="page-container">
        <div class="title">
            <h1>Project Progress</h1>
        </div>
        <div class="page">
            <div class="progress-bar">
                <ProgressBar :value="combinedProgress"/>
            </div>
            <div class="description">
                <h2>Description:</h2>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, numquam voluptas laudantium nesciunt neque hic facilis doloremque ea quis minus ex fugit modi repudiandae. Fugit molestiae voluptate velit repudiandae officiis!</span>
            </div>
            <div class="files">
        
            </div>
            <div class="activities">
                <div class="progress-container">
                    <h3 class="text">Activities</h3>
                    <ProgressBar class="bar" :value="activitiesProgress" />
                </div>
                <div class="checkboxes-text">
                    <Checkbox-v v-model="activitiesChecked" :binary="true" @change="updateActivitiesProgress" />
                </div>
            </div>
            <div class="resources">
                <div class="progress-container">
                    <h3 class="text">Resources</h3>
                    <ProgressBar class="bar" c :value="resourcesProgress" />
                </div>
                <div class="resources-text">
                    <Checkbox-v v-model="resourcesChecked" :binary="true" @change="updateResourcesProgress" />
                </div>
            </div>
            <div class="button-container-client">
                <button @click="completeProject(proposal)" class="accept-button">Complete Project</button>
            </div>
        </div>
    </div>
</template>

<script>
import  { ref } from 'vue';
import {ProjectListService} from '../service/project-list.service';
    export default {
        name: 'Project-Progress-View-Page',
        props: ['proposalId'],
        data() {
            return
        },
        setup() {
            const activitiesProgress = ref(0);
            const resourcesProgress = ref(0);
            const combinedProgress = ref(0);
            
            const activitiesChecked = ref(false);
            const resourcesChecked = ref(false);
            
            const updateActivitiesProgress = () => {
                if (activitiesChecked.value) {
                  activitiesProgress.value = 100;
                } else {
                  activitiesProgress.value = 0;
                }
                updateCombinedProgress();
              };
              
              const updateResourcesProgress = () => {
                if (resourcesChecked.value) {
                  resourcesProgress.value = 100;
                } else {
                  resourcesProgress.value = 0;
                }
                updateCombinedProgress();
              };
              
              const updateCombinedProgress = () => {
                combinedProgress.value = (activitiesProgress.value + resourcesProgress.value) / 2;
              };
            
            return {
              activitiesProgress,
              resourcesProgress,
              combinedProgress,
              activitiesChecked,
              resourcesChecked,
              updateActivitiesProgress,
              updateResourcesProgress,
              proposal: []
            };
        },
        created() {
            const storedProposals = localStorage.getItem('proposals')
            console.log(storedProposals);
        },
        methods: {
        completeProject(proposal) {
          console.log('Projecto completado:', proposal)
          proposal.status = 'Completado'
          this.updateProjectByStatus(proposal.id, proposal.status, { status: 'Completado' })
        },
        updateProjectByStatus(id, status) {
          const projectListService = new ProjectListService()
          projectListService
            .updateProjectByStatus(id, status)
            .then(() => {
              if (status === 'Completado') {
                const message = 'Cambio de estado a Aprobado exitoso.'
                window.alert(message)
              } 
              window.location.reload()
            })
            .catch((error) => {
              console.error('Error al cambiar el estado de la propuesta:', error)
            })
        },
        }
    }
</script>

<style>
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.title {
    align-items: center;
    text-align: center;
    display: flex;
    padding: 10px;
}
.page {
    width: 100%; /* El formulario ocupará todo el ancho disponible */
    max-width: 1150px;
}
.activities {
    margin: 20px 0 20px 0;
}
.resources {
    margin: 20px 0 20px 0;
}
.progress-container {
    justify-content: space-between;
    display: flex;
    align-items: center; /* Para alinear verticalmente si es necesario */
}
.description {
    display: flex;
    flex-direction: column;
    padding: 30px 0 20px 0;
}
/* Estilos adicionales para refinar la apariencia si es necesario */
.text {
    display: flex;
    width: 10%;
}
.bar {
    display: flex;
    width: 85%;
}
</style>