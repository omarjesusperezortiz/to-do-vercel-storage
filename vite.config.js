import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'docs',
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
            }
        }
    },
    base: process.env.NODE_ENV === 'production' ? '/to-do-app/' : '/',
    server: {
        base: process.env.NODE_ENV === 'production' ? '/to-do-app/' : '/',
    }
});
