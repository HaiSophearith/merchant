import { useQuery } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { MerchantReferral, Pageable, ReportFilterRequest } from "../types/types";

export const QUERY_MERCHANT_REFERRAL = "query-merchant-referrals-merchant";

export default function useQueryMerchantReferral(filterRequest: ReportFilterRequest) {
  const { data: response, ...query } = useQuery(
    [QUERY_MERCHANT_REFERRAL, filterRequest],
    async () =>
      await privateApi.get<Pageable<MerchantReferral>>(`/admin/reports/shops/referrals/merchant`, {
        params: filterRequest,
      })
  );

  const { items, total, ...rest } = response?.data || {};
  return { merchantReferralItems: items || [], total: total || 0, ...rest, ...query };
}
