import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { Regional } from "../types/types";
export const QUERY_REGIONALS = "query-regionals";

export default function useQueryRegionals() {
  const { data: response } = useQuery([QUERY_REGIONALS], () => privateApi.get<Regional[]>(`/admin/branches/regionals`));

  return { regionals: response?.data || [] };
}
