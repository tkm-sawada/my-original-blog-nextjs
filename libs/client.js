import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'my-original-blog-nextjs',
  apiKey: '70e36eef838346b38abf7f4c47f04605c905',
  // apiKey: process.env.API_KEY,
});