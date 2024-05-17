import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MaterialRequestVariables, RequestShopProps } from "../types/types";
import { QUERY_MATERIAL_REQUESTS } from "./useQueryMaterialRequest";
import { privateApi } from "../axios";

const createMaterialRequest = async (variables: MaterialRequestVariables) => {
  const res = await privateApi.post(`api/admin/material/request`, variables);
  return res.data;
};

export default function useMutationCreateMaterialRequest() {
  const queryClient = useQueryClient();

  return useMutation<RequestShopProps, AxiosError, MaterialRequestVariables>(
    (variables) => createMaterialRequest(variables),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_MATERIAL_REQUESTS]);
      },
    }
  );
}
