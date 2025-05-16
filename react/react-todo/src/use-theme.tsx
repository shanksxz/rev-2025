import { error } from "console";
import { createContext, use, useState } from "react";

type ContextProviderProps = {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

const ContextProvider = createContext<ContextProviderProps | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ContextProviderProps['mode']>('light');
  return (
    <ContextProvider.Provider value={{ mode, setMode }}>
      {children}
    </ContextProvider.Provider>
  )
}

export default function useTheme() {
  const ctx = use(ContextProvider);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}


