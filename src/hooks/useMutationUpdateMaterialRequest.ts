import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CounterProps, MaterialRequestVariables } from "../types/types";
import { QUERY_MATERIAL_REQUESTS } from "./useQueryMaterialRequest";
import { privateApi } from "../axios";

interface UpdateCounterVariables {
  id: string;
  variables: MaterialRequestVariables;
}

const updateMaterialRequest = async ({
  id,
  variables,
}: UpdateCounterVariables) => {
  const response = await privateApi.put<CounterProps>(
    `/admin/material/request/${id}`,
    variables
  );
  return response.data;
};

export default function useMutationUpdateMaterialRequest() {
  const queryClient = useQueryClient();

  return useMutation<CounterProps, AxiosError, UpdateCounterVariables>(
    ({ id, variables }) => updateMaterialRequest({ id, variables }),
    {
      onSuccess() {
        queryClient.refetchQueries([QUERY_MATERIAL_REQUESTS]);
      },
    }
  );
}
