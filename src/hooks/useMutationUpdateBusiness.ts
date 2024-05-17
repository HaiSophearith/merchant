import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AxiosError } from "axios";

interface UpdateBusinessVariable {
  name: string;
  merchantType: string;
  nameType: string;
}

interface UpdateBusinessResponse {
  name: string;
  status: string;
  merchantType: string;
  enabled: boolean;
  nameType: string;
  category: {
    id: string;
    name: string;
  };
}

const updateBusiness = async ({ id, input }: { id: string; input: UpdateBusinessVariable }) => {
  const res = await privateApi.put(`/admin/businesses/${id}`, input);
  return res.data;
};

export default function useMutationUpdateBusiness(id: string) {
  return useMutation<UpdateBusinessResponse, AxiosError, UpdateBusinessVariable>((input) => {
    return updateBusiness({ id, input });
  });
}
