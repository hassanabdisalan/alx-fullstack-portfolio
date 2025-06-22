import { gql } from "@/__generated__";

export const SEND_EMAIL = gql(`
    mutation SendMail($email: String!, $message: String!) {
  sendMail(email: $email, message: $message) {
    message
    status
  }
} 
    `);
