<template>
  <Transition>
    <div class="addError" v-if="showErrorMessage">
      <h3 class="error-text">{{ errorMessage }}</h3>
    </div>
  </Transition>
  <div class="form-container"  >
    <div class="form-group">
      <input
          class="input-field-input"
          type="text"
          placeholder="Titulo de tarea"
          v-model="title"
      />
    </div>
    <div class="form-group">
      <textarea
          class="input-field-input"
          rows="4"
          type="text"
          placeholder="Descripcion..."
          v-model="description"/>
    </div>
    <div class="form-group task-button">
      <button @click="finalAddTask"  class="button">
        <span>Agregar</span>
        <span class="commandenter">⌘ enter</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task";
import { onMounted, onUnmounted } from 'vue';

const taskStore = useTaskStore();
const title = ref('');
const description = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');

const finalAddTask = async () => {
  if (title.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = '¡Tienes que llenar ambos campos!';
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    try {
      await taskStore.addTask(title.value, description.value);
      title.value = '';
      description.value = '';
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle task addition error
    }
  }
};
// Keyboard Shortcut for Submitting the Task
const handleKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    finalAddTask();
  }
};
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

</script>
<style scoped>

.commandenter{
    border:rgba(255, 255, 255, 0.87) 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin-left: 15px;
    font-size: 15px;
}
.form-group{
    margin: 20px;
    display:flex;
    justify-content: space-between;
    gap:20px;
}

.task-button{
    display:flex;
    justify-content: center;
    margin:0;

}
.prioridad{
    display:flex;
    justify-content: space-between;
    gap:5px;
}

.addError{

  position:absolute;
  margin-top:-180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width:300px
}

.error-text{
  place-content:center;
  place-items:center;
  text-align: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.input-field-input{
  border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    width:100%;
    overflow:auto;
    resize:none;
}

</style>
