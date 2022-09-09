import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'my-original-blog-nextjs',
  apiKey: process.env.API_KEY,
});