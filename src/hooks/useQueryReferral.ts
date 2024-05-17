import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { ReferralDetail } from "../types/types";
import { QUERY_REFERRAL } from "./useQueryReferrals";

export default function useQueryReferral({ referralId }: { referralId: string }) {
  const { data, ...query } = useQuery(
    [QUERY_REFERRAL, referralId],
    async () => {
      const response = await privateApi.get<ReferralDetail>(`/admin/referrals/${referralId}`);
      return response.data;
    },
    {
      enabled: !!referralId,
    }
  );
  return { referral: data, ...query };
}
