import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { Location } from "../types/types";
export const QUERY_LOCATION = "query-location";

export default function useQueryAllProvinces() {
  const { data: response } = useQuery(
    [QUERY_LOCATION],
    async () => await privateApi.get<Location[]>("/admin/addresses/provinces")
  );
  return { provinces: response?.data || [] };
}
