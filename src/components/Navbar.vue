<template>
  <div class="nav">
    <h1 class="app-logo"><span class="clip">TaskApp</span></h1>
    <div class="user-container">
      <!-- Aqui declaramos el boton que realiza la sesion out -->
      <button class="logOut" @click="logOut()">Cerrar sesion</button>
    </div>
  </div>
</template>
<script setup>
//Definimos un emite para enviar informacion a la funcion en Home de logOut
const emit = defineEmits(["log-out"]);

const logOut = () => {
  emit("log-out");
};
</script>
<style scoped>

.user-container{
    grid-column: 3;
    margin: auto auto auto auto;
}
.nav {
  text-align: center;
  display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    top: 0;
    right: 0;
    position: fixed;
    width: 100%;
    background-color: transparent;
    backdrop-filter: saturate(50%) blur(8px);
}

.app-logo {
  color: transparent;
  grid-column: 2;
    margin: 40px auto;
}

.logOut:hover{
  border-color: #fd1d7c;
  color: #fd1d7c;
  transition: 0.5s ease;
}

.clip {
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
