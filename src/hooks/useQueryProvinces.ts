import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryProvinces = "query-provinces";

interface Provinces {
  id: string;
  name: string;
  khmerName: string;
}

const getProvinces = async () => {
  const res = await privateApi.get<Provinces[]>("/admin/addresses/provinces");
  return res.data;
};

export default function useQueryProvinces() {
  const { data, ...query } = useQuery([queryProvinces], () => {
    return getProvinces();
  });

  return { provinces: data || [], ...query };
}
