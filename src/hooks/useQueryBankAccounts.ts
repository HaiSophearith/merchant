import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryBankAccount = "query-bank-account";

enum Currency {
  KHR = "KHR",
  USD = "USD",
}

enum Status {
  UNLOCKED = "UNLOCKED",
  LOCKED = "LOCKED",
}

export interface BankAccountInfo {
  bankAccountNumber: string;
  currency: Currency;
  status: Status | null;
  bankAccountHolderName: string;
}

const getBankAccounts = async ({ cif, phoneNumber }: { cif: string; phoneNumber: string }) => {
  const res = await privateApi.get<BankAccountInfo[]>(`/admin/accounts/by-cif?cif=${cif}&phoneNumber=${phoneNumber}`);
  return res.data;
};

export default function useQueryBankAccounts({ cif, phoneNumber }: { cif: string; phoneNumber: string }) {
  const { data, ...query } = useQuery([queryBankAccount], () => {
    return getBankAccounts({ cif, phoneNumber });
  });

  return { bankAccounts: data || [], ...query };
}
