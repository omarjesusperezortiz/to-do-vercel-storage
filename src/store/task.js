//TASK JS

//AQUI ALMACENAMOS LAS ACCIONES DE TASK

import {defineStore} from 'pinia'
import { supabase } from "../api/index";
import { useStore } from "./auth";



export const useTaskStore = defineStore('task',{
    state:()=>{
        return{
            task:[]
            
        }
    }
,
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("Task")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      console.log(tasks,'lista de tasks')
      return this.tasks;
    },
    // New code
// task:    {
//     user_id: id,
//     title: 'Titulo',
//     description: 'Descripcion del task'
//      }

async addTask(title, description) {
  console.log(useStore().user.id);
  const { data, error } = await supabase.from("Task").insert([
    {
      user_id: useStore().user.id,
      title,
      // is_complete: false,
      description,
    },
  ]);
},
    
    async getTasks ()  {
    const response = await supabase 
      .from('Task')
      .select('*')
      .order('id',{ ascending:false})

      console.log(response)},

//UPDATE TASK

    //task:  { 
    //     title: 'titulo modificado',
    //     description: 'Descripcion del task modificado'
    // }

    async updateTask(taskId,task) {
    const response = await supabase
    .from('Task')
    .update(task)
    .eq('id', taskId)
  
  
    console.log(response)
  },

  // DELETE MATCHING ROWS
    async deleteTask (taskId) {

    const response = await supabase
    .from('Task')
    .delete()
    .eq('id', 'taskId')
  
    console.log(response)
  
  },
    async toggleTask(is_complete, id){
      const { data, error } = await supabase.from("tasks").update({
        is_complete: is_complete,
      }).match({
        id: id,
      });
    },
  },

}
)