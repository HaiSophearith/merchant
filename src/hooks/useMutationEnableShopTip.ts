import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AxiosError } from "axios";
import { ShopProps } from "../types/types";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";

interface EnabledShopReq {
  businessId: string;
  shopId: string;
}

export default function useMutationEnableShopTip() {
  const queryClient = useQueryClient();

  return useMutation<ShopProps, AxiosError, EnabledShopReq>(
    async ({ businessId, shopId }) => {
      const response = await privateApi.put<ShopProps>(`admin/shops/business/${businessId}/${shopId}/enable/tip`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_SHOP]);
      },
    }
  );
}
