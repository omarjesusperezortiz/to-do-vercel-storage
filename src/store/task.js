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
    actions : {
    setTask(){

    },
    updateTask(id,task){
        //Encontrar el indice de la task con ese id y cambiar su contenido con task
    },

    deleteTask(id){
        //Encontramos el indice de ese ID y eliminamos ese indice del array
    },

    addTask(task){
        //Comprobar que tenemos el id al insertar el registro, en caso de no tenerlo, 
    }
}

}
)