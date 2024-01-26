<template>
  <Transition>
    <div
      v-if="showErrorMessage"
      class="add-error"
    >
      <h3 class="error-text">
        {{ errorMessage }}
      </h3>
    </div>
  </Transition>
  <div class="form-container">
    <div class="form-group">
      <input
        v-model="title"
        class="input-field-input"
        type="text"
        placeholder="Titulo de tarea"
        aria-label="Task title"
        @keydown.enter="finalAddTask"
      >
    </div>
    <div class="form-group">
      <textarea
        v-model="description"
        class="input-field-input"
        rows="4"
        type="text"
        placeholder="Descripcion..."
        aria-label="Task description"
      />
    </div>
    <div class="form-group task-button">
      <button @click="finalAddTask">
        <span>Agregar</span>
        <span class="command-enter">⌘ enter</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useTaskStore } from "../store/task";

const taskStore = useTaskStore();
const title = ref('');
const description = ref('');
const showErrorMessage = ref(false);
const errorMessage = ref('');
const isLoading = ref(false);
const emit = defineEmits(['close']);

const finalAddTask = async () => {
  if (title.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = '¡Tienes que llenar ambos campos!';
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
    return;
  }
  isLoading.value = true;
  errorMessage.value = 'Creando...';
  showErrorMessage.value = true;
  try {
    await taskStore.addTask(title.value, description.value, 'pending');
    title.value = '';
    description.value = '';
    emit('close');
  } catch (error) {
    console.error('Error adding task:', error);
    showErrorMessage.value = true;
    errorMessage.value = 'Error al agregar tarea. Intente de nuevo.';
  } finally {
    showErrorMessage.value = false;
    errorMessage.value = '';
    isLoading.value = false;
  }
};

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    finalAddTask();
  }
});
</script>
<style scoped>
.command-enter{
    border:rgba(255, 255, 255, 0.87) 1px solid;
    border-radius: 5px;
    padding: 5px;
    margin-left: 15px;
    font-size: 15px;
}
.form-container{
    display:flex;
    flex-direction:column;
    gap:20px;
    padding: 20px;
}
.form-group{
    display:flex;
}
.task-button{
    display:flex;
    justify-content: center;
    flex-direction: column;
}
.task-button button{
  padding: 10px 20px;
}
.add-error{

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
.loading-text {
  color: #fff;
  font-size: 1em;
  margin-top: 10px;
  text-align: center;
}
</style>
