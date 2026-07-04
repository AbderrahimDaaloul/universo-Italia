import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel serves the site at the root ("/"); GitHub Pages serves it under
// "/universo-Italia/". Vercel sets the VERCEL env var during its build, so we
// pick the right base automatically for each host.
const base = process.env.VERCEL ? '/' : '/universo-Italia/';

export default defineConfig({
    plugins: [react()],
    base,
    server: {
        port: 3000,
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
