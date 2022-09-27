import { client } from "../../../../libs/microCMS/client";
import { Pagination } from '../../../../components/Pagination';
import Layout from "../../../../components/Layout";
import PostList from "../../../../components/PostList";
import { PER_PAGE } from "../../../../utils/const";
import { getCategoriesData, getPageBlogData } from "../../../../libs/microCMS/api";

type Props = {
  blog: any,
  categoryId: string,
  categories: any,
  totalCount: number,
  nowPage: number,
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blog = await client.get({ endpoint: 'blog' });
  const categories = await client.get({ endpoint: 'categories', });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  let paths: any = [];
  let path: any;
  categories.contents.forEach((category: any) => {
    path = range(1, Math.ceil(blog.totalCount / PER_PAGE)).map((repo) => `/categories/page/${category.id}/${repo}`);
    paths = paths.concat(path);
  });
  
  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: any) => {
  const pageNum: number = context.params.pageNum;
  const categoryId: string = context.params.categoryId;
  const filterText: string = 'category[equals]' + categoryId;

  const blog: any = await getPageBlogData(pageNum, filterText);
  const categories: any = await getCategoriesData();

  return {
    props: {
      blog: blog.contents,
      categoryId: categoryId,
      categories: categories.contents,
      totalCount: blog.totalCount,
      nowPage: pageNum,
    },
  };
};

export default function BlogCategoryPageId({ blog, categoryId, categories, totalCount, nowPage }: Props) {

  return (
    <Layout categories={categories}>
      <PostList blog={blog} />
      <Pagination totalCount={totalCount} props_categoryId={categoryId} nowPage={nowPage} />
    </Layout>
  );
}