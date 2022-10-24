<template>
  <header>
    <div class="user-container">
    <button class="logOut" @click="logOut()">Log Out</button>
    </div>
    <div class="logo-container">
      <Navbar/>
    </div>
  </header>

<div class="main-container">
  <p>Aun no tienes tareas</p>
  <button @click="showNewTask()">Agrega una tarea</button>
</div>
<div class="background-task-effect hidden" id="backTask"></div>
<div class="hidden card-container new-task" id="newTask">
  <NewTask @add-task="setNewTask"/>
</div>
<TaskCard :task="addNewTask.task"/>

</template>
<script setup>
import { useRouter } from 'vue-router'
import {supabase} from '../api/index'
import Navbar from '../components/Navbar.vue'
import NewTask from '../components/NewTask.vue'
import { useTaskStore } from '../store/task'
import {useStore} from "../store/auth"
import TaskCard from "../components/TaskCard.vue"

const addNewTask = useTaskStore();
const router = useRouter();
const userStore = useStore()

console.log(addNewTask.task,"addNewTask.task")

addNewTask.fetchTasks();

//FUNCION PARA AGREGAR NUEVOS TASK

async function setNewTask(task){
  await addNewTask.addTask(task.name, task.description);
  addNewTask.fetchTasks();
  console.log(task)
}

//CIERRA SESION Y NOS REGRESA AL AUTH/LOGIN

  const logOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await supabase.auth.signOut();
    // redirects user to the login
    router.push({ path: "/auth/login" })

  } catch (error) {
    console.log(error,'logout')
  }
};

//MOSTRAR LA OPCION DE NEW TASK Y OSCURECER EL FONDO

const showNewTask = () => {
  document.getElementById("newTask").classList.add('show')
  document.getElementById("backTask").classList.add('show')
}

//SALIR DE NEW TASK CUANDO SE HACE CLICK AL FONDO OSCURO

window.addEventListener('click', function(e){
	
	if (document.getElementById('backTask').contains(e.target)){
    document.getElementById("backTask").classList.remove('show')
    document.getElementById("newTask").classList.remove('show')
  } 
  else{
  {
}
  }
})

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
  background:rgba(0, 0, 0, 0.40);
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;

}


</style>