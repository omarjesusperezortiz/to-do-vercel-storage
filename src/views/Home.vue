<template>
  <header>

    <div class="logo-container">
      <!-- aqui incluimos el navbar  -->
      <Navbar
      @log-out="logOut"/>
    </div>
  </header>

<div class="main-container">
  <!-- Agregamos un v-if para determinar 
    si hay elemento de tasks en display e invitar a crear uno -->
    <!-- <Transition name="notask"> -->
  <div class="dotasks" :class="{ appear: tasks == ![] }" >
   <h3>No tienes tareas. <br>Agrega una nueva! ;)</h3>
  </div>
    <!-- </Transition> -->
  <!-- Con este boton mostramos el div con V-if=show -->
  <button class="AgregarTarea" @click="showNewTask2()"> 
     <!-- <i class="fa-solid fa-plus"></i>  -->
     <span class="agregartext">  Agregar tarea</span>
     <span class="commandkey">⌘K</span>
    </button>
</div>
<Transition>
<div v-if="show" >

  <!-- Aqui volvemos a poner el showNewTask para cerrar con el fondo oscuro -->
<div @click="showNewTask2()"   class="background-task-effect" id="backTask"></div>

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

      <TaskCard :task="useTask.task"
          @toggleTask="toggleTask"
          @editTask="updateTask"
          @deleteTask="deleteTask"/>


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
import { storeToRefs } from "pinia";

const useTask = useTaskStore();
const router = useRouter();
const userStore = useStore()
const tasks = ref([]);
const show = ref(false)
const {user} = storeToRefs(userStore);


// Con esto actualizamos valores del user despues de hacer el login al Home
const pullUser = async () => {
  await userStore.fetchUser();
  console.log("Hola!,",user.value.email)
};

pullUser();

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
    // console.log(error,'logout')
  }
};

//MOSTRAR LA OPCION DE NEW TASK Y OSCURECER EL FONDO CON V-IF mas resumido.

const showNewTask2 = () =>{
show.value= !show.value
}


//CERRAMOS EL NEW TASK CON LETRA ESC

document.addEventListener('keydown', (event) => {
        
        if (event.key === 'Escape') {
         //if esc key was not pressed in combination with ctrl or alt or shift
            const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
            if (isNotCombinedKey) {
                    show.value = false
                    // console.log(show.value,'valor de show')
              
            }
        }
    });

//CON ESTO ABRIMOS AGREGAR TAREA CON COMMAND/CONTROL + ENTER
    document.addEventListener('keydown', (e) => {  
        // e.preventDefault();
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            // console.log('fire!')
            showNewTask2() 
        }  
    })



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

.dotasks{
  display:none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition-delay:200ms;
  color:transparent;
}

.commandkey{
    border:rgba(255, 255, 255, 0.87) 2px solid;
    border-radius: 5px;
    padding: 5px;
    margin-left: 15px;
    font-size: 20px;
}


.appear{
  transition-delay:100ms;
  color:rgba(255, 255, 255, 0.87)!important;
  display:block;
}


.user-container{
    margin: 30px;
    display: flex;
    justify-content: flex-end;
    
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

  position:fixed; 
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: auto;
}

.logo-container{

}

.background-task-effect{
  background:rgba(0, 0, 0, 0.60);
  position:fixed;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;

}

.AgregarTarea{
  position:fixed;
  right:10%;
  bottom:10%;
  font-size: 25px;
  border-radius: 25px!important;
  transition: all 0.2s;
  background-color:rgba(0, 0, 0, 0.3);
  backdrop-filter: saturate(50%) blur(8px);
}

.AgregarTarea:hover{
  border: 2px solid #646cff;
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


.notask-enter-active{

}
.notask-leave-active {
  transition: opacity 0.5s ease;
  
}

.notask-enter-from{

}
.notask-leave-to {
  opacity: 0;

}



</style>