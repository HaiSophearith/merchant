import { AxiosError } from "axios";
import { privateApi } from "../axios";
import { useMutation } from "@tanstack/react-query";
import { AnnouncementVariables } from "../types/types";

const createAnnouncement = async (variables: AnnouncementVariables) => {
  const res = await privateApi.post("/admin/announcement", variables);
  return res.data;
};

export default function useMutationCreateAnnouncement() {
  return useMutation<any, AxiosError, AnnouncementVariables>((variables) => {
    return createAnnouncement(variables);
  });
}
