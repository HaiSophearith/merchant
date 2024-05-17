import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryCommunes = "query-communes";

interface Communes {
  id: string;
  name: string;
  khmerName: string;
  code: string;
}

const getCommunes = async (id: string) => {
  const res = await privateApi.get<Communes[]>(`/admin/addresses/districts/${id}/communes`);

  return res.data;
};

export default function useQueryCommunes(id: string) {
  const { data, ...query } = useQuery(
    [queryCommunes],
    () => {
      return getCommunes(id);
    },
    { enabled: !!id }
  );

  return { communes: data || [], ...query };
}
