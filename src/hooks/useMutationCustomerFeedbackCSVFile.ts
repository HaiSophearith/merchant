import { useMutation } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { saveAs } from "file-saver";

export const QUERY_FEEDBACK_CSV = "query-customer-feedback-csv";

interface CustomerFeedbackCSVFile {
  type?: string;
  fromDate?: string | null;
  toDate?: string | null;
}

export default function useMutationCustomerFeedbackCSVFile(variables?: CustomerFeedbackCSVFile) {
  const { data, ...query } = useMutation([QUERY_FEEDBACK_CSV, variables], () =>
    privateApi
      .get<any>(`/admin/feedback/export`, {
        params: variables,
        responseType: "blob",
      })
      .then((res) => {
        saveAs(res.data, "feedback_report.csv");
      })
  );
  return { data, ...query };
}
