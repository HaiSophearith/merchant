import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { CounterProps } from "../types/types";

interface CreateCounterVariables {
  shopId: string;
  counterVariables: CounterProps;
}

export const QUERY_COUNTER = "QUERY_COUNTER";

export default function useMutationCreateCounter() {
  const queryClient = useQueryClient();

  return useMutation<CounterProps, AxiosError, CreateCounterVariables>(
    async ({ shopId, counterVariables }) => {
      const response = await privateApi.post<CounterProps>(
        `/admin/counters/shops/${shopId}`,
        counterVariables
      );
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_COUNTER]);
      },
    }
  );
}
