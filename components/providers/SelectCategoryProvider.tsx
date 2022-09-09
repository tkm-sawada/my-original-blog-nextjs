import { createContext, useState, ReactNode, FC, Dispatch, SetStateAction } from 'react';

export const SelectCategoryContext = createContext(
	{} as {
		categoryID: any;
		setCategoryID: Dispatch<SetStateAction<any>>;
	}
);

type Props = {
  children: ReactNode ;
}

export const SelectCategoryProvider: FC<Props> = (props) => {
  const { children } = props;
  
  const [categoryID, setCategoryID] = useState("");

  return (
    <SelectCategoryContext.Provider value={{categoryID, setCategoryID}}>
      { children }
    </SelectCategoryContext.Provider>
  );
};