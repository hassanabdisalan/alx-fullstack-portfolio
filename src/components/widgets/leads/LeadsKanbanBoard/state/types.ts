import { BusinessLeadStagesQuery, Lead } from "@/__generated__/graphql";

export interface LeadSalesRep {
  id: string;
  Fname: string;
  Sname: string;
  image: string;
}
export type LeadKanbanCard = Lead

export type BusinnessLeadStage = NonNullable<BusinessLeadStagesQuery["businessLeadStages"]>[number];

export type LeadKanbanColumn = BusinnessLeadStage

