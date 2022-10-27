<template>
  <div class="task-container">
    <TransitionGroup>
      <div
        class="card-container"
        :class="{ doneCard: task.is_complete == true }"
        v-for="(task, index) in task"
      >
        <div class="card-task">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <button
            type="button"
            @click="toggleTask(task.is_complete, task.id)"
            id="buttonDone"
          >
            Done!
          </button>
          <button
            v-if="task.is_complete"
            type="button"
            @click="deleteTask(task.id)"
            id="buttonDelete"
          >
            Delete!
          </button>
          <button
            v-else
            type="button"
            @click="changeNameActiveValue(task)"
            id="buttonEdit"
          >
            Editar
          </button>
        </div>
        <div v-if="changeNameActive && idRef === task.id" class="changeName" >
            <!-- @click="changeName(task.id, index)" -->

            <div class="add-task-form">
              <div class="input-field">
                <input
                  class="input-field-input"
                  type="text"
                  placeholder="Edit title"
                  v-model="name"
                />
              </div>

              <div class="input-field">
                <input
                  class="input-field-input"
                  type="text"
                  placeholder="Edit description"
                  v-model="description"
                />
              </div>

              <!-- <button @click.prevent="errorFunction" class="button">Add</button> -->
              <button @click="changeNameTask(task.id, index)" class="button">
                Change
              </button>
            </div>
          </div>
        <div
          @click="changeNameActiveValue(task)"
          class="background-task-effect"
          v-if="changeNameActive && idRef === task.id"
        >

        </div>
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

const changeNameActiveValue = (task) => {
  idRef.value = task.id;
  changeNameActive.value = !changeNameActive.value;
  name.value = task.title;
  description.value = task.description;

  console.log(task.id, changeNameActive.value);
};

const toggleTask = (toggle, id) => {
  toggle = !toggle;
  show.value = !show.value;
  emit("toggleTask", toggle, id);
  console.log(toggle, id, "toggle y id");
};

const deleteTask = (id) => {
  console.log(id);
  // const taskToDelete = props.task.filter((task) => task.id === id);
  emit("deleteTask", id);
};

const changeNameTask = (id, index) => {
  console.log(name.value, id, description.value, "name input value");

  emit("editTask", name.value, description.value, id);

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
</script>

<style scoped>
.task-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
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

.background-task-effect {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
}
.changeName {
  position: absolute;
  z-index:99999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 210px;
  background-color: antiquewhite;
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
