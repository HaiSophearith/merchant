import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { CustomerFeedback, FilterCustomerFeedback, Pageable } from "../types/types";

export const QUERY_FEEDBACK = "query-customer-feedback";

export default function useQueryCustomerFeedbacks(variables?: FilterCustomerFeedback) {
  const { data: response, ...query } = useQuery(
    [QUERY_FEEDBACK, variables],
    async () => await privateApi.get<Pageable<CustomerFeedback>>(`/admin/feedback`, { params: variables })
  );

  const { items, total, ...rest } = response?.data || {};
  return { feedbackList: items || [], total: total || 0, ...rest, ...query };
}
