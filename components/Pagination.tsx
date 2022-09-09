import Link from 'next/link';

type Props = {
  totalCount: number,
  props_categoryId: string,
  nowPage: number,
}

const PER_PAGE = 10; 

export const Pagination = ({ totalCount, props_categoryId, nowPage }: Props) => {

  const range = (start: number, end: number) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <div className="flex justify-center">
      <ul className="flex">
        {range(1, Math.ceil(totalCount / PER_PAGE)).map((page: number, index: number) => (
          (nowPage == page) ? (
            <li key={index} className="bg-original-blue text-white mt-6 mx-1 w-8 h-9 leading-9 text-center">
              {page}
            </li>
          ) : (

            <li key={index} className="bg-white mt-6 mx-1 w-8 h-9 leading-9 text-center">
              {props_categoryId ? (
                <Link href={ `/categories/page/${props_categoryId}/${page}`}>
                  <a className="block">{page}</a>
                </Link>
              ) : (
                <Link href={ `/blog/page/${page}`}>
                  <a className="block">{page}</a>
                </Link>
              )}
            </li>
          )
      ))}
      </ul>
    </div>
  );
};