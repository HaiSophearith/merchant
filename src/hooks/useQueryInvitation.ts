import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

export const QUERY_INVITATION = "query-invitation";

interface Variables {
  businessId: string;
  shopId?: string;
  counterId?: string;
}

export default function useQueryInvitation({ businessId, counterId, shopId }: Variables) {
  const { data, ...query } = useQuery(
    [QUERY_INVITATION, businessId, shopId],
    async () => {
      const response = await privateApi.get<any>(`/admin/invitation/${businessId}`, {
        params: { shopId, counterId },
      });
      return response.data;
    },
    {
      enabled: !!businessId,
    }
  );

  return { invitations: data || [], ...query };
}
