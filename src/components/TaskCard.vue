<template>
      <div class="task-container">
       <div class = "card-container" v-for="(task, index) in task" :key="index">
        <div class="card-task">
            <h3 >{{ task.title }}</h3>
            <h3>{{task.description}}</h3>

        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'


const props = defineProps({
  task: Array,
});

console.log(props,'props')

console.log(props,'task')

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