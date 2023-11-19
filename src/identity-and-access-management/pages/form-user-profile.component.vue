<template>
    <div class="content">
        <h1>{{ title }}</h1>
        <form @submit.prevent="submitForm" class="p-fluid">
            <div class="name-content">
                <div class="p-field">
                    <label for="name">First Name:</label>
                    <InputText id="name" v-model="profile.firstName" required />
                </div>
                <div class="p-field">
                    <label for="name">Last Name:</label>
                    <InputText id="name" v-model="profile.lastName" required />
                </div>
            </div>

            <div class="p-field">
                <label for="address">Gender:</label>
                <InputText id="address" v-model="profile.gender" required />
            </div>

            <div class="p-field">
                <label for="webSite">Address:</label>
                <InputText id="webSite" v-model="profile.address" required />
            </div>

            <div class="p-field">
                <label for="phoneNumber">Número de Teléfono:</label>
                <InputText id="phoneNumber" type="number" v-model="profile.phoneNumber" />
            </div>
            <div class="form-group-2">
                <input class="file-form" type="file" name="demo[]" accept="image/*" id="fileUpload" style="display: none"
                    @change="handleFileUpload" multiple />
                <label for="fileUpload" class="file-upload-label">
                    Add File <i class="pi pi-image"></i>
                </label>
            </div>

            <Dialog v-model="showDialog" header="Solicitud Enviada" :visible="showDialog">
                <p>Tu solicitud se ha enviado con éxito.</p>
                <div v-if="images.length > 0">
                    <h3>Imágenes Cargadas:</h3>
                    <ul>
                        <li v-for="(image, index) in images" :key="index">
                            <img :src="image" alt="Imagen"
                                style="max-width: 100%; max-height: 200px; margin-bottom: 10px;" />
                        </li>
                    </ul>
                </div>
                <button @click="closeDialog">Cerrar</button>
            </Dialog>
            <div class="p-field">
                <Button-v type="submit" label="Guardar" class="p-button-success" />
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "formUserProfile",
    data() {
        return {
            title: 'User Profile',
            profile: {
                firstName: '',
                lastName: '',
                gender: '',
                address: '',
                phoneNumber: '',
            },
            showDialog: false,
            images: [],
        };
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', JSON.stringify(this.profile));
        },
        handleFileUpload(event) {
            const input = event.target;
            if (input.files && input.files.length > 0) {
                this.images = [];
                for (let i = 0; i < input.files.length; i++) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.images.push(e.target.result);
                    };
                    reader.readAsDataURL(input.files[i]);
                }
                this.showDialog = true;
            }
        },
        closeDialog() {
            this.showDialog = false;
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

.name-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
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