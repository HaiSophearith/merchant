import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { privateApi } from "../axios";

export enum MerchantType {
  CORPORATE = "CORPORATE",
  RETAILER = "RETAILER",
}

export enum BusinessType {
  OFFICIAL_NAME = "OFFICIAL NAME",
  PREFERRED_NAME = "PREFERRED NAME",
  SETTLEMENT_ACCOUNT_NAME = "SETTLEMENT ACCOUNT NAME",
}

interface Shop {
  name: string;
  enabledTip?: boolean;
  telegramBot?: string;
  latitude?: number;
  longitude?: number;
  addressLine1?: string;
  villageId: string;
  bankAccountNumbers: string[];
  shopTypeId: string;
  counters: Counter[];
  profileImageUrl?: string;
}

interface Counter {
  name: string;
  enabled?: boolean;
}

interface Documents {
  id?: string;
  url: string;
}

export interface CreateBusinessVariables {
  name: string;
  merchantType: string;
  enabled?: boolean;
  nameType: string;
  categoryId: string;
  referralCode?: string;
  logoUrl?: string;
  businessOwnerPhoneNumber: string;
  shops: Shop[];
  supportedDocuments?: Documents[];
  creationDocuments?: Documents[];
}

const createBusiness = async (createBusinessVariables: CreateBusinessVariables) => {
  const res = await privateApi.post("/admin/businesses", createBusinessVariables);
  return res.data;
};

export default function useMutationCreateBusiness() {
  return useMutation<any, AxiosError, CreateBusinessVariables>((variables) => {
    return createBusiness(variables);
  });
}
