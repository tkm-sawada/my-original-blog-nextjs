import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout";
import { client } from "../../libs/microCMS/client";
import PostList from "../../components/PostList";
import { Pagination } from "../../components/Pagination";
import { getCategoriesData, getCategoryData, getPageBlogData } from "../../libs/microCMS/api";

type Props = {
  blog: any,
  category: any,
  categories: any,
  totalCount: number,
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const categories = await client.get({ endpoint: "categories" });

  const paths = categories.contents.map((content: any) => `/categories/${content.id}`);
  return { paths, fallback: false };
};

// SSG
export const getStaticProps = async (context: any) => {
  const categoryId: string = context.params.categoryId;
  const filterText: string = 'category[equals]' + categoryId;
  const blog: any = await getPageBlogData(0, filterText);
  const category: any = await getCategoryData(categoryId);
  const categories: any = await getCategoriesData();

  return {
    props: {
      blog: blog.contents,
      category: category,
      categories: categories.contents,
      totalCount: blog.totalCount,
    },
  };
};

const CategoryId = ({ blog, category, categories, totalCount }: Props) => {

  return (
    <Layout categories={categories}>
      <section className="mb-10">
        <small className="text-gray-500 text-[10px] flex items-center">
          <FontAwesomeIcon icon={faFolder} className="h-3 mr-1"/>
          CATEGORY
        </small>
        <h3 className="text-2xl leading-normal font-bold tracking-wide">{category.name}</h3>
      </section>
      
      <PostList blog={blog} />
      <Pagination totalCount={totalCount} props_categoryId={category.id} nowPage={1} />

    </Layout>
  )
}

export default CategoryId;