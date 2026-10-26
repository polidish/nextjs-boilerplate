
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.polidish.com/',
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
