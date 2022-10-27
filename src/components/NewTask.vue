<template>
    <Transition>
      <div class="addError" v-if="showErrorMessage">
        <h3 class="error-text">{{ errorMessage }}</h3>
      </div>
    </Transition>
  <div class="form-container"  >

    <!-- titulo -->
        <div class="form-group">

            <!-- <h4>Titulo</h4> -->
          <input
            class="input-field-input"
            type="text"
            placeholder="Titulo de tarea"
            v-model="title"
            />
     
    </div>
    <!-- descripcion -->
        <div class="form-group">
            <!-- <h4>Descripcion</h4> -->
      <textarea
        class="input-field-input"
        rows="4"
        type="text"
        placeholder="Descripcion..."
        v-model="description"/>
        </div>

    <!-- Crear nueva tarea -->
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
import { useTaskStore } from "../store/task" 


// Aqui se salva la informacion de tarea que será mostrada en home.view
const setTask = useTaskStore();
const title = ref('');
const description = ref('');
//Variable condicional para mostrar el div contenedor del mensaje de error
const showErrorMessage = ref(false);
const errorMessage = ref(null);


const emit = defineEmits(['add-task','show']);

const finalAddTask = () => {
  if(title.value.length === 0 || description.value.length === 0){
    showErrorMessage.value = true;
    errorMessage.value = '¡Tienes que llenar ambos campos!';
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

    emit("show");

    // setTask.addTask(name.value, description.value);
    // name.value = '';
    // description.value = '';
  }
};

//AQUI HAREMOS QUE SE REALIZE EL SUBMIT CON CONTROL Y ENTER

document.addEventListener('keydown', (e) => {  
        // e.preventDefault();
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            console.log('fire!')
            finalAddTask()
        }  
    })


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
