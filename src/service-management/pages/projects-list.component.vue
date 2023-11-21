<template>
    <div class="projects-card-container">
        <div>
            <div class="projects-cards">

                <Card-v v-for="projects in aprovedProposal" :key="projects" class="project-card">
                    <template #title>{{projects.title}}</template>
                    <template #content>
                        <div class="project-card-content">
                            <p>{{projects.description}}</p>
                            <div class="project-progress-button-container">
                                <router-link :to="'/project/' + projects.id">
                                    <button class="see-progress-button">
                                        <span>See Progress</span>
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </Card-v>
            </div>
        </div>
    </div>
</template>

<script>
import {ProjectListService} from "@/service-management/service/project-list.service";

    export default {
        name: 'Projects-List-Page',
        data() {
            return {
                proposals: [],
                aprovedProposal: [],
                businessProfileId: null,
                userProfileId: null,
            }
        },
        created(){
          this.getAccoundId();
            this.loadAprovedProposal();
            const storedProposals = localStorage.getItem('proposals')
            console.log(storedProposals)
        },
        methods: {
            loadAprovedProposal() {
              const projectService = new ProjectListService()
                if(this.userProfileId){
                  projectService.getProjectsUserProfile(this.userProfileId)
                      .then(response => {
                            this.proposals = response.data;
                            localStorage.setItem('proposals', JSON.stringify(this.projects));
                            this.aprovedProposal = this.proposals.filter((proposal) => proposal.status === 'Pendiente');
                            console.log('Propuestas:', this.proposals);
                            console.log('Propuestas aprobadas:', this.aprovedProposal);
                          }
                      ).catch(error => {
                    console.log('Error al obtener las propuestas:', error);
                  });
                }else if(this.businessProfileId){
                  projectService.getProjectsBusinessProfile(this.businessProfileId)
                      .then(response => {
                            this.proposals = response.data;
                            localStorage.setItem('proposals', JSON.stringify(this.projects));
                            this.aprovedProposal = this.proposals.filter((proposal) => proposal.status === 'Pendiente');
                            console.log('Propuestas:', this.proposals);
                            console.log('Propuestas aprobadas:', this.aprovedProposal);
                          }
                      ).catch(error => {
                    console.log('Error al obtener las propuestas:', error);
                  });
              }
            },
            getAccoundId(){
                this.businessProfileId = JSON.parse(localStorage.getItem('account'))?.businessProfileId;
                this.userProfileId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
            },

        }
    }
</script>

<style>
.projects-card-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.projects-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.project-card {
    flex-direction: row;
    margin: 25px;
}
.project-card-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: justify;
}
.project-card-content p {
    width: 100%;
    padding: 0 20px 0 0;
}
.project-progress-button-container {
    display: flex;
    justify-content: center;
    width: 30%;
}
.see-progress-button{
    background-color: #ffffff;
    color: #02aa8b;
    border: 1px solid #02aa8b;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}
/* Estilos para pantallas más grandes (por ejemplo, escritorios) */
@media screen and (min-width: 768px) {
    .project-card-content {
        flex-direction: row;
        justify-content: space-between;
    }
}

/* Estilos para pantallas pequeñas (por ejemplo, dispositivos móviles) */
@media screen and (max-width: 767px) {
    .project-card-content {
        flex-direction: column;
    }
}
</style>