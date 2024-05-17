import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BusinessDetailProps } from "../types/types";

export const QUERY_BUSINESS = "query-business";

interface BusinessId {
  businessId: string;
}

export default function useQueryBusinessDetail({ businessId }: BusinessId) {
  const { data, ...query } = useQuery(
    [QUERY_BUSINESS, businessId],
    async () => {
      const response = await privateApi.get<BusinessDetailProps>(`/admin/businesses/${businessId}`);
      return response.data;
    },
    {
      enabled: !!businessId,
    }
  );
  return { eachBusiness: data, ...query };
}
