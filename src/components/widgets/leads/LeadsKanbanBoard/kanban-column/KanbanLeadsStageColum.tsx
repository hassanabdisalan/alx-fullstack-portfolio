import { GET_BUSINESS_LEADS_BY_STAGE } from "@/graphql/business-leads";
import { useQuery } from "@apollo/client";
import { KanbanLeadsCard } from "./KanbanLeadsCard";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

interface KanbanLeadsStageColumProps {
  stageId: number; // The ID of the stage to fetch leads for
  stageName: string; // The name of the stage, if needed for display
}

export function KanbanLeadsStageColum({
  stageId,
  stageName,
}: KanbanLeadsStageColumProps) {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data, loading, fetchMore } = useQuery(GET_BUSINESS_LEADS_BY_STAGE, {
    variables: {
      stageId,
      first: DEFAULT_LOAD_ITEMS_COUNT,
    },
  });
  // In your component where you handle loading more
  const handleLoadMore = async (recheck?: boolean) => {
    if (!pageInfo?.hasNextPage || isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      await fetchMore({
        variables: {
          stageId,
          first: DEFAULT_LOAD_ITEMS_COUNT,
          after: recheck ? null : pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.getBusinessLeadsByStage) return prev;

          return {
            getBusinessLeadsByStage: {
              __typename: prev.getBusinessLeadsByStage?.__typename,
              leads: [
                ...(prev.getBusinessLeadsByStage?.leads || []),
                ...(fetchMoreResult?.getBusinessLeadsByStage?.leads || []),
              ],
              pageInfo: fetchMoreResult?.getBusinessLeadsByStage?.pageInfo,
            },
          };
        },
      });
    } catch (error) {
      console.error("Error loading more leads:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };
  const leads = data?.getBusinessLeadsByStage?.leads || [];
  useEffect(() => {
    if (!loading && leads.length === 0) {
      handleLoadMore(true); // Load more leads if the initial fetch returns no leads
    }
  }, [stageId, leads.length]);

  if (loading)
    return (
      <div className="flex h-full min-h-[250px] w-full min-w-10 items-center justify-center">
        Loading...
      </div>
    );

  const pageInfo = data?.getBusinessLeadsByStage?.pageInfo;
  if (!leads || leads.length === 0)
    return (
      <div className="flex h-full min-h-[250px] w-full min-w-10 items-center justify-center">
        No Leads in this stage
        {isFetchingMore && (
          <div className="flex items-center">
            <span className="text-sm">Loading more...</span>
            <Loader className="ml-2 h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    );

  return (
    <div className="pretty-scrollbar flex h-full max-h-[60vh] w-full flex-col items-center gap-2 overflow-scroll py-4">
      {leads.map((lead, idx) => {
        return (
          <KanbanLeadsCard
            idx={idx}
            key={lead.id}
            card={lead}
            stageId={stageId}
            stageName={stageName}
          />
        );
      })}

      <div className="mt-4" onPointerDown={(e) => e.stopPropagation()}>
        {pageInfo?.hasNextPage && (
          <Button
            variant="outline"
            type="button"
            onClick={() => handleLoadMore()}
            disabled={!pageInfo?.hasNextPage || isFetchingMore}
          >
            {isFetchingMore ? (
              <>
                Loading... <Loader className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Load More"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
