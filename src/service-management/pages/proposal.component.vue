<template>
    <div class="cards-container">
        <div v-if = 'this.businessProfileId == null'>
            <div class="proposal-cards">
                <div v-for="proposal in sentProposals" :key="proposal.id" class="proposal-card">
                    <div class="card-body">
                        <span>{{ proposal.description }}</span>
                    </div>
                    <div class="proposal-button-container">
                        <router-link :to ="'/proposal-form/' + proposal.id">
                            <button class="create-proposal-button-form">
                                <span>Elaborate Proposal</span>
                            </button>
                        </router-link>
                    </div>
                </div>
                <div v-for="proposal in pendingProposals" :key="proposal.id" class="proposal-card">
                    <div class="card-body">
                        <span>{{ proposal.description }}</span>
                    </div>
                    <div class="status-message">
                        <span>Pending</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if='this.businessProfileId != null'>
            <div class="proposal-cards">
                <div v-for="proposal in sentProposals" :key="proposal.id" class="proposal-card">
                    <div class="card-body">
                        <span>{{ proposal.description }}</span>
                    </div>
                    <div>
                        <span>Sent</span>
                    </div>
                </div>
                <div v-for="proposal in pendingProposals" :key="proposal.id" class="proposal-card">
                    <div class="card-body">
                        <span>{{ proposal.description }}</span>
                    </div>
                    <div class="proposal-button-container">
                        <router-link :to ="'/proposal-form/' + proposal.id">
                            <button class="create-proposal-button-form">
                                <span>Elaborate Proposal</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ProposalService } from '../service/proposal.service';

export default {
    name: "Proposal-Page",
    data(){
        return{
            proposals: [],
            pendingProposals: [],
            sentProposals: [],
            businessProfileId: null,
        }
    },
    created(){
        this.loadProposalsPending();
        this.loadProposalSent();
        this.getAccoundId();
        const storedProposals = localStorage.getItem('proposals')
        console.log(storedProposals);
        // if(storedProposals) {
        //     this.proposals = JSON.parse(storedProposals);
        //     this.loadProposalsPending();
        // }
    },
    methods: {
        loadProposalsPending() {
            const proposalService = new ProposalService();
            proposalService
                .getProposal()
                .then((response) => {
                    this.proposals = response.data;
                    localStorage.setItem('proposals', JSON.stringify(this.proposals));
                    this.pendingProposals = this.proposals.filter((proposal) => proposal.status === 'Pendiente');
                    console.log('Propuestas:', this.proposals);
                    console.log('Propuestas pendientes:', this.pendingProposals);
                }
            ).catch((error) => {
                console.error('Error al obtener las propuestas:', error);
            });
        },
        loadProposalSent(){
            const proposalService = new ProposalService();
            proposalService
                .getProposal()
                .then((response) => {
                    this.proposals = response.data;
                    localStorage.setItem('proposals', JSON.stringify(this.proposals));
                    this.sentProposals = this.proposals.filter((proposal) => proposal.status === 'Enviado');
                    console.log('Propuestas:', this.proposals);
                    console.log('Propuestas enviadas:', this.sentProposals);
                }
            ).catch((error) => {
                console.error('Error al obtener las propuestas:', error);
            });
        },
        getAccoundId(){
            this.businessProfileId = JSON.parse(localStorage.getItem('account'))?.businessProfileId;
            console.log(this.businessProfileId);
        }

    }
}
</script>

<style>
.cards-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.proposal-cards{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
}
.proposal-card{
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}
.card{
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
}
.card-body {
  padding: 1rem;
}
.proposal-button-container{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.create-proposal-button-form{
    background-color: #02aa8b;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
}
.create-proposal-button-form:hover{
    background-color: #048071;
}
</style>