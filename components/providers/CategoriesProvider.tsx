import { createContext, useState, ReactNode, FC, Dispatch, SetStateAction } from 'react';

// 使うのやめたけどサンプルとして取っておく

export const CategoriesContext = createContext(
	{} as {
		categories: any;
		setCategories: Dispatch<SetStateAction<any>>;
	}
);

type Props = {
  children: ReactNode ;
}

export const CategoriesProvider: FC<Props> = (props) => {
  const { children } = props;
  
  const [categories, setCategories] = useState([]);

  return (
    <CategoriesContext.Provider value={{categories, setCategories}}>
      { children }
    </CategoriesContext.Provider>
  );
};