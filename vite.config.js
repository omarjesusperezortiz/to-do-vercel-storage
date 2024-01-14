import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
    rollupOptions: {
        output: {
            entryFileNames: `assets/file_[name].[hash].js`,
            chunkFileNames: `assets/file_[name].[hash].js`,
            assetFileNames: `assets/file_[name].[hash].[ext]`,
        },
    }
},
  // Comprobamos si estamos en produccion y la base es el nombre del repositorio, si no raiz
  // condicion ? 'nombre-repositorio' : '/'
  // Operador ternario
  // if (process.env.NODE_ENV === 'produccion') {
  // base: 'produccion'
  // } else {
  // base: '/
  //    }
  // produccion seria github pages
  // desarrollo seria yarn dev
  base: process.env.NODE_ENV === 'production' ? '/to-do-app/' : '/',
  server: {
    base: process.env.NODE_ENV === 'production' ? '/to-do-app/' : '/',
}
})
