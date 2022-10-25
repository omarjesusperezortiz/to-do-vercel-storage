<template>
      <div class="task-container">
       <div class = "card-container" v-for="(task, index) in task">
        <div class="card-task">
            <h3 >{{ task.title }}</h3>
            <h3>{{task.description}}</h3>
            <h3>{{task.is_complete}}</h3>
            <button
            type="button"
            @click="toggleTask(task.is_complete, task.id)"
            id="buttonDone">
            Done!
          </button>
          <button
            type="button"
            @click="deleteTask(task.id)"
            id="buttonDelete">
            Delete!
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'


const editToggle = ref(true);

const props = defineProps({
  task: Array,
});

const toggleTask = (toggle, id) => {
  toggle = !toggle;
  emit("toggleTask", toggle, id);
  console.log(toggle,id,"toggle y id")

};

const deleteTask = (id) => {
console.log(id)
// const taskToDelete = props.task.filter((task) => task.id === id);
emit('deleteTask', id);

};


const editButton = (title, description, id) => {
  editToggle.value = !editToggle.value;
 
};
const editedTask = (title, description, id) => {
  emit("editTask", title, description, id);
  editToggle.value = !editToggle.value;
};



const emit = defineEmits([
  //   ENTER-EMITS-HERE
  "editTask",
  "deleteTask",
  "toggleTask",
]);

</script>

<style scoped>
.task-container{
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap:20px
}

.card-container{
    padding:0!important
}

.card-task{
    padding:20px
}
</style>