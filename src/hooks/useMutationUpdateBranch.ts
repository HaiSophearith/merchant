import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { QUERY_BRANCH } from "./useQueryBranches";
import { RequestBranchProps } from "../types/types";

interface UpdateBranchVariables {
  branchId: string;
  updateVariables: RequestBranchProps;
}

export default function useMutationUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation<RequestBranchProps, AxiosError, UpdateBranchVariables>(
    async ({ branchId, updateVariables }) => {
      const response = await privateApi.put<RequestBranchProps>(`/admin/branches/${branchId}`, updateVariables);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BRANCH]);
      },
    }
  );
}
