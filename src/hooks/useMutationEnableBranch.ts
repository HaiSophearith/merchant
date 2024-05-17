import { AxiosError } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { BranchProps } from "../types/types";
import { QUERY_BRANCH } from "./useQueryBranches";

export default function useMutationEnableBranch() {
  const queryClient = useQueryClient();

  return useMutation<BranchProps, AxiosError, string>(
    async (branchId: string) => {
      const response = await privateApi.put<BranchProps>(`admin/branches/${branchId}/enable`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BRANCH]);
      },
    }
  );
}
