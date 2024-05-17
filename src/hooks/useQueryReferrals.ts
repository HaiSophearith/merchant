import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { FilterReferral, Pageable, ReferralProps } from "../types/types";
export const QUERY_REFERRAL = "query-referral";

export default function useQueryReferrals(variables: FilterReferral) {
  const { data: response, ...query } = useQuery(
    [QUERY_REFERRAL, variables],
    async () => await privateApi.get<Pageable<ReferralProps>>(`/admin/referrals`, { params: variables })
  );

  const { items, total, ...rest } = response?.data || {};

  return { referrals: items || [], total: total || 0, ...rest, ...query };
}
