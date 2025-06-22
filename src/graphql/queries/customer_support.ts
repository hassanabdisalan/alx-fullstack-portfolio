import { gql } from "@/__generated__";

export const CALL_CUSTOMER = gql(`
query CallCustomer($ticketId: Int!) {
  callCustomer(ticketId: $ticketId) {
    message
    status
    ticket {
      createdAt
      description
      email
      firstName
      id
      lastName
      phone
      platform
      respondedAt
      status
      tickettype
    }
  }
}
`);
