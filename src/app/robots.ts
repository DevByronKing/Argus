import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://argus-edu.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*',
        '/admin/*',
        '/_next/*',
        '/.well-known/*',
        '/wp-admin',
        '/wp-login.php',
        '/xmlrpc.php',
        '/*.sql',
        '/*.bak',
        '/*.zip',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
