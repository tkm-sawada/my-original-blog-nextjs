import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { Pagination } from '../components/Pagination';
import PostList from "../components/PostList";
import { getPageBlogData, getCategoriesData } from "../libs/microCMS/api";

type Props = {
  blog: any,
  categories: any,
  totalCount: number,
}

// SSG
export const getStaticProps = async () => {
  const blog: any = await getPageBlogData(0);
  const categories: any = await getCategoriesData();

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
