import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { STATUS_LABEL } from "../types/types";
export const REVIEW_SHOP = "review-shop";

interface ReviewShopReq {
  note: string;
  status: STATUS_LABEL;
}

interface ReviewShopVariables {
  businessId: string;
  shopId: string;
  reviewProps?: ReviewShopReq;
}

export default function useMutationReviewShop() {
  const queryClient = useQueryClient();

  return useMutation<ReviewShopReq, AxiosError, ReviewShopVariables>(
    async ({ businessId, shopId, reviewProps }) => {
      const response = await privateApi.post<ReviewShopReq>(
        `admin/shops/business/${businessId}/${shopId}/reviews`,
        reviewProps
      );
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([REVIEW_SHOP]);
      },
    }
  );
}
