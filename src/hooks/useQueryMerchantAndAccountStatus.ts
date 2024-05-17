import {useQuery} from "@tanstack/react-query";

import { privateApi } from "../axios";
import {MerchantAndAccountStatus, Pageable, ReportFilterRequest} from "../types/types";

export const QUERY_MERCHANT_AND_ACCOUNT_STATUS = 'query-merchant-account-status';

export default function useQueryMerchantAndAccountStatus(filterRequest: ReportFilterRequest) {
    const {data: response, ...query} = useQuery([QUERY_MERCHANT_AND_ACCOUNT_STATUS, filterRequest], async () =>
        await privateApi.get<Pageable<MerchantAndAccountStatus>>(`/admin/reports/shops/status`, {params: filterRequest})
    );

    const {items, total, ...rest} = response?.data || {};
    return {merchantAndAccountStatus: items || [], total: total || 0, ...rest, ...query}
}
