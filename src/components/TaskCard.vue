<template>
  <div
    class="card-container"
    :class="{ doneCard: isTaskCompleted }"
  >
    <div class="card-task">
      <button
        class="buttonDone buttonRight"
        :class="buttonClasses"
        type="button"
        @click="toggleTask(task.id, task.status)"
      >
        <i class="fa-solid fa-check" />
      </button>
      <h3 class="overflow">
        {{ task.title }}
      </h3>
      <p class="overflow">
        {{ task.description }}
      </p>
      <button
        v-if="isTaskCompleted"
        class="buttonRight"
        :class="buttonClasses"
        type="button"
        @click="deleteTask(task.id)"
      >
        <i class="fa-solid fa-trash" />
      </button>
      <button
        v-else
        class="buttonRight"
        :class="buttonClasses"
        type="button"
        @click="changeNameActiveValue(task)"
      >
        <i class="fa-solid fa-magnifying-glass" />
      </button>
    </div>
    <Transition name="fade">
      <div
        v-if="changeNameActive && idRef === task.id"
        class="changeName"
      >
        <div class="add-task-form">
          <div class="form-group">
            <input
              v-model="name"
              class="input-field-input"
              type="text"
            >
          </div>
          <div class="form-group">
            <textarea
              v-model="description"
              class="input-field-input"
              type="text"
              rows="6"
              style="overflow:scroll"
            />
          </div>
          <div class="form-group change-button">
            <button
              class="button"
              @click="changeDescriptionTask(task.id)"
            >
              Editar tarea
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <div
        v-if="changeNameActive && idRef === task.id"
        class="background-task-effect"
        @click="changeNameActiveValue(task)"
      />
    </Transition>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useTaskStore } from "../store/task"

const taskStore = useTaskStore();
const props = defineProps({
  task: Object,
});

const name = ref("");
const description = ref("");
const changeNameActive = ref(false);
const idRef = ref(null);

const isTaskCompleted = computed(() => props.task.status !== 'pending');
const buttonClasses = computed(() => ({ buttonlight: isTaskCompleted.value }));
const changeNameActiveValue = (task) => {
  idRef.value = task.id;
  changeNameActive.value = !changeNameActive.value;
  name.value = task.title;
  description.value = task.description;
};
const toggleTask = async (id, status) => {
  try {
    const newStatus = status === 'pending' ? 'completed' : 'pending';
    await taskStore.toggleTask(id, newStatus);
  } catch (error) {
    console.error('Error toggling task:', error);
  }
};
const deleteTask = async (id) => {
  try {
    await taskStore.deleteTask(id);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
const changeDescriptionTask = async (id) => {
  try {
    await taskStore.updateTask(id, name.value, description.value)
    name.value = ''
    description.value = ''
    changeNameActive.value = false
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    changeNameActive.value = false;
  }
});
</script>
<style scoped>
.overflow{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
.form-group{
  margin: 20px;
  display:flex;
  gap:20px;
}
.change-button{
  display:flex;
  justify-content: center;
  margin:0;
}
.card-container {
  padding: 0 !important;
  width:250px
}
.doneCard {
  border: 1px solid #1f1f1f;
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  background-color: #1f1f1f;
  transition: all 0.5s ease;
  color: #3f3f3f;
}
.buttonlight{
  background-color: #2f2f2f;
}
.background-task-effect {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.changeName {
  position: fixed;
  z-index: 99999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: auto;
  border: 1px solid #2f2f2f;
  border-radius: 12px;
  padding: 24px;
  background-color: #2f2f2f;
  transition: all 0.5s ease;
}
.buttonDone{
  display:block;
  margin:0 0 0 auto;
  border-radius:30px;
  aspect-ratio: 1;
  padding:4px 8px;
}
.buttonRight{
  display:block;
  margin:0 0 0 auto;
}
.doneclicked{
  outline: 4px auto white;
}
.card-task {
  padding: 20px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
