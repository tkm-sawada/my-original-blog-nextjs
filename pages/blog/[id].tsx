import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import Layout from "../../components/Layout";
import { client } from "../../libs/client";
import { PER_PAGE } from '../../utils/const';

type Props = {
  blog: any,
  categories: any,
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  let blog = await client.get({ endpoint: "blog" });
  let paths = blog.contents.map((content: any) => `/blog/${content.id}`);
  
  // 取得した記事数が全記字数を超えるまでAPI取得要求
  let blogTotalCount: number = blog.totalCount;
  let getPostCount: number = blog.contents.length;
  while(blogTotalCount > getPostCount){
    blog = await client.get({
       endpoint: "blog", 
       queries: { 
        offset: getPostCount, 
        limit: PER_PAGE
      } 
    });
    let path: any = blog.contents.map((content: any) => `/blog/${content.id}`);
    paths = paths.concat(path);
    getPostCount += blog.contents.length;
  }
  
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: any) => {
  const id: string = context.params.id;
  const blog: any = await client.get({ endpoint: "blog", contentId: id });
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
      blog: blog,
      categories: categories.contents,
    },
  };
};

export default function BlogId({ blog, categories }: Props) {

  return (
    <Layout categories={categories}>
      <div className="mr-8">
        <h2 className="text-2xl font-semibold pb-8">{blog.title}</h2>
        <div className="flex items-center justify-end text-gray-500">
          <FontAwesomeIcon icon={faClockRotateLeft} className="h-3 mr-1"/>
          <small>{format(parseISO(blog.revisedAt), 'yyyy/MM/dd(E)', {locale:ja} )}</small>
        </div>
        <img src={blog.eyecatch.url} alt={blog.title} className="mt-2 mb-12 border w-full"/>
        <div className="bg-white p-4">
          <div dangerouslySetInnerHTML={{__html: `${blog.content}`, }}/>
        </div>
      </div>
    </Layout>
  );
}