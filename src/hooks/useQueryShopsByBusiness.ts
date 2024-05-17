import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { ShopProps, Pageable, FilterShop } from "../types/types";
export const QUERY_SHOP = "query-shop";

export default function useQueryShopsByBusiness(variables: FilterShop) {
  const { data: response, ...query } = useQuery(
    [QUERY_SHOP, variables],
    async () => await privateApi.get<Pageable<ShopProps>>(`/admin/shops`, { params: variables })
  );

  const { items, total, ...rest } = response?.data || {};
  return { shopList: items || [], total: total || 0, ...rest, ...query };
}
