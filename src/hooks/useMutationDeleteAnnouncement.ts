import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { useMutation } from "@tanstack/react-query";

const deleteAnnouncement = async (id: string) => {
  const res = await privateApi.delete(`/admin/announcement/${id}`);
  return res.data;
};

export default function useMutationDeleteAnnouncement() {
  return useMutation<any, AxiosError, string>((id) => {
    return deleteAnnouncement(id);
  });
}
