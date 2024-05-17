import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { ShopProps } from "../types/types";
import { QUERY_SHOP } from "./useQueryShopsByBusiness";

interface Variables {
  businessId: string;
  shopId: string;
}

export default function useQueryShop({ businessId, shopId }: Variables) {
  const { data, ...query } = useQuery(
    [QUERY_SHOP, businessId, shopId],
    async () => {
      const response = await privateApi.get<ShopProps>(`/admin/shops/business/${businessId}/${shopId}`);
      return response.data;
    },
    {
      enabled: !!businessId && !!shopId,
    }
  );

  return { shop: data, ...query };
}
