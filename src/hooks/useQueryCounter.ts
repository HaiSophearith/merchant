import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { CounterProps } from "../types/types";
import { QUERY_COUNTER } from "./useMutationCreateCounter";

interface Variables {
  shopId: string;
  counterId: string;
}

export default function useQueryCounter({ shopId, counterId }: Variables) {
  const { data, ...query } = useQuery(
    [QUERY_COUNTER, shopId, counterId],
    async () => {
      const response = await privateApi.get<CounterProps>(
        `/admin/counters/shops/${shopId}/${counterId}`
      );
      return response.data;
    },
    {
      enabled: !!shopId && !!counterId,
    }
  );

  return { counter: data, ...query };
}
