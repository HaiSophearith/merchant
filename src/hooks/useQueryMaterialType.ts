import { useQuery } from "@tanstack/react-query";
import { MaterialTypeProps } from "../types/types";
import { privateApi } from "../axios";
export const QUERY_MATERIAL_TYPES = "query-material-types";

const materialTypes = async () => {
  return await privateApi.get<MaterialTypeProps[]>(`/admin/material/type`);
};

export default function useQueryMaterialTypes() {
  const { data: response, ...query } = useQuery([QUERY_MATERIAL_TYPES], () =>
    materialTypes()
  );

  return {
    materialTypes: response?.data || [],
    ...query,
  };
}
