<template>
    <div class="projects-card-container">
        <div>
            <div class="projects-cards">

                <Card-v v-for="projects in completedProposal" :key="projects" class="project-card">
                    <template #title>{{projects.title}}</template>
                    <template #content>
                        <div class="project-card-content">
                            <p>{{projects.description}}</p>
                            <div class="project-progress-button-container">
                                <router-link :to="'/project-details/' + projects.id">
                                    <button class="see-progress-button">
                                        <span>See details</span>
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
import { ProjectListService } from '../service/project-list.service';

    export default {
        name: 'Completed-Projects-Page',
        data() {
            return {
                proposals: [],
                completedProposal: [],
                businessProfileId: null,
                userProfileId: null,
            }
        },
        created(){
            this.loadCompletedProposal();
            this.getAccoundId();
            const storedProposals = localStorage.getItem('proposals')
            console.log(storedProposals)
        },
        methods: {
            loadCompletedProposal() {
                const projectService = new ProjectListService();
                projectService.geteProjects()
                    .then(response => {
                        this.proposals = response.data;
                        localStorage.setItem('proposals', JSON.stringify(this.projects));
                        this.completedProposal = this.proposals.filter((proposal) => proposal.status === 'Completado');
                        console.log('Propuestas:', this.proposals);
                        console.log('Propuestas completadas:', this.completedProposal);
                    }
                ).catch(error => {
                     console.log('Error al obtener las propuestas:', error);
                });
                
            },
            getAccoundId(){
                this.businessProfileId = JSON.parse(localStorage.getItem('account'))?.businessProfileId;
                this.userProfileId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
            }
        }
    }
</script>

<style>

</style>