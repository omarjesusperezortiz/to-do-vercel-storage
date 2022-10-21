<template>
  <div class="form-container">
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <!-- titulo -->
        <div class="form-group">
            <span>Titulo</span>
          <input
            class="input-field-input"
            type="text"
            placeholder="Add a Task Title"
            v-model="title"
            />
     
    </div>
    <!-- descripcion -->
        <div class="form-group">
            <span>Descripcion</span>
      <input
        class="input-field-input"
        type="text"
        placeholder="Add a Task Description"
        v-model="description"/>
        </div>

    <!-- Importancia -->
    <!-- <div class="form-group">
        <span>Prioridad</span>
        <div class="prioridad">
            <input type="radio" id="importante" name="importancia" value="Importante" />
            <label for="importante">importante</label><br />
            <input type="radio" id="normal" name="importancia" value="Normal" />
            <label for="normal">normal</label><br />
        </div>
    </div> -->
    <!-- Crear nueva tarea -->
    <div class="form-group task-button">
        <button @click="errorFunction" class="button">Agregar tarea</button>
    </div>
          
         
  </div>
</template>
<script setup>

import { ref } from "vue";
import { useTaskStore } from "../store/task" 


// Aqui se salva la informacion de tarea que será mostrada en home.view
const setTask = useTaskStore();
const title = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is 
//conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const emit = defineEmits(['add-task']);

// arrow function to call the form holding the task title and task description that uses a conditional to first 
//checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets 
//a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task 
//title and task description; clears the task title and task description input fields.
const errorFunction = () => {
  if(title.value.length === 0 || description.value.length === 0){
    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
      // errorMessage.value = null;
      showErrorMessage.value = false;
    }, 5000);
  } else {
    const newTask = {
      name: title.value,
      description: description.value,
    };

    console.log(newTask);

    emit("add-task", newTask);
    title.value = '';
    description.value = '';

    // setTask.addTask(name.value, description.value);
    // name.value = '';
    // description.value = '';
  }
};

</script>
<style scoped>
.form-group{
    margin: 20px;
    display:flex;
    justify-content: space-between;
    gap:20px;
}

.task-button{
    display:flex;
    justify-content: center;
    ;

}
.prioridad{
    display:flex;
    justify-content: space-between;
    gap:5px;
}

</style>
