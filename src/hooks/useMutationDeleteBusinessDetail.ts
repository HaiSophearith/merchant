import { AxiosError } from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateApi } from "../axios";
import { QUERY_BUSINESS } from "./useQueryBusinessList";

interface DeleteBusinessVariables {
  id: string;
}

export default function useMutationDeleteBusinessDetail() {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError, DeleteBusinessVariables>(
    async ({ id }) => {
      const response = await privateApi.delete<boolean>(`admin/businesses/${id}`);
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_BUSINESS]);
      },
    }
  );
}
