import {useQuery} from "@tanstack/react-query";

import { privateApi } from "../axios";
import {MerchantPaymentSummary, ReportFilterRequest, Pageable} from "../types/types";

export const QUERY_MERCHANT_PAYMENT_SUMMARY = 'query-merchant-payment-summary';

export default function useQueryMerchantPaymentSummary(filterRequest: ReportFilterRequest) {
    const {data: response, ...query} = useQuery([QUERY_MERCHANT_PAYMENT_SUMMARY, filterRequest], async () =>
        await privateApi.get<Pageable<MerchantPaymentSummary>>(`/admin/reports/payments/summaries`, {params: filterRequest})
    );

  const { items, total, ...rest } = response?.data || {};
  return { merchantPaymentSummaries: items || [], total: total || 0, ...rest, ...query };
}
