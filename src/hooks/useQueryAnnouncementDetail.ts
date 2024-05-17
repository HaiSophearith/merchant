import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AnnouncementItemProps } from "../types/types";

export const QUERY_ANNOUNCEMENT_DETAIL = "query-business";

export default function useQueryAnnouncementDetail(id: string) {
  const { data, ...query } = useQuery(
    [QUERY_ANNOUNCEMENT_DETAIL, id],
    async () => {
      const response = await privateApi.get<AnnouncementItemProps>(
        `/admin/announcement/${id}`
      );
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
  return { result: data, ...query };
}
