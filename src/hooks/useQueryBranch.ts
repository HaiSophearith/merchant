import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BranchProps } from "../types/types";
import { QUERY_BRANCH } from "./useQueryBranches";

export default function useQueryBranch({ branchId }: { branchId: string }) {
  const { data, ...query } = useQuery(
    [QUERY_BRANCH, branchId],
    async () => {
      const response = await privateApi.get<BranchProps>(`/admin/branches/${branchId}`);
      return response.data;
    },
    {
      enabled: !!branchId,
    }
  );
  return { branch: data, ...query };
}
