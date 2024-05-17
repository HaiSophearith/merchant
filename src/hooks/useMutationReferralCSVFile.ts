import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { saveAs } from "file-saver";
import { FilterReferral } from "../types/types";

export const QUERY_REFERRAL_CSV = "query-referral-csv";

export default function useMutationReferralCSVFile(variables?: FilterReferral) {
  const { data, ...query } = useMutation([QUERY_REFERRAL_CSV, variables], () =>
    privateApi
      .get<any>(`/admin/referrals/export`, {
        params: variables,
        responseType: "blob",
      })
      .then((res) => {
        saveAs(res.data, "referral_report.csv");
      })
  );
  return { data, ...query };
}
