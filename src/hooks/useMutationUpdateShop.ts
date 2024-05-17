import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";
import { RequestShopProps } from "../types/types";

interface UpdateShopVariables {
  businessId: string;
  shopId: string;
  updateShopVariables: RequestShopProps;
}

export default function useMutationUpdateShop() {
  const queryClient = useQueryClient();

  return useMutation<RequestShopProps, AxiosError, UpdateShopVariables>(
    async ({ businessId, shopId, updateShopVariables }) => {
      const response = await privateApi.put<RequestShopProps>(
        `/admin/shops/business/${businessId}/${shopId}`,
        updateShopVariables
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
