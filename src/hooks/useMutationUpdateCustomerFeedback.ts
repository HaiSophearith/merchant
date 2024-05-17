import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { QUERY_CUSTOMER_FEEDBACK_DETAIL } from "./useQueryCustomerFeedbackDetail";

interface UpdateVariable {
  id: string;
}

export default function useMutationUpdateCustomerFeedback() {
  const queryClient = useQueryClient();

  return useMutation<boolean, AxiosError, UpdateVariable>(
    async ({ id }) => {
      const response = await privateApi.put(`/admin/feedback/${id}/close`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_CUSTOMER_FEEDBACK_DETAIL]);
      },
    }
  );
}
