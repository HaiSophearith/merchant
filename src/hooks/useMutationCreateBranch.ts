import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { RequestBranchProps } from "../types/types";
import { QUERY_BRANCH } from "./useQueryBranches";

interface BranchResponse {
  createBranchVariables: RequestBranchProps;
}

export default function useMutationCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation<RequestBranchProps, AxiosError, BranchResponse>(
    async ({ createBranchVariables }) => {
      const response = await privateApi.post<RequestBranchProps>(`admin/branches`, createBranchVariables);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BRANCH]);
      },
    }
  );
}
