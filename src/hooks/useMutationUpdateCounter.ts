import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { CounterProps } from "../types/types";
import { QUERY_COUNTER } from "./useMutationCreateCounter";

interface UpdateCounterVariables {
  shopId: string;
  counterId: string;
  counterVariables: CounterProps;
}

export default function useMutationUpdateCounter() {
  const queryClient = useQueryClient();

  return useMutation<CounterProps, AxiosError, UpdateCounterVariables>(
    async ({ shopId, counterId, counterVariables }) => {
      const response = await privateApi.put<CounterProps>(
        `/admin/counters/shops/${shopId}/${counterId}`,
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
