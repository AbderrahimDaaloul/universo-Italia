import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('framer-motion'))
                            return 'animation';
                        if (id.includes('react-hook-form'))
                            return 'forms';
                        if (id.includes('@emailjs/browser'))
                            return 'email';
                        return 'vendor';
                    }
                    return undefined;
                },
            },
        },
    },
});
