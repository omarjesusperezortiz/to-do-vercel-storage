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
      const { data: task } = await supabase
        .from("Task")
        .select("*")
        .order("id", { ascending: false });
      this.task = task;
      console.log(task,'lista de tasks')
      return this.task;
    },

    // New code
// task:    {
//     user_id: id,
//     title: 'Titulo',
//     description: 'Descripcion del task'
//      }

async addTask(title, description) {
  const { data, error } = await supabase.from("Task").insert([
    {
      user_id: useStore().user.id,
      title,
      is_complete: false,
      description,
      
    },
  ]);
},
    
    // async getTasks ()  {
    // const response = await supabase 
    //   .from('Task')
    //   .select('*')
    //   .order('id',{ ascending:false})

    //   console.log(response)},

//UPDATE TASK

    //task:  { 
    //     title: 'titulo modificado',
    //     description: 'Descripcion del task modificado'
    // }

    async updateTask(title,description,id) {
    const response = await supabase
    .from('Task')
    .update({
      title: title,
      description: description,
    })
    .match({id: id})
  
  
    console.log(response)
  },

  // DELETE MATCHING ROWS
    async deleteTask (id) {

    const response = await supabase
    .from('Task')
    .delete()
    .match({id: id})
  
    console.log(response)
  
  },

  //CON ESTO CAMBIAMOS DE FALSO A VERDADERO
    async toggleTask(toggle, id){
      const { data, error } = await supabase
      .from("Task")
      .update({is_complete: toggle})
      .match({id: id});
    },
  },

}
)