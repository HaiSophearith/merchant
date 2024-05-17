import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AxiosError } from "axios";

interface FileUploadVariable {
  file: File;
}
const fileUpload = async ({ file }: FileUploadVariable) => {
  let formData = new FormData();
  formData.append("file", file);
  const res = await privateApi.post("/admin/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export default function useMutationFileUpload() {
  return useMutation<string, AxiosError, FileUploadVariable>((url) => {
    return fileUpload(url);
  });
}
