import { gql } from "@/__generated__";

export const CURRENT_USER_QUERY = gql(
  `query User {
  user {
    Fname
    Sname
    createdAt
    email
    id
    image
    phone
    role
    business {
      email
      id
      name
      phone
      location
    }
  }
}
  `,
);

export const MARK_NOTIFICATION_AS_READ = gql(`
  mutation MarkNotificationAsRead($notificationIds: [ID!]!) {
    markNotificationAsRead(notificationIds: $notificationIds) {
      message
      status
    }
  }
  `);

export const DELETE_NOTIFICATION = gql(`
  mutation DeleteNotification($notificationIds: [ID!]!) {
    deleteNotification(notificationIds: $notificationIds) {
      message
      status
    }
  }
  `);
