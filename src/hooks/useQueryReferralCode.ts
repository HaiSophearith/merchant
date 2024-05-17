import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";

const queryReferralCode = "query-referral-code";

interface Referral {
  name: string;
  phoneNumber: string;
  position: string;
  isCustomer: false;
}

const getReferralCode = async (code: string) => {
  const res = await privateApi.get<Referral>(`/admin/referrals/check/${code}`);
  return res.data;
};

export default function useQueryGetReferralCode(code: string) {
  const { data, ...query } = useQuery(
    [queryReferralCode],
    () => {
      return getReferralCode(code);
    },
    { enabled: !!(code?.length > 4) }
  );

  return { referral: data, ...query };
}
