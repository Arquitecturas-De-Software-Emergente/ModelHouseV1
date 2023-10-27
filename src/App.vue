<script setup>
  import SideBar from "@/public/components/sidebar.component.vue";
</script>

<template>
  <!-- <SideBar/>
  <router-view ></router-view> -->

  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Contenido de tu sidebar -->
      <SideBar/>
    </aside>
    <!-- Contenido Principal -->
    <main class="content">
      <!-- Contenido principal de tu aplicación --> 
      <router-view ></router-view>
    </main>
  </div>

</template>

<style scoped>

.container {
  display: flex; /* Utilizamos flexbox para el diseño */
  flex-wrap: wrap; /* Permite que los elementos se envuelvan cuando no haya suficiente espacio */
}

.sidebar {
  flex: 0 0 150px; /* Ancho fijo para el sidebar */
  background-color: #004A63;
  height: 100vh;
}

.content {
  padding: 50px;

  flex: 1; /* El contenido principal ocupa todo el espacio restante */
  background-color: #ffffff; /* Color de fondo del contenido principal */
}

@media (min-width: 1024px) {

}
</style>
