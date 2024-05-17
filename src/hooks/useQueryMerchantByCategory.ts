import { useQuery } from '@tanstack/react-query';

import { privateApi } from '../axios';
import { MerchantCategoryReport, Pageable, ReportFilterRequest } from '../types/types';

export const QUERY_MERCHANT_BY_CATEGORY = 'query-merchant-by-category';

export default function useQueryMerchantByCategory(filterRequest: ReportFilterRequest) {
    const {data: response, ...query} = useQuery([QUERY_MERCHANT_BY_CATEGORY, filterRequest], async () =>
        await privateApi.get<Pageable<MerchantCategoryReport>>(`/admin/reports/shops/categories`, {params: filterRequest})
    );

    const {items, total, ...rest} = response?.data || {};
    return { merchantCategoryItems: items || [], total: total || 0, ...rest, ...query }
}

