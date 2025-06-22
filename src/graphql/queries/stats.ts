import { gql } from "@/__generated__";

export const SUBSCRIBER_STATS = gql(`
    query SubscriberStats {
  subscriberStats {
    data {
      month
      count
    }
  }
}
    `);



