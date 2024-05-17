import { AxiosError } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { QUERY_COUNTERS_BY_SHOP_ID } from "./useQueryAllCountersByShopId";

export const QUERY_BRANCH = "query-branch";

interface DeleteCounterVariables {
  counterId: string;
  shopId: string;
}

export default function useMutationDeleteCounter() {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError, DeleteCounterVariables>(
    async ({ counterId, shopId }) => {
      const response = await privateApi.delete<boolean>(`/admin/counters/shops/${shopId}/${counterId}`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_COUNTERS_BY_SHOP_ID]);
      },
    }
  );
}
