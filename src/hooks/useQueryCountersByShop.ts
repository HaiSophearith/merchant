import { useQuery } from "@tanstack/react-query";

import { CounterProps, Pageable, FilterCounter } from "../types/types";
import { privateApi } from "../axios";
export const QUERY_COUNTER_BY_SHOP = "query-counter-by-shop";

export default function useQueryCountersByShop(
  variables: FilterCounter,
  enabled?: boolean
) {
  const { data: response, ...query } = useQuery(
    [QUERY_COUNTER_BY_SHOP, variables],
    async () =>
      await privateApi.get<Pageable<CounterProps>>(`/admin/counters`, {
        params: variables,
      }),
    { enabled }
  );

  const { items, total, ...rest } = response?.data || {};
  return { counterList: items || [], total: total || 0, ...rest, ...query };
}
