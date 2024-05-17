import { useQuery } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { CounterProps } from "../types/types";

interface Variables {
  id: string;
}

export const QUERY_COUNTERS_BY_SHOP_ID = "query-counters-by-shop-id";

export default function useQueryAllCountersByShopId({ id }: Variables) {
  const { data, ...query } = useQuery([QUERY_COUNTERS_BY_SHOP_ID], async () => {
    const response = await privateApi.get<CounterProps[]>(`/admin/counters/shops/${id}`);
    return response.data;
  });

  return { counters: data || [], ...query };
}
