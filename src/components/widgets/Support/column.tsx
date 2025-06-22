import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiMoreHorizontal, FiPhone, FiMail } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client";
import { CALL_CUSTOMER } from "@/graphql/queries/customer_support";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { formatDateDDMMYY } from "@/utils/time";
import { ClipboardButton } from "@/components/wrappers/ClipboardButton";
import { EmailLeadDialog } from "../leads/LeadsKanbanBoard/dialogs/EmailLeadDialog";
import { Ticket } from "@/__generated__/graphql";
import { DeleteTicketDialog } from "./dialogs/DeleteTicketDialog";
import { invalidateTicketQueries } from "./utils/tickets-cache";
import { DELETE_TICKET } from "@/graphql/tickets";
import { CloseTicketDialog } from "./dialogs/CloseTicketDialog";

type PlatformType = "Emails" | "Social Media" | "Website" | "Events";

const platformBadgeVariants = cva(
  "flex items-center px-3 py-1 rounded-full text-xs font-semibold",
  {
    variants: {
      platform: {
        Emails: "bg-platform-emails text-platform-emails-text",
        "Social Media": "bg-platform-social text-platform-social-text",
        Website: "bg-platform-website text-platform-website-text",
        Events: "bg-platform-events text-platform-events-text",
      },
    },
    defaultVariants: {
      platform: null,
    },
  },
);

const getPlatformBadgeStyles = (platform: PlatformType) => {
  // Check if the platform is one of the predefined variants
  const isValidVariant = [
    "Emails",
    "Social Media",
    "Website",
    "Events",
  ].includes(platform);

  return cn(
    platformBadgeVariants({
      platform: isValidVariant ? (platform as any) : undefined,
    }),
    !isValidVariant && "bg-platform-default-bg text-platform-default-text",
  );
};

type TicketType = "Technical" | "Payments" | "Inquiries" | "Complaints";

const ticketTypeVariants = cva("px-2 py-1 rounded-full text-xs font-semibold", {
  variants: {
    ticketType: {
      Technical: "bg-technical text-technical-foreground",
      Payments: "bg-payments text-payments-foreground",
      Inquiries: "bg-inquiries text-inquiries-foreground",
      Complaints: "bg-complains text-complains-foreground",
    },
  },
  defaultVariants: {
    ticketType: null,
  },
});

const getTicketTypeStyles = (ticketType: TicketType) => {
  // Check if the ticketType is one of the predefined variants
  const isValidVariant = [
    "Technical",
    "Payments",
    "Inquiries",
    "Complaints",
  ].includes(ticketType);

  return cn(
    ticketTypeVariants({
      ticketType: isValidVariant ? (ticketType as any) : undefined,
    }),
    !isValidVariant && "bg-default text-default-foreground",
  );
};

// Define type for props using VariantProps
type PlatformBadgeProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof platformBadgeVariants> & {
    platform: PlatformType;
  };

// Create a PlatformBadge component
function PlatformBadge({ platform, className, ...props }: PlatformBadgeProps) {
  return (
    <div className={getPlatformBadgeStyles(platform)} {...props}>
      {platform}
    </div>
  );
}

// Define type for props using VariantProps
type TicketTypeBadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof ticketTypeVariants> & {
    ticketType: TicketType;
  };

// Create a TicketTypeBadge component
function TicketTypeBadge({
  ticketType,
  className,
  ...props
}: TicketTypeBadgeProps) {
  return (
    <span className={getTicketTypeStyles(ticketType)} {...props}>
      {ticketType}
    </span>
  );
}

// Export the variants and components for reuse elsewhere
export {
  platformBadgeVariants,
  ticketTypeVariants,
  PlatformBadge,
  TicketTypeBadge,
};

