import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryDistricts = "query-districts";

interface District {
  id: string;
  name: string;
  khmerName: string;
  code: string;
}

const getDistricts = async (id: string) => {
  const res = await privateApi.get<District[]>(`/admin/addresses/provinces/${id}/districts`);
  return res.data;
};

export default function useQueryDistricts(id: string) {
  const { data, ...query } = useQuery(
    [queryDistricts],
    () => {
      return getDistricts(id);
    },
    { enabled: !!id }
  );
  return { districts: data || [], ...query };
}
