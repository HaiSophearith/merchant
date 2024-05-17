import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../axios";
export const QUERY_PHOTO = "QUERY_PHOTO";

export default function useMutationUploadPhoto() {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError, File>(
    async (file: File): Promise<any> => {
      let formData = new FormData();
      formData.append("file", file);
      const response = await privateApi.post<string>("/admin/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_PHOTO]);
      },
    }
  );
}
