import { gql } from "@/__generated__";

export const USER_NOTIFICATIONS = gql(`query UserNotifications {
    userNotifications {
      createdAt
      id
      message
      readStatus
      title
      type
      user {
        email
        id
        role
        Fname
        Sname
      }
      userId
    }
  }`);

export const USER_NOTIFICATIOSN_SUBSCRIPTION = gql(`
  subscription Notification {
  notification {
     createdAt
      id
      message
      readStatus
      title
      type
      user {
        email
        id
        role
        Fname
        Sname
      }
      userId
  }
}`);

export const USER_BUSINESS = gql(`
  
    query Business($businessId: Int!) {
    business(businessId: $businessId) {
      email
      id
      location
      name
      owner {
        email
        Fname
        Sname
        image
      }
      phone
      users {
        email
        Fname
        Sname
        image
      }
    }
  }
    
    `);
