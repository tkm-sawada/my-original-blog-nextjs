import { client } from "../libs/client";
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Pagination } from '../components/Pagination';
import PostList from "../components/PostList";
import { PER_PAGE } from "../utils/const";

type Props = {
  blog: any,
  categories: any,
  totalCount: number,
}

// SSG
export const getStaticProps = async () => {
  const blog: any = await client.get({ endpoint: 'blog', queries: { offset: 0, limit: PER_PAGE }});
  const categories: any = await client.get({ endpoint: 'categories', });

  // カテゴリーに対する記事数を取得
  for(let i in categories.contents){
    let categoryBlog = await client.get({
      endpoint: "blog", 
      queries: { 
        filters: 'category[equals]' + categories.contents[i].id,
        limit: 0
      } 
    });
    categories.contents[i].count = categoryBlog.totalCount;
  }
  
  return {
    props: {
      blog: blog.contents,
      categories: categories.contents,
      totalCount: blog.totalCount,
    },
  };
};

const Home: NextPage<Props> = ({ blog, categories, totalCount }) => {
  
  return (
    <Layout categories={categories}>
      <PostList blog={blog} />
      <Pagination totalCount={totalCount} props_categoryId="" nowPage={1} />
    </Layout>
  )
}

export default Home
