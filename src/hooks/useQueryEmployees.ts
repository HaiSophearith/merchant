import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../axios";
import { Employee, FilterEmployee, Pageable } from "../types/types";

export const QUERY_EMPLOYEE = "query-employee";

interface BusinessId {
  businessId: string;
  employeeFilter: FilterEmployee;
}

export default function useQueryEmployees({ businessId, employeeFilter }: BusinessId) {
  const { data: response, ...query } = useQuery(
    [QUERY_EMPLOYEE, businessId],
    async () => await privateApi.get<Pageable<Employee>>(`/admin/employees/${businessId}`, { params: employeeFilter }),
    {
      enabled: !!businessId,
    }
  );

  const { items, total, ...rest } = response?.data || {};
  return { employees: items || [], total: total || 0, ...rest, ...query };
}
