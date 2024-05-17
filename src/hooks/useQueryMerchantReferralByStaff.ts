import { useQuery } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { MerchantReferral, Pageable, ReportFilterRequest } from "../types/types";

export const QUERY_MERCHANT_REFERRAL_BY_STAFF = "query-merchant-referrals-staff";

export default function useQueryMerchantReferralByStaff(filterRequest: ReportFilterRequest) {
  const { data: response, ...query } = useQuery(
    [QUERY_MERCHANT_REFERRAL_BY_STAFF, filterRequest],
    async () =>
      await privateApi.get<Pageable<MerchantReferral>>(`/admin/reports/shops/referrals/staff`, {
        params: filterRequest,
      })
  );

  const { items, total, ...rest } = response?.data || {};
  return { merchantReferralItems: items || [], total: total || 0, ...rest, ...query };
}
