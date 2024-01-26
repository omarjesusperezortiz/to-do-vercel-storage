<template>
  <Navbar />
  <main class="main-container">
    <h3 v-if="loading">
      Loading...
    </h3>
    <template v-else>
      <h3 v-if="tasks.length === 0">
        No tienes tareas.<br>Agrega una nueva! ;)
      </h3>
      <div
        v-else
        class="task-container"
      >
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @load-tasks="loadTasks"
        />
      </div>
    </template>
  </main>
  <footer>
    <button
      class="new-task-button"
      @click="toggleNewTaskVisibility"
    >
      <span class="new-task-text">Agregar tarea</span>
      <span class="command-key">⌘K</span>
    </button>
  </footer>
  <div
    v-if="showNewTask"
    class="background-task-effect"
    @click="toggleNewTaskVisibility"
  >
    <section
      class="new-task-modal"
      role="dialog"
      aria-labelledby="newTaskTitle"
      @click.stop
    >
      <NewTask
        class="new-task-button"
        @close="toggleNewTaskVisibility"
      />
    </section>
  </div>
</template>
<script setup>
import {ref, computed, onMounted, onUnmounted, nextTick} from 'vue';
import { useTaskStore } from '../store/task';
import Navbar from '../components/Navbar.vue';
import NewTask from '../components/NewTask.vue';
import TaskCard from "../components/TaskCard.vue";

const taskStore = useTaskStore();
const showNewTask = ref(false);
const loading = ref(false);
const tasks = computed(() => taskStore.tasks);
const modalTriggerElement = ref(null);

const loadTasks = async () => {
  loading.value = true;
  try {
    await taskStore.fetchTasks();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  } finally {
    loading.value = false;
  }
}
const toggleNewTaskVisibility = () => {
  if (!showNewTask.value) {
    modalTriggerElement.value = document.activeElement;
  }
  showNewTask.value = !showNewTask.value;
  nextTick(() => {
    if (showNewTask.value) {
      // Focus the first element in the modal
    } else {
      modalTriggerElement.value?.focus();
    }
  });
};
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    showNewTask.value = false;
  }
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    toggleNewTaskVisibility();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
loadTasks();
</script>
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
}
.task-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
footer{
  position: absolute;
  display: flex;
  justify-content: right;
  box-sizing: border-box;
  bottom: 0;
  z-index: 1;
  padding: 20px;
  margin-bottom:20px;
  width: 100%;
  height: 100px;
}
.new-task-button{
  position: relative;
  width: 280px;
  height: auto;
  cursor: pointer;
  transition: 0.5s ease;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
}
.background-task-effect{
  background:rgba(0, 0, 0, 0.60);
  position:fixed;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
}
.new-task-modal{
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  min-width:300px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  height: auto;
}
.command-key{
  border:rgba(255, 255, 255, 0.87) 1px solid;
  border-radius: 5px;
  padding: 5px;
  margin-left: 15px;
  font-size: 16px;
}
</style>
