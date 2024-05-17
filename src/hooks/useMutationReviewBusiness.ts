import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { STATUS_LABEL } from "../types/types";
import { QUERY_BUSINESS } from "./useQueryBusinessDetail";
export const REVIEW_BUSINESS = "review-business";

interface ReviewShopReq {
  note: string;
  status?: STATUS_LABEL;
}

interface ReviewShopVariables {
  businessId: string;
  reviewProps?: ReviewShopReq;
}

export default function useMutationReviewBusiness() {
  const queryClient = useQueryClient();

  return useMutation<ReviewShopReq, AxiosError, ReviewShopVariables>(
    async ({ businessId, reviewProps }) => {
      const response = await privateApi.post<ReviewShopReq>(`admin/businesses/${businessId}/reviews`, reviewProps);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BUSINESS]);
      },
    }
  );
}
