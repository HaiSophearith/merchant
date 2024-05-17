import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AxiosError } from "axios";
import { ShopProps } from "../types/types";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";

interface DisableShopReq {
  businessId: string;
  shopId: string;
}

export default function useMutationDisableShop() {
  const queryClient = useQueryClient();

  return useMutation<ShopProps, AxiosError, DisableShopReq>(
    async ({ businessId, shopId }) => {
      const response = await privateApi.put<ShopProps>(`admin/shops/business/${businessId}/${shopId}/disable`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_SHOP]);
      },
    }
  );
}