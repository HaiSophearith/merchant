import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";
import { RequestShopProps } from "../types/types";

interface CreateShopVariables {
  businessId: string;
  createShopVariables: RequestShopProps;
}

export default function useMutationCreateShop() {
  const queryClient = useQueryClient();

  return useMutation<RequestShopProps, AxiosError, CreateShopVariables>(
    async ({ businessId, createShopVariables }) => {
      const response = await privateApi.post<RequestShopProps>(
        `admin/shops/business/${businessId}`,
        createShopVariables
      );
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_SHOP]);
      },
    }
  );
}
