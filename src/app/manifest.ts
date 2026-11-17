import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Argus — O Copiloto Cognitivo para Concursos e OAB',
    short_name: 'Argus',
    description: 'Plataforma de alta performance com Google AI Engine (Gemini 4 Carbon), psicometria de bancas, simulados cognitivos e repetição espaçada.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050811',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/app-icon.png?v=argus_iris_circle_v7',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-512.png?v=argus_iris_circle_v7',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
