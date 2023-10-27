<template>
    <div class="app-container">
        <aside class="sidebar">
            <!-- Logo de la aplicación -->
            <div>
                <router-link to="/" class="logo-container">
                    <img src="src\assets\logo.png" class="logo" alt="ModelHouse">
                </router-link>
            </div>
            <!-- Contenido de la barra lateral -->
            <ul>
                <div v-for="item in sidebarItems" :key="item.id" class="sidebar-content" :class="{ selected: item.id === selectedItemId }" @click="selectItem(item.id)">
                    <router-link :to="item.route">
                        <li>
                            <i :class="item.iconClass"></i>
                            <br>{{ item.label }}
                        </li>
                    </router-link>
                </div>
            </ul>
        </aside>
    </div>
    
</template>
<script>
export default {
    name: "SideBar",
    data(){
        return{
            sidebarItems: [
                { id: 'search', label: 'Search', route: '/home', iconClass: 'pi pi-search' },
                { id: 'request', label: 'Request', route: '/request/1', iconClass: 'pi pi-send' },
                { id: 'notification', label: 'Notification', route: '/notification', iconClass: 'pi pi-bell' },
                { id: 'settings', label: 'Settings', route: '/settings', iconClass: 'pi pi-cog' },
            ],
        selectedItemId: null,
        };
    },
    methods: {
        selectItem(itemId) {
            this.selectedItemId = itemId;
        },
    },
}
</script>

<style scoped>

.app-container {
    display: flex;
    height: 100vh;
}
.sidebar {
    flex: 0 0 160px; /* Ancho fijo de la barra lateral */
    background-color: #004A63;
    color: #fff;
    overflow-y: auto;
    flex-direction: column;
    align-items: center /* Añadir desplazamiento si el contenido es demasiado largo */
}
.sidebar-content {
    cursor: pointer;
    align-items: center; /* Centra horizontalmente */
    text-align: center;
    padding: 10px;
}
.sidebar-content i{
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
}
.logo {
    margin-top: 10px;
    max-width: 100%; /* Asegura que la imagen no sea más ancha que el contenedor */
    height: auto; /* Mantiene la relación de aspecto de la imagen */
    padding: 20px; /* Añade espacio alrededor del logo si es necesario */
}
.logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search-button {
    display: flex;
    align-items: center; /* Centra verticalmente el contenido */
    justify-content: center; /* Centra horizontalmente el contenido */
}

.selected {
    background-color: #0080AB; /* Cambia el color de fondo a tu elección */
    color: #fff;
    border-radius: 21px; /* Cambia el color del texto cuando está seleccionado */
}

@media (max-width: 790px) {
    .sidebar {
        width: 100%; /* Ancho del sidebar en pantallas pequeñas */
  }
}

ul {
    list-style: none;
    padding: 15px;
}

li {
    padding: 10px;
}

a {
    text-decoration: none;
    color: #fff;
}
</style>