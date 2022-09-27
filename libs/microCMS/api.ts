import { client } from "./client";
import { PER_PAGE } from "../../utils/const";

//microCMSに依存していて管理が大変なのでanyで対応しとく
// interface Blog{
//   id: string,
//   createdAt: string,
//   updatedAt: string,
//   publishedAt: string,
//   revisedAt: string,
//   title: string,
//   content: string,
//   contents: Contents[],
// }
// interface Contents{
//   fieldId: string,
//   richEditor: string,
// }
// interface Eyecatch{
//   fieldId: string,
//   richEditor: string,
// }

export async function getBlogData(id: string) {
  const blog: any = await client.get({ endpoint: 'blog', contentId: id });
  return blog;
}

export async function getPageBlogData(pageNum: number, filterText: string = '') {
  let offsetNum = 0; //初期値として1記事目から取得対象とする
  if (pageNum > 0){
    //2ページ目以降の場合、開始記事数を計算する
    offsetNum = (pageNum - 1) * PER_PAGE;
  }
  const blog: any = await client.get(
    { 
      endpoint: 'blog', 
      queries: { 
        filters: filterText,
        offset: offsetNum, 
        limit: PER_PAGE 
      }
    });
  return blog;
}

export async function getCategoryData(id: string) {
  const category: any = await client.get({ endpoint: 'categories', contentId: id });

  return category;
}

export async function getCategoriesData() {
  const categories: any = await client.get({ endpoint: 'categories', });
  
  // カテゴリーに対する記事数を取得
  for(let i in categories.contents){
    let categoryBlog = await client.get({
      endpoint: 'blog', 
      queries: { 
        filters: 'category[equals]' + categories.contents[i].id,
        limit: 0
      } 
    });
    categories.contents[i].count = categoryBlog.totalCount;
  }

  return categories;
}
