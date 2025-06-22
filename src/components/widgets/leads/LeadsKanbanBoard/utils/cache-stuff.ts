import { GET_LEADS_STAGE } from "@/graphql/business-leads";
import { RECENT_LEADS, LEADS_SUMMARY, GET_LEAD_SOURCES, MONTHLY_LEAD_TRENDS } from "@/graphql/queries/admin";
import { SUBSCRIBER_STATS } from "@/graphql/queries/stats";

export function invalidateLeadsCache() {
  return [
    {
      query: GET_LEADS_STAGE,
    },
    {
      query: RECENT_LEADS,
    },
    {
      query: LEADS_SUMMARY,
    },
    {
      query: GET_LEAD_SOURCES,
    },
    {
      query: MONTHLY_LEAD_TRENDS,
    },
    {
      query:SUBSCRIBER_STATS
    }
  ];
}
