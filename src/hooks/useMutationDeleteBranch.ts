import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
export const QUERY_BRANCH = "query-branch";

export default function useMutationDeleteBranch() {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError, string>(
    async (branchId: string) => {
      const response = await privateApi.delete<boolean>(`admin/branches/${branchId}`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BRANCH]);
      },
    }
  );
}
