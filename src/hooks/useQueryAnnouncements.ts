import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import {
  AnnouncementListVariables,
  AnnouncementsProps,
  Pagination,
} from "../types/types";

const QUERY_ANNOUNCEMENTS = "query-announcement";

const getAnnouncements = async (params: Pagination) => {
  const res = await privateApi.get<AnnouncementsProps>(`/admin/announcement`, {
    params,
  });
  return res.data;
};

export default function useQueryAnnouncements(
  variables: AnnouncementListVariables
) {
  const { data, ...query } = useQuery([QUERY_ANNOUNCEMENTS, variables], () => {
    return getAnnouncements(variables);
  });

  return { announcements: data, ...query };
}
