import { gql } from "@/__generated__";

export const GET_USER_EVENTS_QUERY = gql(`
  query GetUserEvents {
    getUserEvents {id, title, description, start, end, user { id, Fname, email } }
  }
`);
