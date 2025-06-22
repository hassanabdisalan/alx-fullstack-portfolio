import { useState } from "react";
import { makeSupportTicketColumns } from "@/components/widgets/Support/column";
import { useQuery } from "@apollo/client";

import { FaPlus } from "react-icons/fa6";
import { AddTicketModal } from "@/components/widgets/Support/dialogs/AddTicketModal";
import { Button } from "@/components/ui/button";

import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";
import { FlowbizPaginatedTable } from "@/components/tables/FlowbizPaginatedTable";
import { parseAsInteger, useQueryState } from "nuqs";
import { GET_ALL_TICKETS } from "@/graphql/tickets";

export function AllTicketsTableWidget() {
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
    const [currentPage, setCurrentPage] = useQueryState(
      "p",
      parseAsInteger.withDefault(1),
    );

  const { data, loading, refetch } = useQuery(GET_ALL_TICKETS, {
    variables: {
      limit: DEFAULT_LOAD_ITEMS_COUNT,
      page: currentPage,
    },
    onError: (error) => {
      console.log("Error fetching open tickets", error);
    },
  });

  const columns = makeSupportTicketColumns(currentPage);

  const handleTicketCreated = () => {
    refetch();
  };

  // Transform the data to match the expected table format
  const tableData =
    data?.tickets?.tickets?.map((ticket) => ({
      id: ticket.id,
      firstName: ticket.firstName,
      lastName: ticket.lastName,
      ticketType: ticket.tickettype as
        | "Technical"
        | "Payments"
        | "Inquiries"
        | "Complaints",
      platform: ticket.platform as
        | "Emails"
        | "Social Media"
        | "Website"
        | "Events",
      dateCreated: new Date(ticket.createdAt).toLocaleDateString(),
      status: ticket.status,
      respondedAt: ticket.respondedAt
        ? new Date(ticket.respondedAt).toLocaleDateString()
        : "Not responded",
      description: ticket.description,
      email: ticket.email,
      phone: ticket.phone,
    })) ?? [];

  const pageSize = DEFAULT_LOAD_ITEMS_COUNT;
  const totalItems = data?.tickets?.pageInfo?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <FlowbizPaginatedTable
        key={currentPage} // Ensure table re-renders on page change
        title="Tickets"
        data={tableData}
        // @ts-expect-error
        columns={columns}
        loading={loading}
        searchPlaceholder="Search tickets..."
        actions={(table) => {
          // const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
          return [
            <Button
              size="sm"
              onClick={() => setIsCreateTicketModalOpen(true)}
              className="gap-2"
            >
              <FaPlus className="h-4 w-4" />
              <span>Add Ticket</span>
            </Button>,
          ];
        }}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={(page) => {
          // console.log("Page changed to:", page);
          setCurrentPage(page);
          refetch({
            limit: pageSize,
            page: page,
          });
        }}
        totalPages={totalPages}
        enableRowSelection
      />

      <AddTicketModal
        currentPage={currentPage}
        open={isCreateTicketModalOpen}
        onClose={() => setIsCreateTicketModalOpen(false)}
        onSuccess={handleTicketCreated}
      />
    </>
  );
}
