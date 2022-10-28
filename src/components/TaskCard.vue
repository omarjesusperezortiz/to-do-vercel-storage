<template>
  
    <div class="task-container">
      <TransitionGroup>
      <div
        class="card-container"
        :class="{ doneCard: task.is_complete == true }"
        v-for="(task, index) in task"
      >
        <div class="card-task">
          <!-- Botton completar -->
          <button class="buttonDone buttonRight"
          :class="{ buttonlight: task.is_complete == true,
                    doneclicked: task.is_complete == true  }"
            type="button"
            @click="toggleTask(task.is_complete, task.id)"
            id="buttonDone"
          >
            <i class="fa-solid fa-check"></i>
          </button>

          <!-- ESTO ES LA INFO DE LA TAREA EN TARJETA -->

          <h3 class="overflow">{{ task.title }}</h3>
          <p class="overflow">{{ task.description }}</p>

          <!-- Boton Borrar  -->
          <button
            v-if="task.is_complete"
            :class="{ buttonlight: task.is_complete == true }"
            class="buttonRight"
            type="button"
            @click="deleteTask(task.id)"
            id="buttonDelete"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <!-- Boton editar  -->
          <button
            v-else
            :class="{ buttonlight: task.is_complete == true }"
            class="buttonRight"
            type="button"
            @click="changeNameActiveValue(task)"
            id="buttonEdit"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
  <!-- Esto es el display del edittask -->
  <Transition>
        <div v-if="changeNameActive && idRef === task.id" class="changeName">
          <!-- @click="changeName(task.id, index)" -->

          <div class="add-task-form">
            <div class="form-group">
              <input
                class="input-field-input"
                type="text"
                v-model="name"
              />
            </div>

            <div class="form-group">
              <textarea
                class="input-field-input"
                type="text"
                rows="6"
                style="overflow:scroll"
                v-model="description"
              />
          </div>

            <!-- <button @click.prevent="errorFunction" class="button">Add</button> -->
            <div class="form-group change-button">
            <button @click="changeNameTask(task.id, index)" class="button">
              Editar tarea
            </button>
          </div>
          </div>
        </div>
  </Transition>
  <!-- Esto es el background del edittask -->
  <Transition>
        <div
          @click="changeNameActiveValue(task)"
          class="background-task-effect"
          v-if="changeNameActive && idRef === task.id"
        ></div>
      </Transition>
  <!--  -->
      </div>
    </TransitionGroup>
    </div>

</template>
<script setup>
import { ref } from "vue";

// const editToggle = ref(true);

const props = defineProps({
  task: Array,
});

//variables donde guardaremos las valores de nuestro formulario donde queremos cambiar los valores de title y
//description
const name = ref("");
const description = ref("");

//variable que nos guarda un valor booleano para poder aplciar onClick y con la funcion changeNameActiveValue poder
//cambiar su valor y abrir el formulario donde vamos a cambiar los valores
const changeNameActive = ref(false);
const idRef = ref(null);
const show = ref(false);

//
const changeNameActiveValue = (task) => {
  //idRef se usa para activar la ventanada de change correspondiente al elemento
  idRef.value = task.id;
  changeNameActive.value = !changeNameActive.value;
  // determinamos los valores que deben estar en el Vmodel de change
  name.value = task.title;
  description.value = task.description;

  // console.log(task.id, changeNameActive.value);
};

//Aqui enviamos el valor toggle y el id correspondiente
const toggleTask = (toggle, id) => {
  toggle = !toggle;
  show.value = !show.value;
  emit("toggleTask", toggle, id);
  // console.log(toggle, id, "toggle y id");
};

const deleteTask = (id) => {
  // console.log(id);
  // const taskToDelete = props.task.filter((task) => task.id === id);
  // Aqui le vamos el valor id a function emit.
  emit("deleteTask", id);
};

const changeNameTask = (id, index) => {
  console.log(name.value, id, description.value, "name input value");
//Conseguimos los valores para cambiar del VMODEL
  emit("editTask", name.value, description.value, id);

  //aqui refrescamos los valores
  name.value = "";
  description.value = "";
  changeNameActive.value = false;
};

const emit = defineEmits([
  //   ENTER-EMITS-HERE
  "editTask",
  "deleteTask",
  "toggleTask",
]);

//CERRAMOS EL EDIT TASK CON LETRA ESC

document.addEventListener('keydown', (event) => {
        
        if (event.key === 'Escape') {
         //if esc key was not pressed in combination with ctrl or alt or shift
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

.task-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  margin-top:100px
}

.card-container {
  padding: 0 !important;
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
