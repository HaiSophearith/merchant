import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { Customer } from "../types/types";
import { useMemo } from "react";

export const QUERY_CUSTOMER_FEEDBACK_DETAIL = "query-customer_feedback_detail";

interface CustomerFeedbackDetail {
  type: string;
  description: string;
  status: string;
  submitDate: Date;
  customer: Customer;
}

export default function useQueryCustomerFeedbackDetail(id: string) {
  const { data, ...query } = useQuery([QUERY_CUSTOMER_FEEDBACK_DETAIL], async () => {
    const response = await privateApi.get<CustomerFeedbackDetail>(`/admin/feedback/${id}`);
    return response.data;
  });
  const upateData = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      status: data?.status === "PENDING" ? "NEW" : data?.status,
    };
  }, [data]);

  return { feedbackDetail: upateData, ...query };
}
