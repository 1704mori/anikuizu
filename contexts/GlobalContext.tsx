import { createContext, useEffect, useState } from "react";

interface IGlobalContext {
  keepPreviousQuestion: boolean;
  setKeepPreviousQuestion: (keepPreviousQuestion: boolean) => void;
}

export const GlobalContext = createContext<IGlobalContext>(
  {} as IGlobalContext
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [keepPreviousQuestion, setKeepPreviousQuestion] = useState(false);

  useEffect(() => {
    const localStorageKeepPreviousQuestion = localStorage.getItem(
      "keepPreviousQuestion"
    );

    if (localStorageKeepPreviousQuestion) {
      setKeepPreviousQuestion(
        localStorageKeepPreviousQuestion === "true" ? true : false
      );
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ keepPreviousQuestion, setKeepPreviousQuestion }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
