import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { useMutation } from "@tanstack/react-query";

const publishAnnouncement = async (id: string) => {
  const res = await privateApi.put(`/admin/announcement/${id}/publish`);
  return res.data;
};

export default function useMutationPublishAnnouncement() {
  return useMutation<any, AxiosError, string>((id) => {
    return publishAnnouncement(id);
  });
}
