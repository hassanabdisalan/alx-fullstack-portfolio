import { AiOutlineExport } from "react-icons/ai";
import { RECENT_LEADS } from "@/graphql/queries/admin";
import { useQuery } from "@apollo/client";
import { makeRecentLeadsColumns } from "@/components/admin-dashboard/tables/leads/column";
import { SharedflowbizTable } from "@/components/admin-dashboard/tables/SharedflowbizTable";
import { exportToCsv } from "@/utils/csv";
import { getSuffixDate } from "@/utils/time";

import { getSelectedRows } from "@/lib/tanstack/table";

interface Lead {
  Fname: string;
  Sname: string;
  createdAt: string;
  email: string;
  id: number;
  phone: string;
  revenue: number;
  source: string;
  stage: string;
  status: string;
}

export function RecentLeadsTableWidget() {
  const { data, loading } = useQuery(
    RECENT_LEADS,
  );
  const columns = makeRecentLeadsColumns();
  return (
    <SharedflowbizTable
      title="Recent Leads"
      data={data?.recentLeads ?? []}
      loading={loading}
      // @ts-expect-error
      columns={columns}
      searchPlaceholder="Search..."
      actions={(table) => [
        <button
          disabled={!data?.recentLeads}
          onClick={() => {
            const selectedRows = getSelectedRows(table);
            if (selectedRows) {
              exportToCsv(
                selectedRows,
                `flowbiz_recent_leads_${getSuffixDate()}`,
              );
            }
          }}
          className={`border-foreground/20 bg-background/90 text-foreground hover:bg-muted flex cursor-pointer items-center gap-1 rounded border px-2 py-1.5 text-sm`}
        >
          <AiOutlineExport className="text-foreground" />
          <span>Export</span>
        </button>,
        // <InviteUserModal />,
        ,
      ]}
      initialPageSize={6}
      enableRowSelection
    />
  );
}
