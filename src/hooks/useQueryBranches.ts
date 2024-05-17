import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BranchProps } from "../types/types";
export const QUERY_BRANCH = "query-branch";

export default function useQueryBranches() {
  const { data: response } = useQuery(
    [QUERY_BRANCH],
    async () => await privateApi.get<BranchProps[]>(`/admin/branches`)
  );

  return { branches: response?.data || [] };
}
