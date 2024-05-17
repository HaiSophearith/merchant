import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { ShopType } from "../types/types";
export const QUERY_TYPES = "query-types";

export default function useQueryShopTypes() {
  const { data: response } = useQuery([QUERY_TYPES], () => privateApi.get<ShopType[]>(`/admin/shop/type/all`));

  return { shopTypes: response?.data || [] };
}
