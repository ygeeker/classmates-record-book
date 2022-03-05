import React, { createContext, useContext, useEffect, useState } from 'react';

type LayoutMenu = 'index' | 'register' | 'admin' | '';

const LayoutMenuContext = createContext<
  [LayoutMenu, React.Dispatch<React.SetStateAction<LayoutMenu>>] | undefined
>(undefined);

export const LayoutMenuProvider: React.FC = ({ children }) => {
  const [layoutMenu, setLayoutMenu] = useState<LayoutMenu>('index');

  return (
    <LayoutMenuContext.Provider value={[layoutMenu, setLayoutMenu]}>
      {children}
    </LayoutMenuContext.Provider>
  );
};

export const useLayoutMenuValue = () => useContext(LayoutMenuContext)![0];

export const useSetLayoutMenu = (value: LayoutMenu) => {
  const [, setLayoutMenu] = useContext(LayoutMenuContext)!;
  useEffect(() => {
    setLayoutMenu(value);
  }, [setLayoutMenu, value]);
};
