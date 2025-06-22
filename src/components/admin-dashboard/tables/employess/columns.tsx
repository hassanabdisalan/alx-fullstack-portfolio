import { useState } from "react";
import { Users } from "@/__generated__/graphql";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EMPLOYEES, EMPLOYY_COUNT } from "@/graphql/queries/admin";
import {
  DELETE_EMPLOYEE,
  DEACTIVATE_EMPLOYEE,
  ACTIVATE_EMPLOYEE,
} from "@/graphql/mutations/admin";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";
import { useViewer } from "@/hooks/use-viewr";
import { USER_BUSINESS } from "@/graphql/current-user";
import { employeeQueriesToInvalidate } from "./employee-cache";

// Helper function to format dates as relative time
const formatRelativeDate = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  // Format the time part (e.g., "5:40 PM")
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const timeString = timeFormatter.format(date);

  if (isToday) {
    return `Today ${timeString}`;
  } else if (isYesterday) {
    return `Yesterday ${timeString}`;
  } else {
    // For older dates, show the date and time
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${dateFormatter.format(date)} ${timeString}`;
  }
};




const ActionsCell = ({
  row,
  currentPage,
  table,
}: {
  row: Row<Users>;
  currentPage: number;
  table: Table<Users>;
}) => {
   const { user } = useViewer();
  const businessId = parseInt(user?.business?.id ?? "-1");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isActivateConfirmOpen, setActivationConfirmOpen] = useState(false);

  const employee = row.original;
  const isActive = employee.status === "Active";

  const [deleteEmployee, { loading: deleteLoading }] = useMutation(
    DELETE_EMPLOYEE,
    {
      onCompleted: (data) => {
        if (data?.deleteEmployee?.status === "Success") {
          toast.success("Employee deleted successfully");
        } else {
          console.log("Failed to delete employee", data);
          toast.error("Failed to delete employee", {
            duration: 50000,
            dismissible: true,
          });
        }
      },
      refetchQueries(result) {
        return employeeQueriesToInvalidate({ currentPage, businessId });
      },
      onError: (error) => {
        console.log("Error deleting employee", error);
        toast.error("An error occurred while deleting employee.", {
          duration: 50000,
          dismissible: true,
        });
      },
    },
  );

  const [activateEmployee, { loading: activateLoading }] = useMutation(
    ACTIVATE_EMPLOYEE,
    {
      onCompleted: (data) => {
        if (data?.activateEmployee?.status === "Success") {
          toast.success("Employee activated successfully");
          setActivationConfirmOpen(false);
        }
      },
      refetchQueries(result) {
        return employeeQueriesToInvalidate({ currentPage, businessId });
      },
      onError: (error) => {
        console.log("Error activating employee", error);
        toast.error("An error occurred while activating employees", {
          duration: 50000,
          dismissible: true,
        });
      },
    },
  );
  const [deactivateEmployee, { loading: deactivateLoading }] = useMutation(
    DEACTIVATE_EMPLOYEE,
    {
      onCompleted: (data) => {
        if (data?.deactivateEmployee?.status === "Success") {
          toast.success("Employee deactivated successfully");
          setActivationConfirmOpen(false);
        } else {
          console.log("Failed to deactivate employee", data);
          toast.error("Failed to deactivate employee", {
            duration: 50000,
            dismissible: true,
          });
        }
      },
      refetchQueries(result) {
        return employeeQueriesToInvalidate({ currentPage, businessId });
      },

      onError: (error) => {
        console.log("Error deactivating employee", error);
        toast.error("An error occurred while deactivating employees", {
          duration: 50000,
          dismissible: true,
        });
      },
    },
  );

  const handleDelete = async () => {
    try {
      await deleteEmployee({
        variables: { deleteEmployeeId: Number(employee.id) },
      });
    } catch (error) {
      console.log("Error deleting Employee", error);
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleActivation = async (activate: boolean) => {
    try {
      if (activate) {
        await deactivateEmployee({
          variables: { deactivateEmployeeId: Number(employee.id) },
        });
      } else {
        await activateEmployee({
          variables: { activateEmployeeId: Number(employee.id) },
        });
      }
    } catch (error) {
      console.log("Error deactivating Employee", error);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <FiMoreHorizontal className="cursor-pointer" size={16} />
        </PopoverTrigger>
        <PopoverContent
          className="shadow-0 h-fit w-fit border-none bg-red-900 p-0"
          align="end"
          sideOffset={8}
        >
          <div className="absolute top-0 left-0">
            <div className="bg-primary text-foreground z-20 mb-1 w-30 rounded-t-md rounded-br-md shadow-lg">
              <div className="py-1 text-white">
                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-1 text-left text-sm"
                  onClick={() => setIsDeleteConfirmOpen(true)}
                >
                  Delete
                </button>
                <div className="border-background border-t"></div>

                <button
                  type="button"
                  className="block w-full cursor-pointer px-4 py-1 text-left text-sm"
                  onClick={(e) => {
                    setActivationConfirmOpen(true);
                  }}
                >
                  {row.original.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Employee?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete{" "}
              <span className="text-foreground">{employee.Fname}?</span> This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-muted-foreground bg-background text-foreground hover:bg-muted cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/70"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete Employee"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivate Confirmation Dialog */}
      <AlertDialog
        open={isActivateConfirmOpen}
        onOpenChange={setActivationConfirmOpen}
      >
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              {isActive ? "Deactivate Employee?" : "Activate Employee?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground text-sm">
              Are you sure you want to {isActive ? "deactivate" : "activate"}{" "}
              <span className="text-foreground">{employee.Fname}?</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-muted-foreground bg-background text-foreground hover:bg-muted cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/70"
              disabled={deactivateLoading || activateLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleActivation(isActive);
              }}
            >
              {isActive ? (
                <span>
                  {deactivateLoading
                    ? "Deactivating..."
                    : "Deactivate Employee"}
                </span>
              ) : (
                <span>
                  {activateLoading ? "Activating..." : "Activate Employee"}
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export function makeEmployeeColumns(
  currentPage: number,
): ColumnDef<Users, any>[] {
  const columns: ColumnDef<Users, any>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "Fname",
      header: "First Name",
    },
    {
      accessorKey: "Sname",
      header: "Last Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = row.getValue<string>("lastLogin");
        return (
          <div className="text-foreground/70 text-sm">
            {formatRelativeDate(lastLogin)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const getStatusClass = () => {
          switch (status?.toLowerCase()) {
            case "active":
              return "bg-green-100 text-green-800";
            case "idle":
              return "bg-yellow-100 text-yellow-800";
            case "offline":
              return "bg-slate-100 text-slate-800";
            default:
              return "bg-slate-100 text-slate-800";
          }
        };

        return (
          <span
            className={`rounded-full px-2 py-1 text-xs ${getStatusClass()}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row, getValue, table }) => {
        return (
          <ActionsCell
            key={row.original.status}
            row={row}
            currentPage={currentPage}
            table={table}
          />
        );
      },
    },
  ];
  return columns;
}
