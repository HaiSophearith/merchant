import { useQuery } from "@tanstack/react-query";
import {
  MaterialRequestListVariables,
  MaterialRequestsProps,
  Pagination,
} from "../types/types";
import { privateApi } from "../axios";
export const QUERY_MATERIAL_REQUESTS = "query-material-requests";

const getMaterialRequests = async (params: Pagination) => {
  const res = await privateApi.get<MaterialRequestsProps>(
    `/admin/material/request`,
    { params }
  );
  return res.data;
};

export default function useQueryMaterialRequests(
  variables: MaterialRequestListVariables
) {
  const { data, ...query } = useQuery(
    [QUERY_MATERIAL_REQUESTS, variables],
    () => getMaterialRequests(variables)
  );

  return { materialRequests: data, ...query };
}
