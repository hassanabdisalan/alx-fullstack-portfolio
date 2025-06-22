import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SharedflowbizTable } from "../../admin-dashboard/tables/SharedflowbizTable";
import { makeCampaignsColumns } from "./CampaignColumns";
import { ColumnDef } from "@tanstack/react-table";
import { FaPlus } from "react-icons/fa6";
import { CREATE_CAMPAIGN } from "@/graphql/mutations/marketing";
import { GET_CAMPAIGNS } from "@/graphql/queries/admin";

import { AddCampaignModal } from "../../admin-dashboard/forms/AddCompaignModal";
import { CreatePostModal } from "@/components/admin-dashboard/forms/CreatePostModal";
import { toast } from "sonner";

interface Campaign {
  id: string;
  title: string;
}

export function CampaignsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [createCampaign, { loading: isCreating }] = useMutation(
    CREATE_CAMPAIGN,
    {
      refetchQueries: [{ query: GET_CAMPAIGNS }],
    },
  );

  // Fetch our compaigns
  const { data, loading, error, refetch } = useQuery(GET_CAMPAIGNS);

  const handleCreateCampaign = async (campaignData: {
    title: string;
    description: string;
    start: string;
    end: string;
  }) => {
    try {
      const { data } = await createCampaign({
        variables: {
          title: campaignData.title,
          description: campaignData.description,
          start: campaignData.start,
          end: campaignData.end,
        },
      });

      if (data?.createCampaign?.status === "Success") {
        toast.success("Campaign created successfully!");
        setIsModalOpen(false);
        refetch();
      } else {
        toast.error(data?.createCampaign?.message, {
          duration: 50000,dismissible: true,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        duration: 50000,dismissible: true,
      });
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <>
      <SharedflowbizTable
        title="Campaigns"
        data={data?.campaigns?.campaigns || []}
        loading={loading}
        columns={
          makeCampaignsColumns({ refetch }) as ColumnDef<
            {
              __typename?: "Campaign";
              businessId?: number | null;
              createdAt?: any;
              description?: string | null;
              end?: any;
              id?: string | null;
              start?: any;
              title?: string | null;
              status?: string | null;
            },
            any
          >[]
        }
        searchPlaceholder="Search campaigns..."
        actions={(table) => [
          <button
            key="add"
            onClick={() => setIsModalOpen(true)}
            className={`text-foreground hover:bg-background flex items-center gap-2 rounded-sm border px-4 text-sm font-medium`}
          >
            <FaPlus className="h-5 w-5" />
            <span>Add Campaign</span>
          </button>,
          <button
            key="create_post"
            onClick={() => setIsPostModalOpen(true)}
            className={`text-foreground hover:bg-background flex items-center gap-2 rounded-sm border px-4 text-sm font-medium`}
          >
            <FaPlus className="h-5 w-5" />
            <span>Create Post</span>
          </button>,
        ]}
        initialPageSize={6}
        enableRowSelection
      />

      <AddCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
        isLoading={isCreating}
      />

      <CreatePostModal
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        campaigns={
          (data?.campaigns?.campaigns || []).filter(
            (campaign) => campaign.id !== null && campaign.id !== undefined,
          ) as Campaign[]
        }
      />
    </>
  );
}
