import { useQuery } from "@tanstack/react-query";
import { MaterialRequestProps } from "../types/types";
import { useMemo } from "react";
import { privateApi } from "../axios";

export const QUERY_MATERIAL_REQUEST_DETAIL = "query-material-request-detail";

interface MaterialProps {
  id: string;
  image: string;
  amount: number;
  materialType: string;
}

interface Counter {
  id: string;
  name: string;
  total: number;
  materials: MaterialProps[];
}

export interface MaterialRequestDetailProps extends MaterialRequestProps {
  counters: Counter[];
}

const getMaterialRequestDetail = async (id: string) => {
  const response = await privateApi.get<MaterialRequestDetailProps>(
    `/admin/material/request/${id}`
  );
  return response.data;
};

export default function useQueryMaterialRequestDetail(id: string) {
  const { data, ...query } = useQuery([QUERY_MATERIAL_REQUEST_DETAIL], () =>
    getMaterialRequestDetail(id)
  );

  const requestDetail = useMemo(() => {
    if (!data) return;
    const counters = data?.materialRequests.reduce((acc: Counter[], curr) => {
      const exitingItem = acc?.find((item) => item.id === curr.counter.id);
      if (exitingItem) {
        exitingItem.total += curr.requestAmount;
        exitingItem.materials.push({
          id: curr.materialType.id,
          amount: curr.requestAmount,
          image: curr.materialType.imageUrl,
          materialType: curr.materialType.name,
        });
      } else {
        acc.push({
          id: curr.counter.id,
          name: curr.counter.name || "",
          total: curr.requestAmount,
          materials: [
            {
              id: curr.materialType.id,
              amount: curr.requestAmount,
              image: curr.materialType.imageUrl,
              materialType: curr.materialType.name,
            },
          ],
        });
      }

      return acc;
    }, []);

    return { ...data, counters };
  }, [data]);

  return { requestDetail, ...query };
}
