import { Users } from "@/__generated__/graphql";
import { EMPLOYEES, EMPLOYY_COUNT } from "@/graphql/queries/admin";
import { USER_BUSINESS } from "@/graphql/current-user";
import client from "@/lib/apollo/client";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

export const updateEmployeeInCache = (employee: Users, page: number) => {
  const existingEmployees = client.readQuery({
    query: EMPLOYEES,
    variables: { limit: DEFAULT_LOAD_ITEMS_COUNT, page },
  });
  const prevEmployees = existingEmployees?.employees?.employees || [];
  const updatedEmployees = prevEmployees.map((e) => {
    if (e.id === employee.id) {
      return {
        ...e,
        ...employee,
      };
    }
    return e;
  });
  console.log("Updating employee in cache", employee, updatedEmployees);
  client.writeQuery({
    query: EMPLOYEES,
    variables: { limit: DEFAULT_LOAD_ITEMS_COUNT, page },
    data: {
      employees: {
        ...existingEmployees?.employees,
        employees: updatedEmployees,
      },
    },
  });
};

export const deleteEmployeeFromCache = (employeeId: string, page: number) => {
  const existingEmployees = client.readQuery({
    query: EMPLOYEES,
    variables: { limit: DEFAULT_LOAD_ITEMS_COUNT, page },
  });
  const prevEmployees = existingEmployees?.employees?.employees || [];
  const updatedEmployees = prevEmployees.filter((e) => e.id !== employeeId);
  client.writeQuery({
    query: EMPLOYEES,
    variables: { limit: DEFAULT_LOAD_ITEMS_COUNT, page },
    data: {
      employees: {
        ...existingEmployees?.employees,
        employees: updatedEmployees,
      },
    },
  });
};

export function employeeQueriesToInvalidate({ currentPage, businessId }: { currentPage: number; businessId: number }) {
  return [
    {
      query: EMPLOYEES,
      variables: { limit: DEFAULT_LOAD_ITEMS_COUNT, page: currentPage },
    },
    {
      query: EMPLOYY_COUNT,
    },
    {
      query: USER_BUSINESS,
      variables: {
        businessId,
      },
    },
  ];
}
