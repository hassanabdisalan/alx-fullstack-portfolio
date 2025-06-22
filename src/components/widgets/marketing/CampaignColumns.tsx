import { useState, JSX } from "react";
import { ColumnDef } from "@tanstack/react-table";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DELETE_A_CAMPAIGN } from "@/graphql/mutations/marketing";
import { UPDATE_A_CAMPAIGN } from "@/graphql/mutations/marketing";
import { ViewCampaignModal } from "@/components/admin-dashboard/forms/ViewCampaignModal";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { toast } from "sonner";
import { EditCampaignModal } from "@/components/admin-dashboard/forms/EditCampaignModal";

interface Campaign {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  createdAt: string;
  businessId: number;
  channels: string[];
  status?: string;
}

const formatRelativeDate = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timeString = timeFormatter.format(date);

  if (isToday) return `Today ${timeString}`;
  if (isYesterday) return `Yesterday ${timeString}`;

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${dateFormatter.format(date)} ${timeString}`;
};

const ActionsCell = ({ row, refetch }: { row: any; refetch: () => void }) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteCampaign, { loading }] = useMutation(DELETE_A_CAMPAIGN, {
    onCompleted: (data) => {
      if (data?.deleteCampaign?.status === "Success") {
        toast.success("Campaign deleted successfully.");
        refetch();
      } else {
        toast.error("Failed to delete campaign.", {
          duration: 50000,dismissible: true,
        });
      }
    },
    onError: (error) => {
      toast.error("An error occurred while deleting the campaign.", {
        duration: 50000,dismissible: true,
      });
      console.log("Error deleting campaign", error);
    },
  });

  const [updateCampaign, { loading: isUpdating }] = useMutation(
    UPDATE_A_CAMPAIGN,
    {
      onCompleted: () => {
        toast.success("Campaign updated successfully.");
        refetch();
      },
      onError: () => {
        toast.error("Failed to update campaign.", {
          duration: 50000,dismissible: true,
        });
      },
    },
  );

  const campaign = row.original;

  const handleDelete = async () => {
    try {
      await deleteCampaign({
        variables: { deleteCampaignId: Number(campaign.id) },
      });
    } catch (error) {
      console.log("Error deleting compaign", error);
    } finally {
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="hover:bg-background text-muted-foreground hover:text-primary rounded-full p-1 transition-colors">
            <FiMoreHorizontal className="cursor-pointer" size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="shadow-0 h-fit w-fit border-none bg-red-900 p-0"
          align="end"
          sideOffset={8}
        >
          <div className="absolute top-0 left-0">
            <div className="bg-primary text-primary-foreground z-20 mb-1 w-30 rounded-t-md rounded-br-md shadow-lg">
              <div className="py-1">
                <button
                  className="border-b-background block w-full cursor-pointer border-b px-4 py-1 text-left text-sm"
                  onClick={() => setIsViewModalOpen(true)}
                >
                  View
                </button>
                <button
                  className="border-b-background block w-full cursor-pointer border-b px-4 py-1 text-left text-sm"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit
                </button>
                <div className="border-foreground mx-2 border-t" />
                <button
                  className="hover:bg-error-foreground block w-full cursor-pointer px-4 py-1 text-left text-sm transition-colors"
                  onClick={() => setIsDeleteConfirmOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {isViewModalOpen && (
        <ViewCampaignModal
          campaignId={Number(campaign.id)}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditCampaignModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={async (data) => {
            try {
              await updateCampaign({
                variables: {
                  updateCampaignId: Number(campaign.id),
                  title: data.title,
                  start: data.start,
                  end: data.end,
                  channel: campaign.channels,
                },
              });
              setIsEditModalOpen(false);
            } catch (error) {
              console.error("Error updating campaign", error);
            }
          }}
          isLoading={isUpdating}
          campaign={{
            title: campaign.title,
            description: campaign.description,
            start: campaign.start,
            end: campaign.end,
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Campaign?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{campaign.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-muted-foreground text-foreground/70 bg-background hover:bg-background cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-background bg-error-foreground cursor-pointer rounded-md px-4 py-2 text-sm font-medium hover:bg-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Campaign"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export function makeCampaignsColumns({
  refetch,
}: {
  refetch: () => void;
}): ColumnDef<Campaign>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "start",
      header: "Start",
      cell: ({ row }) => {
        const start = row.getValue<string>("start");
        return (
          <div className="text-foreground/80 text-sm">
            {formatRelativeDate(start)}
          </div>
        );
      },
    },
    {
      accessorKey: "end",
      header: "End",
      cell: ({ row }) => {
        const end = row.getValue<string>("end");
        return (
          <div className="text-foreground/80 text-sm">
            {formatRelativeDate(end)}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => {
        const createdAt = row.getValue<string>("createdAt");
        return (
          <div className="text-foreground/80 text-sm">
            {formatRelativeDate(createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "channels",
      header: "Channels",
      cell: ({ row }) => {
        // retrieve the channels directly from campaign
        const channels = row.original.channels || [];
        if (!channels.length) {
          return <span className="text-sm text-gray-400">No channels</span>;
        }

        // Define your channel icons
        const iconsMap: Record<string, JSX.Element> = {
          twitter: (
            <BsTwitterX className="h-5 w-5 text-blue-400" title="Twitter" />
          ),
          facebook: (
            <FaFacebook className="h-5 w-5 text-blue-600" title="Facebook" />
          ),
          instagram: (
            <FaInstagram className="h-5 w-5 text-pink-500" title="Instagram" />
          ),
          linkedin: (
            <FaLinkedin className="h-5 w-5 text-blue-700" title="LinkedIn" />
          ),
        };

        return (
          <div className="flex gap-1">
            {channels.map((channel) => (
              <div key={channel} title={channel}>
                {iconsMap[channel.toLowerCase()] || (
                  <span className="text-gray-400">{channel}</span>
                )}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => <ActionsCell row={row} refetch={refetch} />,
    },
  ];
}
