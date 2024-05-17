import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { publicApi } from "../axios";

export interface SignInVariables {
  redirectUri: string;
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export default function useMutationSignIn() {
  return useMutation<AuthResponse, AxiosError, SignInVariables>(async (variables) => {
    const res = await publicApi.post<AuthResponse>(`/admin/auth/login`, variables);
    return res.data;
  });
}
