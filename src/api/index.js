import { createClient } from '@supabase/supabase-js'
import { useRoute, useRouter } from 'vue-router'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_KEY)

export const registro = async (email,password) =>{
  
    // ya no es necesario hacer email : email
    const result = await supabase.auth.signUp({
      email,
      password
    })
  }

 export const login = async(email,password) =>{

    const response = await supabase.auth.signInWithPassword({
        email,
        password
        
    })
    console.log('El correo accedido es '+ response.data.user.email)
    return response.data.user.id
}

// task:    {
//     user_id: id,
//     title: 'Titulo',
//     description: 'Descripcion del task'
//      }

export const newTask = async (task) => {
    const response = await supabase.from('Task')
        .insert(task)
    console.log(response)
}   

export const getTasks = async () => {
    const response = await supabase 
      .from('Task')
      .select('*')
      .order('id',{ ascending:false})

      console.log(response)
}

//UPDATE TASK

    //task:  { 
    //     title: 'titulo modificado',
    //     description: 'Descripcion del task modificado'
    // }

export const updateTask = async (taskId,task) => {
    const response = await supabase
    .from('Task')
    .update(task)
    .eq('id', taskId)
  
  
    console.log(response)
  }

  // DELETE MATCHING ROWS
export const deleteTask = async (taskId) => {

    const response = await supabase
    .from('Task')
    .delete()
    .eq('id', 'taskId')
  
    console.log(response)
  
  }
  
 export const logOut = async () => {
    let response = await supabase.auth.signOut()
    console.log(response)
  }
  