export function makeSupportTicketColumns(
  currentPage: number,
): ColumnDef<Ticket, any>[] {
  const columns: ColumnDef<Ticket, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "ticketType",
      header: "Ticket Type",
      cell: ({ row }) => {
        const ticketType = row.getValue<string>("ticketType");
        return (
          <div className="flex items-center">
            <TicketTypeBadge ticketType={ticketType as TicketType} />
          </div>
        );
      },
    },
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => {
        const platform = row.getValue<string>("platform");
        return <PlatformBadge platform={platform as PlatformType} />;
      },
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: ({ row }) => {
        const date = row.getValue<string>("dateCreated");
        return (
          <div className="text-foreground/80 text-sm">
            {formatDateDDMMYY(date)}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const ticket = row.original;
        const [open, setOpen] = useState(false);
        const [openDelete, setOpenDelete] = useState(false);
        const [openCall, setOpenCall] = useState(false);
        const [customerData, setCustomerData] = useState<{
          phone?: string;
          firstName?: string;
          lastName?: string;
        } | null>(null);
        const [loading, setLoading] = useState(false);
        const [deleteTicket] = useMutation(DELETE_TICKET, {
          refetchQueries(result) {
            if (result.data?.deleteTicket?.status === "Success") {
              return invalidateTicketQueries(currentPage);
            }
            return [];
          },
        });
        const callCustomerQuery = useQuery(CALL_CUSTOMER);

        const handleDelete = async () => {
          try {
            const res = await deleteTicket({
              variables: { ticketId: Number(ticket.id) },
            });
            if (res?.data?.deleteTicket?.status === "Success") {
              toast.success("Ticket deleted");
            } else {
              toast.error("Failed to delete ticket", {
                duration: 50000,
                dismissible: true,
              });
            }
          } catch (error) {
            console.log(error);
            toast.error("Error deleting ticket", {
              duration: 50000,
              dismissible: true,
            });
          } finally {
            setOpenDelete(false);
          }
        };

        const handleCallCustomer = async () => {
          setLoading(true);
          try {
            const res = await callCustomerQuery.refetch({
              ticketId: Number(ticket.id),
            });
            if (res?.data?.callCustomer?.status === "Success") {
              setCustomerData({
                phone: res.data.callCustomer.ticket?.phone ?? undefined,
                firstName: res.data.callCustomer.ticket?.firstName ?? undefined,
                lastName: res.data.callCustomer.ticket?.lastName ?? undefined,
              });
              setOpenCall(true);
            } else {
              toast.error("Failed to retrieve customer details", {
                duration: 50000,
                dismissible: true,
              });
            }
          } catch (error) {
            console.error(error);
            toast.error("Error fetching customer details", {
              duration: 50000,
              dismissible: true,
            });
          } finally {
            setLoading(false);
          }
        };

        return (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FiMoreHorizontal size={16} />
              </PopoverTrigger>
              <PopoverContent className="bg-primary w-40 p-1" align="end">
                <div className="flex flex-col space-y-1">
                  <Button className="flex w-full justify-start hover:brightness-75">
                    {ticket.email && (
                      <EmailLeadDialog
                        email={ticket.email}
                        name={`${ticket.firstName} ${ticket.lastName}`}
                        trigger={
                          <span className="flex items-center justify-start gap-2">
                            <FiMail className="h-4 w-4" />
                            Send email
                          </span>
                        }
                      />
                    )}
                  </Button>
                  <Button
                    className="flex w-full justify-start hover:brightness-75"
                    onClick={handleCallCustomer}
                    disabled={loading}
                  >
                    <FiPhone className="mr-2 h-4 w-4" />
                    {loading ? "Loading..." : "Call"}
                  </Button>
                  <div className="border-muted/30 my-1 border-t hover:brightness-75"></div>
                  <DeleteTicketDialog
                    ticketId={parseInt(ticket.id!)}
                    onClose={() => setOpenDelete(false)}
                    currentPage={currentPage}
                  />

                  <CloseTicketDialog
                    ticketId={parseInt(ticket.id!)}
                    onClose={() => setOpen(false)}
                    currentPage={currentPage}
                  />
                </div>
              </PopoverContent>
            </Popover>
            {/* Call Customer Dialog */}
            <Dialog open={openCall} onOpenChange={setOpenCall}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex max-w-[88%] items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-primary" />
                      <span>Call Customer</span>
                    </div>
                    <Badge variant="outline" className="bg-background">
                      {ticket.tickettype}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col p-4">
                  <div className="flex w-full flex-col gap-2 rounded-lg">
                    <div className="flex w-full gap-2">
                      <h4 className="max-w-[350px] truncate text-3xl font-medium">
                        {customerData?.firstName}
                      </h4>
                      <p className="text-muted text-sm">Ticket #{ticket.id}</p>
                    </div>
                    <div className="line-clamp-1 w-full max-w-[350px] truncate text-3xl font-semibold">
                      {customerData?.phone || "Not available"}
                    </div>
                    {customerData?.phone && (
                      <ClipboardButton
                        displayText="Copy Phone"
                        text={customerData?.phone}
                        // onlyShowCopy
                      />
                    )}
                  </div>
                </div>
                <DialogFooter className="sm:justify-between">
                  <Button variant="outline" onClick={() => setOpenCall(false)}>
                    Close
                  </Button>
                  <Button
                    className="bg-success text-success-foreground hover:bg-success-foreground/20"
                    onClick={() => {
                      if (customerData?.phone) {
                        window.open(`tel:${customerData.phone}`);
                      }
                    }}
                    disabled={!customerData?.phone}
                  >
                    <FiPhone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Confirm Deletion Dialog */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <p>This action will permanently delete this ticket.</p>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setOpenDelete(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-background cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
  ];

  return columns;
}
