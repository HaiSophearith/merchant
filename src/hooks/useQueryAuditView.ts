import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { AuditFilterRequest, AuditView, Pageable } from "../types/types";
export const QUERY_AUDIT = "query-audit";

export default function useQueryAuditView(filterRequest: AuditFilterRequest) {
  const { data: response, ...query } = useQuery(
    [QUERY_AUDIT, filterRequest],
    async () => await privateApi.get<Pageable<AuditView>>(`/admin/audit`, { params: filterRequest })
  );

  const { items, total, ...rest } = response?.data || {};
  return { auditViews: items || [], total: total || 0, ...rest, ...query };
}
