import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BusinessCategories } from "../types/types";

const queryBusinessCategories = "query-business-categories";

const getBusinessCategories = async () => {
  const res = await privateApi.get<BusinessCategories>("/admin/business/category");
  return res.data;
};

export default function useQueryBusinessCategories() {
  const { data, ...query } = useQuery([queryBusinessCategories], () => {
    return getBusinessCategories();
  });
  return { businessCategoies: (data as BusinessCategories) || [], ...query };
}
