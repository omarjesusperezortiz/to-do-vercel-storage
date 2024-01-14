<template>
  <header>
    <div class="logo-container">
      <Navbar/>
    </div>
  </header>
  <div class="main-container">
    <div class="dotasks" :class="{ appear: tasks.length === 0 }">
      <h3>No tienes tareas. <br>Agrega una nueva! ;)</h3>
    </div>
    <button class="AgregarTarea" @click="toggleNewTaskVisibility">
      <span class="agregartext">  Agregar tarea</span>
      <span class="commandkey">⌘K</span>
    </button>
  </div>
  <Transition>
    <div v-if="showNewTask" >
      <div class="background-task-effect" id="backTask"></div>
      <div class="card-container new-task" id="newTask">
        <NewTask class="newTaskBox"/>
      </div>
    </div>
  </Transition>
  <div v-for="task in tasks" :key="task.id">
    <TaskCard :task="task" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '../store/task';
import Navbar from '../components/Navbar.vue';
import NewTask from '../components/NewTask.vue';
import TaskCard from "../components/TaskCard.vue";

const taskStore = useTaskStore();
const showNewTask = ref(false);

const tasks = computed(() => taskStore.tasks);

const toggleNewTaskVisibility = () => {
  showNewTask.value = !showNewTask.value;
};
// Keydown event listeners for shortcuts
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
    showNewTask.value = false;
  }
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    toggleNewTaskVisibility();
  }
});
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
