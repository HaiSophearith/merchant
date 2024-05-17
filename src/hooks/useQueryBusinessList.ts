import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BusinessProps, FilterBusiness, Pageable } from "../types/types";
export const QUERY_BUSINESS = "query-business";

export default function useQueryBusinessList(variables?: FilterBusiness) {
  const { data: response, ...query } = useQuery(
    [QUERY_BUSINESS, variables],
    async () => await privateApi.get<Pageable<BusinessProps>>(`/admin/businesses`, { params: variables })
  );

  const { items, total, ...rest } = response?.data || {};
  return { businessList: items || [], total: total || 0, ...rest, ...query };
}
