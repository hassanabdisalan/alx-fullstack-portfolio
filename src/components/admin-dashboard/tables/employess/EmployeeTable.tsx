"use no memo";
import { makeEmployeeColumns } from "./columns";
import { AiOutlineExport } from "react-icons/ai";
import { useQuery } from "@apollo/client";
import { EMPLOYEES } from "@/graphql/queries/admin";
import { exportToCsv } from "@/utils/csv";
import { getSuffixDate } from "@/utils/time";
import { InviteUserModal } from "../../forms/InviteUserModal";
import { getSelectedRows } from "@/lib/tanstack/table";
import { FlowbizPaginatedTable } from "@/components/tables/FlowbizPaginatedTable";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

import { Button } from "@/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";

interface EmployeeTableProps {}

export function EmployeeTable({}: EmployeeTableProps) {
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useQueryState(
    "p",
    parseAsInteger.withDefault(1),
  );

  const { data, loading, refetch } = useQuery(EMPLOYEES, {
    variables: {
      limit: DEFAULT_LOAD_ITEMS_COUNT,
      page: currentPage,
    },
    pollInterval: 120_000, // Poll every 120 seconds
  });

  const columns = useMemo(
    () => makeEmployeeColumns(currentPage),
    [currentPage],
  );
  const employees = data?.employees?.employees || [];

  const pageSize = DEFAULT_LOAD_ITEMS_COUNT;
  const totalItems = data?.employees?.pageInfo?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <FlowbizPaginatedTable
      key={currentPage} // Ensure table re-renders on page change
      title="Employee Engagement"
      data={employees}
      loading={loading}
      columns={columns}
      searchPlaceholder="Search employees..."
      actions={(table) => [
        <Button
          key="export"
          variant="outline"
          size="sm"
          disabled={!employees.length}
          onClick={() => {
            const selectedRows = getSelectedRows(table);
            if (selectedRows) {
              exportToCsv(selectedRows, `flowbiz_employees_${getSuffixDate()}`);
            }
          }}
          className="gap-1"
        >
          <AiOutlineExport className="h-4 w-4" />
          <span>Export</span>
        </Button>,
        <InviteUserModal key="invite" />,
      ]}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={(page) => {
        setCurrentPage(page);
        refetch({
          limit: pageSize,
          page: page,
        });
      }}
      totalPages={totalPages}
      enableRowSelection
    />
  );
}
