import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { BankAccountNumberProps } from "../types/types";

export const QUERY_BANK_ACCOUNT = "query-bank_account";
export default function useQueryAccountNumbers({ businessId }: { businessId: string }) {
  const { data: response } = useQuery(
    [QUERY_BANK_ACCOUNT, businessId],
    async () => await privateApi.get<BankAccountNumberProps[]>(`admin/accounts/business/${businessId}`)
  );
  return { bankAccountNumbers: response?.data || [] };
}
