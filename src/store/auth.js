import {defineStore} from 'pinia'
import {supabase} from '../api/index'
import { useRouter } from 'vue-router';



//DEFINIMOS USER COMO NULL INICIALMENTE, LUEGO CON FETCH USER HACEMOS EL CAMBIO
export const useStore = defineStore('user',{
    state: () => ({
        user: null,
      }),

    actions : {


// CON LA ACCION FETCHUSER VAMOS A REEMPLEZAR EL VALOR DE USER:NULL POR EL DEL USER ACTUAL
   async fetchUser() {
        const user = (await supabase.auth.getUser()).data.user;
        this.user = user;
    // console.log(user.data.user.email, 'COMPROBANDO FETCH')
      // console.log(user, 'Comprobando fetch user')
      // console.log('hola!',user.email)
    },

  

    async signIn(email, password) {
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (user) {
          this.user = user;
          // console.log(this.user);
        }
      },

    async signUp (email,password) {
  
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);
      }
    },




// // INTENTAR DESPUES CON LOGIN
//     login(){

//     },
//     logout(){

//     }
}

}
)

