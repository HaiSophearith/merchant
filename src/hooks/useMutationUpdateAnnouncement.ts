import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { useMutation } from "@tanstack/react-query";
import { AnnouncementVariables } from "../types/types";

interface UpdateAnnouncementProps {
  id: string;
  variables: AnnouncementVariables;
}

const updateAnnouncement = async ({ id, variables }: UpdateAnnouncementProps) => {
  const res = await privateApi.put(`/admin/announcement/${id}`, variables);
  return res.data;
};

export default function useMutationUpdateAnnouncement() {
  return useMutation<any, AxiosError, UpdateAnnouncementProps>(({ id, variables }) => {
    return updateAnnouncement({ id, variables });
  });
}
