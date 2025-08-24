import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // For development environment
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://techletics.cce.edu.in';

  const routes = ['', '/about', '/events', '/conference'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
