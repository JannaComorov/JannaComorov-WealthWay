import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // 🟣 necesar pentru ca virtual:pwa-register să funcționeze în mod development
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'WealthWay - Planner Financiar',
        short_name: 'WealthWay',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#6A1B9A', // Violet închis
        lang: 'ro',
        description: 'Aplicație de gestionare a bugetului personal.',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
