import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryVillages = "query-villages";

interface Villages {
  id: string;
  name: string;
  khmerName: string;
  code: string;
}

const getVillages = async (id: string) => {
  const res = await privateApi.get<Villages[]>(`/admin/addresses/communes/${id}/villages`);

  return res.data;
};

export default function useQueryVillages(id: string) {
  const { data, ...query } = useQuery(
    [queryVillages],
    () => {
      return getVillages(id);
    },
    { enabled: !!id }
  );

  return { villages: data || [], ...query };
}
