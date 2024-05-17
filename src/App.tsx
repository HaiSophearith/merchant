import { Suspense } from "react";
import { IntlProvider } from "react-intl";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Themes from "./themes/Themes";
import Routes from "./routes/Routes";

import queryClient from "./utils/queryClient";
import AuthContextProvider from "./contexts/AuthContext";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthContextProvider>
          <Themes>
            <IntlProvider locale="en">
              <Suspense>
                <Routes />
              </Suspense>
            </IntlProvider>
          </Themes>
        </AuthContextProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default App;
