import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { LocationProps } from "../types/types";
import { QUERY_LOCATION } from "./useQueryAllProvinces";

interface CommuneRequest {
  districtId: string;
}

export default function useQueryCommunces({ districtId }: CommuneRequest) {
  const { data: response } = useQuery(
    [QUERY_LOCATION, districtId],
    async () => await privateApi.get<LocationProps[]>(`/admin/addresses/districts/${districtId}/communes`),
    {
      enabled: !!districtId,
    }
  );
  return { communes: response?.data || [] };
}
