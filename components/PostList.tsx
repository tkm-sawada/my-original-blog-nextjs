import { parseISO, format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const PostList = ({ blog }: any) => {
  return (
    <section className="text-gray-600 body-font md:mr-8">
      <div className="container mx-auto">
        <ul className="flex flex-wrap">
          {blog.map((post: any, i: number) => (
            <li className="p-2 w-1/2" key={i}>
              <Link href={`/blog/${post.id}`}>
                <a>
                  <article className="relative h-full border-2 border-gray-200 border-opacity-60 rounded-md overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 duration-200">
                    <div className="absolute px-1 bg-original-blue">
                      <h3 className="tracking-widest md:text-xs text-[0.65rem] title-font font-medium text-white my-[2px]">{post.category.name}</h3>
                    </div>
                    <img src={post.eyecatch.url} alt={post.title} className="object-cover w-full h-52"/>
                    <div className="p-6">
                      <h2 className="title-font md:text-lg text-sm font-medium text-gray-900 mb-3 h-auto">{post.title}</h2>
                      <div className="absolute right-1 bottom-1 flex items-center text-gray-500 mr-2">
                        <FontAwesomeIcon icon={faClockRotateLeft} className="h-3 mr-1"/>
                        <small>{format(parseISO(post.revisedAt), 'yyyy/MM/dd(E)', {locale:ja} )}</small>
                      </div>
                    </div>
                  </article>
                </a>
              </Link>
            </li>
          ))}

        </ul>
      </div>
      
    </section>
  );
}

export default PostList;