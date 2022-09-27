import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import Link from 'next/link';
import Layout from "../../components/Layout";
import { getCategoriesData, getBlogData } from '../../libs/microCMS/api';
import { client } from "../../libs/microCMS/client";
import { PER_PAGE } from '../../utils/const';

type Props = {
  blog: any,
  categories: any,
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  let blog = await client.get({ endpoint: 'blog' });
  let paths = blog.contents.map((content: any) => `/blog/${content.id}`);
  
  // 取得した記事数が全記字数を超えるまでAPI取得要求
  let blogTotalCount: number = blog.totalCount;
  let getPostCount: number = blog.contents.length;
  while(blogTotalCount > getPostCount){
    blog = await client.get({
       endpoint: 'blog', 
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
  const blog: any = await getBlogData(id);
  const categories: any = await getCategoriesData();

  return {
    props: {
      blog: blog,
      categories: categories.contents,
    },
  };
};

//該当するコンテンツを返却
function Content({content}: any) {
  if (content.richEditor) {
    //リッチエディタ(tailwindを適用させない(CSSを適用))
    return <div className="prose" dangerouslySetInnerHTML={{__html: `${content.richEditor}`, }}/>;  
  } else if (content.relatedLinks) {
    //関連リンク
    return (
      <div className="my-10">
        <Link href={`/blog/${content.relatedLinks.id}`}>
          <a>
            <article className="relative h-full border-2 border-gray-200 border-opacity-60 rounded-md overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 duration-200">
              <div className="absolute px-1 bg-original-blue">
                <h4 className="tracking-widest md:text-xs text-[0.65rem] title-font font-medium text-white my-[2px]">関連記事</h4>
              </div>
              <div className="flex mt-8">
                <h3 className="title-font md:text-base text-sm font-medium text-gray-900 mb-3 h-auto">{content.relatedLinks.title}</h3>
                <img src={content.relatedLinks.eyecatch.url} alt={content.relatedLinks.title} className="object-cover w-40 h-full"/>
              </div>
              
            </article>
          </a>
        </Link>
      </div>
    );
  }
  //HTML
  return <div dangerouslySetInnerHTML={{__html: `${content.html}`, }}/>;
}


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
          {blog.contents.map((content: any, i: number) => (
            // content.richEditor ? (
            //   //tailwindを適用させない(CSSを適用)
            //   <div className="prose" dangerouslySetInnerHTML={{__html: `${content.richEditor}`, }}/>
            // ) : (
            //   <div dangerouslySetInnerHTML={{__html: `${content.html}`, }}/>
            // )
            <Content content={content} key={i}/>
          ))}

          {/* <div className="prose" dangerouslySetInnerHTML={{__html: `${blog.content}`, }}/> */}
        </div>
      </div>
    </Layout>
  );
}