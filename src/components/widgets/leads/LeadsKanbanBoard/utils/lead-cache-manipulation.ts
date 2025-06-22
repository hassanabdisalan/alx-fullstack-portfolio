import { GET_BUSINESS_LEADS_BY_STAGE } from "@/graphql/business-leads";
import client from "@/lib/apollo/client";
import { Lead } from "@/__generated__/graphql";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

interface HandleLeadDragEndFailureCacheUpdateParams {
  activeLeadId: number;
  oldStageId: number;
  activeLeadIdx: number;
  newStageId: number;

  // leadData: Lead;
}

export const handleLeadDragEndfailureCacheUpdate = ({
      activeLeadId,
      oldStageId,
      activeLeadIdx,
      newStageId,
}: HandleLeadDragEndFailureCacheUpdateParams) => {
  console.log(" ========== handleLeadDragEndfailureCacheUpdate =============== ", {
    activeLeadId,
    oldStageId,
    activeLeadIdx,
    newStageId,
  });
  // Get current stage data
  const currentStageQuery = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: newStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });
  const currentLeads = currentStageQuery?.getBusinessLeadsByStage?.leads ?? [];

  // Find the lead that was moved
  const itemToUpdate = currentLeads.find((lead) => lead.id === activeLeadId);

  if (!itemToUpdate) return;

  // Get previous stage data
  const previousStageQuery = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: oldStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });

  const previousStageLeads =
    previousStageQuery?.getBusinessLeadsByStage?.leads || [];
  const previousStagePageInfo = previousStageQuery?.getBusinessLeadsByStage
    ?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };

  // Create a new array instead of modifying the existing one
  const updatedPreviousLeads = [...previousStageLeads];
  // Insert the lead at the correct position
  updatedPreviousLeads.splice(activeLeadIdx, 0, itemToUpdate);
console.log(" ========== updatedPreviousLeads =============== ", updatedPreviousLeads);
  // Update the Apollo cache with the new array
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: oldStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: updatedPreviousLeads,
        pageInfo: previousStagePageInfo,
      },
    },
  });

  // Also remove the lead from the new stage
  const updatedCurrentLeads = currentLeads.filter(
    (lead) => lead.id !== activeLeadId,
  );
  const currentStagePageInfo = currentStageQuery?.getBusinessLeadsByStage
    ?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };

  console.log(
    " ========== updatedCurrentLeads =============== ", updatedCurrentLeads
  );  
  // Write back to the cache
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: newStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: updatedCurrentLeads,
        pageInfo: currentStagePageInfo,
      },
    },
  });
};

interface HandleLeadDragEndCacheUpdateParams {
  activeLeadId: number;
  oldStageId: number;
  overLeadIdx: number;
  newStageId: number;
}
export const handleLeadDragEndCacheUpdate = ({
  activeLeadId,
  oldStageId,
  overLeadIdx = -1,
  newStageId,
  // leadData,
}: HandleLeadDragEndCacheUpdateParams) => {
  // 1. Read the lead from the previous stage cache
  // console.log({ activeLeadId, oldStageId, overLeadIdx, newStageId });

  const previousStageQuery = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: oldStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });

  const leadFromPreviousStage =
    previousStageQuery?.getBusinessLeadsByStage?.leads?.find(
      (lead) => lead.id === activeLeadId,
    );

  if (!leadFromPreviousStage) {
    console.error("Lead not found in previous stage cache");
    return;
  }

  // 2. Add the lead to the new stage cache
  const targetStageData = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: newStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });

  const targetStagePageInfo = targetStageData?.getBusinessLeadsByStage
    ?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };

  const targetStageLeads =
    targetStageData?.getBusinessLeadsByStage?.leads || [];
  const updatedLead = {
    id: activeLeadId,
    ...leadFromPreviousStage,
    stageId: newStageId,
  };
  const updatedTargetLeads = [...targetStageLeads];

  if (overLeadIdx >= 0) {
    updatedTargetLeads.splice(overLeadIdx, 0, updatedLead);
    const updatedLeads = updatedTargetLeads;
    client.writeQuery({
      query: GET_BUSINESS_LEADS_BY_STAGE,
      variables: { stageId: newStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
      data: {
        getBusinessLeadsByStage: {
          __typename: "GetLeadsResponse",
          leads: updatedLeads,
          pageInfo: targetStagePageInfo,
        },
      },
    });
  } else {
    const finalUpdatedTargetLeads = [...updatedTargetLeads, updatedLead];
    client.writeQuery({
      query: GET_BUSINESS_LEADS_BY_STAGE,
      variables: { stageId: newStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
      data: {
        getBusinessLeadsByStage: {
          __typename: "GetLeadsResponse",
          leads: finalUpdatedTargetLeads,
          pageInfo: targetStagePageInfo,
        },
      },
    });
  }

  // 4. Remove the lead from the previous stage cache
  const previousStageLeads =
    previousStageQuery?.getBusinessLeadsByStage?.leads || [];
  const previousStagePageInfo = previousStageQuery?.getBusinessLeadsByStage
    ?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };

  const updatedPreviousLeads = previousStageLeads.filter(
    (lead) => lead.id !== activeLeadId,
  );

  // 5. Update the previous stage without the moved lead
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId: oldStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: updatedPreviousLeads,
        pageInfo: previousStagePageInfo,
      },
    },
  });
};

interface AddLeadInCacheParams {
  leadId: number;
  stageId: number;
  newLead: Lead;
}
export const addLeadInCache = ({
  leadId,
  stageId,
  newLead,
}: AddLeadInCacheParams) => {
  const previousData = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });
  const prevPageInfo = previousData?.getBusinessLeadsByStage?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };
  const prevLeads = previousData?.getBusinessLeadsByStage?.leads || [];
  const newLeads = [...prevLeads, { ...newLead, id: leadId }];
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: newLeads,
        pageInfo: prevPageInfo,
      },
    },
  });
};

interface UpdateLeadInCacheParams {
  leadId: number;
  stageId: number;
  updatedLead: Lead;
}
export const updateLeadInCache = ({
  leadId,
  stageId,
  updatedLead,
}: UpdateLeadInCacheParams) => {
  const previousData = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });
  const prevPageInfo = previousData?.getBusinessLeadsByStage?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };
  const prevLeads = previousData?.getBusinessLeadsByStage?.leads || [];
  const newLeads = prevLeads.map((lead) => {
    if (lead.id === leadId) {
      return { ...lead, ...updatedLead };
    }
    return lead;
  });
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: newLeads,
        pageInfo: prevPageInfo,
      },
    },
  });
};

interface DeleteLeadFromCacheParams {
  leadId: number;
  stageId: number;
}
export const deleteLeadFromCache = ({
  leadId,
  stageId,
}: DeleteLeadFromCacheParams) => {
  const previousData = client.readQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
  });
  const prevPageInfo = previousData?.getBusinessLeadsByStage?.pageInfo || {
    __typename: "PageInfo",
    hasNextPage: false,
    endCursor: null,
  };
  const prevLeads = previousData?.getBusinessLeadsByStage?.leads || [];
  const newLeads = prevLeads.filter((lead) => lead.id !== leadId);
  client.writeQuery({
    query: GET_BUSINESS_LEADS_BY_STAGE,
    variables: { stageId, first: DEFAULT_LOAD_ITEMS_COUNT },
    data: {
      getBusinessLeadsByStage: {
        __typename: "GetLeadsResponse",
        leads: newLeads,
        pageInfo: prevPageInfo,
      },
    },
  });
};
