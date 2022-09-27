import { client } from "../../../libs/microCMS/client";
import { Pagination } from '../../../components/Pagination';
import Layout from "../../../components/Layout";
import PostList from "../../../components/PostList";
import { PER_PAGE } from "../../../utils/const";
import { getCategoriesData, getPageBlogData } from "../../../libs/microCMS/api";

type Props = {
  blog: any,
  categories: any,
  totalCount: number,
  nowPage: number,
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blog = await client.get({ endpoint: 'blog' });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(blog.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: any) => {
  const pageNum = context.params.pageNum;
  const blog: any = await getPageBlogData(pageNum);
  const categories: any = await getCategoriesData();

  return {
    props: {
      blog: blog.contents,
      categories: categories.contents,
      totalCount: blog.totalCount,
      nowPage: pageNum,
    },
  };
};

export default function BlogPageId({ blog, categories, totalCount, nowPage }: Props) {

  return (
    <Layout categories={categories}>
      <PostList blog={blog} />
      <Pagination totalCount={totalCount} props_categoryId="" nowPage={nowPage} />
    </Layout>
  );
}