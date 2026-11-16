import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Argus - O Copiloto Cognitivo para Concursos e OAB',
    short_name: 'Argus',
    description: 'Plataforma de alta performance com IA, psicometria de bancas, simulados cognitivos e repetição espaçada.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080C14',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/app-icon.png?v=argus_iris_2026_v5',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-512.png?v=argus_iris_2026_v5',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
