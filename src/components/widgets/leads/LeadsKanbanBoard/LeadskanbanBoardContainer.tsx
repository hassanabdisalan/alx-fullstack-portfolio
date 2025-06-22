import { useQuery } from "@apollo/client";

import {
  GET_BUSINESS_LEADS_BY_STAGE,
  GET_LEADS_STAGE,
} from "@/graphql/business-leads";
import { LeadsKanbanBoard } from "./LeadsKanbanBoard";
import { RefetchQueryButton } from "@/lib/apollo/activity-buttons";
import client from "@/lib/apollo/client";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

interface LeadskanbanBoardContainerProps {}

export function LeadskanbanBoardContainer({}: LeadskanbanBoardContainerProps) {
  const { data, loading, refetch } = useQuery(GET_LEADS_STAGE);

  if (loading)
    return (
      <div className="h-[] flex h-full w-full items-center justify-center gap-4 px-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="skeleton bg-primary/10 group border-muted h-[250px] w-full cursor-grab border py-2 transition-shadow hover:shadow-md active:cursor-grabbing"
          ></div>
        ))}
      </div>
    );
  const columns = data?.businessLeadStages ?? [];
  const sortedColumns = [...columns].sort((a, b) => {
    if (!a?.position || !b?.position) {
      return 0; // If position is not defined, keep original order
    }
    return a?.position - b?.position;
  });

  async function reloadLeads() {
    await refetch().then(() => {
      const leadsQueries = sortedColumns.map((col) => ({
        query: GET_BUSINESS_LEADS_BY_STAGE,
        variables: {
          stageId: col.id,
          first: DEFAULT_LOAD_ITEMS_COUNT,
        },
      }));
      // client.refetchQueries({});
      return client.refetchQueries({
        include: leadsQueries.map((q) => q.query),
        updateCache: (cache) => {
          leadsQueries.forEach(({ query, variables }) => {
            cache.evict({
              fieldName: "getBusinessLeadsByStage",
              args: variables,
            });
          });
        },
      });
    });
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <RefetchQueryButton reload={reloadLeads} className="h-5" />
      <LeadsKanbanBoard columns={sortedColumns} />
    </div>
  );
}
