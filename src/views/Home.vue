<template>
  <header>
    <div class="user-container">
      <!-- Aqui declaramos el boton que realiza la sesion out -->
    <button class="logOut" @click="logOut()">Log Out</button>
    </div>
    <div class="logo-container">
      <!-- aqui incluimos el navbar  -->
      <Navbar/>
    </div>
  </header>

<div class="main-container">
  <!-- Agregamos un v-if para determinar 
    si hay elemento de tasks en display e invitar a crear uno -->
  <div v-if="tasks == ![]"><p>Aun no tienes tareas <br>Agrega una nueva! :)</p></div>
  <!-- Con este boton mostramos el div con V-if=show -->
  <button @click="showNewTask2()">Agrega una tarea</button>
</div>
<Transition>
<div v-if="show">

  <!-- Aqui volvemos a poner el showNewTask para cerrar con el fondo oscuro -->
<div @click="showNewTask2()" class="background-task-effect" id="backTask"></div>

<div class="card-container new-task" id="newTask">
  <!-- el @add-task es una funcion dentro del componente de NewTask para llamar
        a la funcion setNewTask en Home.vue(componente actual) -->
<NewTask class="newTaskBox" 
@add-task="setNewTask"
@show="showNewTask2"

/>
</div>

</div>

</Transition>
<Transition appear>
      <TaskCard :task="useTask.task"
          @toggleTask="toggleTask"
          @editTask="updateTask"
          @deleteTask="deleteTask"/>
</Transition>

</template>
<script setup>
import { useRouter } from 'vue-router'
import {supabase} from '../api/index'
import Navbar from '../components/Navbar.vue'
import NewTask from '../components/NewTask.vue'
import { useTaskStore } from '../store/task'
import {useStore} from "../store/auth"
import TaskCard from "../components/TaskCard.vue"
import { ref } from 'vue'

const useTask = useTaskStore();
const router = useRouter();
const userStore = useStore()
const tasks = ref([]);
const show = ref(false)


//***************************** */
//AQUI LAS FUNCIONES DE TASK

//con esto actualizamos valores del task
const pullTasks = async () => {
  tasks.value = await useTask.fetchTasks();
};

pullTasks();

//FUNCION PARA AGREGAR NUEVOS TASK

async function setNewTask(task){
  await useTask.addTask(task.name, task.description);
  pullTasks();
}

const updateTask = async (title, description, id) => {
  await useTaskStore().updateTask(title, description, id);
  pullTasks();
};

const toggleTask = async (toggle, id) => {
  await useTask.toggleTask(toggle, id);
  pullTasks();
};

const deleteTask = async (id) => {
  await useTaskStore().deleteTask(id);
  pullTasks();
};

//***************************** */

//CIERRA SESION Y NOS REGRESA AL AUTH/LOGIN

  const logOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await supabase.auth.signOut();
    // redirects user to the login
    router.push({ name: "login" })

  } catch (error) {
    console.log(error,'logout')
  }
};

//MOSTRAR LA OPCION DE NEW TASK Y OSCURECER EL FONDO CON V-IF mas resumido.

const showNewTask2 = () =>{
show.value= !show.value
}

//Antiguo codigo para show y hidden

// const showNewTask = () => {
//   document.getElementById("newTask").classList.add('show')
//   document.getElementById("backTask").classList.add('show')
// }

//SALIR DE NEW TASK CUANDO SE HACE CLICK AL FONDO OSCURO

// window.addEventListener('click', function(e){
	
// 	if (document.getElementById('backTask').contains(e.target)){
//     document.getElementById("backTask").classList.remove('show')
//     document.getElementById("newTask").classList.remove('show')
//   } 
//   else{
//   {
// }
//   }
// })



</script>
<style scoped>

.user-container{
    margin: 30px;
    display: flex;
    justify-content: flex-end;
    
}
.logOut:hover{
  border-color: #fd1d7c;
  color: #fd1d7c;
}

.hidden{
  display:none;
}
.show{
  display:block!important;
}

.main-container {
  margin-top: 100px;
  max-width: 1280px;

  text-align: center;
  place-items:center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.new-task{
  position: absolute; 
  position:absolute; 
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 210px;
}

.logo-container{
  margin-top: -40px;
}

.background-task-effect{
  background:rgba(0, 0, 0, 0.60);
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;

}

#app{
  max-width: 1200px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}



</style>