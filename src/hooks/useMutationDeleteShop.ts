import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";

interface DeleteShopVariables {
  businessId: string;
  shopId: string;
}

export default function useMutationDeleteShop() {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError, DeleteShopVariables>(
    async ({ shopId, businessId }) => {
      const response = await privateApi.delete<boolean>(`admin/shops/business/${businessId}/${shopId}`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_SHOP]);
      },
    }
  );
}
