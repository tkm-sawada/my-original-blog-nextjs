import { client } from "../../../libs/client";
import { Pagination } from '../../../components/Pagination';
import Layout from "../../../components/Layout";
import PostList from "../../../components/PostList";
import { PER_PAGE } from "../../../utils/const";

type Props = {
  blog: any,
  categories: any,
  totalCount: number,
  nowPage: number,
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const blog = await client.get({ endpoint: "blog" });
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(blog.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: any) => {
  const pageNum = context.params.pageNum;

  const blog = await client.get({
     endpoint: "blog", 
     queries: { 
      offset: (pageNum - 1) * PER_PAGE, 
      limit: PER_PAGE 
    } 
  });
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