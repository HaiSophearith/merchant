import { createContext, ReactNode } from "react";
import defaultConfig from "../config";
import useLocalStorage from "../hooks/useLocalStorage";
import { PaletteMode } from "@mui/material";

const initialState = {
  ...defaultConfig,
  onChangeLayout: () => {},
  onChangeDrawer: () => {},
  onChangeMenuType: () => {},
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage("kb-prasac-bo", {
    fontFamily: initialState.fontFamily,
    layout: initialState.layout,
    drawerType: initialState.drawerType,
    borderRadius: initialState.borderRadius,
  });

  const onChangeLayout = (layout: string) => {
    setConfig({
      ...config,
      layout,
    });
  };

  const onChangeDrawer = (drawerType: string) => {
    setConfig({
      ...config,
      drawerType,
    });
  };

  const onChangeMenuType = (navType: PaletteMode) => {
    setConfig({
      ...config,
      navType,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeLayout,
        onChangeDrawer,
        onChangeMenuType,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
