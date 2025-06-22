import {
  GET_ALL_TICKETS,
  GET_OPEN_TICKETS,
  GET_TICKET_STATUS_COUNT,
  GET_TOTAL_SUPPORT_TICKETS,
} from "@/graphql/tickets";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";

export function invalidateTicketQueries(currentPage: number = 1) {
  return [
    GET_TICKET_STATUS_COUNT,
    GET_TOTAL_SUPPORT_TICKETS,
    {
      query: GET_OPEN_TICKETS,
      variables: {
        limit: DEFAULT_LOAD_ITEMS_COUNT,
        page: currentPage,
      },
    },
    {
      query: GET_ALL_TICKETS,
      variables: {
        limit: DEFAULT_LOAD_ITEMS_COUNT,
        page: currentPage,
      },
    },
  ];
}
