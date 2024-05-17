import { createContext, ReactNode, useContext } from "react";

import useMutationSignIn, { AuthResponse, SignInVariables } from "../hooks/useMutationSignIn";

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../axios";
import { useCookies } from "../utils/cookies";

interface AuthContextStore {
  isAuthenticated?: boolean;
  signIn(variables: SignInVariables): void;
  signOut(): void;
}

function throwError() {
  throw new Error("Attempt to use AuthContext before initialization.");
}

const AuthContext = createContext<AuthContextStore>({
  signIn: throwError,
  signOut: throwError,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { getCookie, setCookie } = useCookies([ACCESS_TOKEN_STORAGE_KEY]);

  const handleAuthResponse = (response: AuthResponse) => {
    const { accessToken, refreshToken } = response;

    setCookie(ACCESS_TOKEN_STORAGE_KEY, accessToken, { sameSite: "strict" });
    setCookie(REFRESH_TOKEN_STORAGE_KEY, refreshToken, { sameSite: "strict" });
  };

  const { mutateAsync: mutateSignIn } = useMutationSignIn();
  const signIn = async (variables: SignInVariables) => {
    const response = await mutateSignIn(variables);
    handleAuthResponse(response);
  };

  const signOut = () => {
    // TODO: implement sign out
  };

  const isAuthenticated = getCookie(ACCESS_TOKEN_STORAGE_KEY) ? true : false;

  return <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
