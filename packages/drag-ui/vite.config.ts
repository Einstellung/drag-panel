import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginYaml from "vite-plugin-yaml2"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    pluginYaml(),
  ]
})
