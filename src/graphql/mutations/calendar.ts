import { gql } from "@/__generated__";

export const ADD_NEW_EVENT_MUTATION = gql(`
  mutation AddEvent($title: String!, $description: String!, $start: DateTime!, $end: DateTime! ) {
    addEvent(title: $title, description: $description, start: $start, end: $end) {
      status
      message
    }
  }
`);


export const UPDATE_EVENT_MUTATION = gql(`
mutation UpdateEvent($eventId: Int!, $description: String, $end: DateTime, $start: DateTime, $title: String) {
  updateEvent(eventId: $eventId, description: $description, end: $end, start: $start, title: $title) {
    message
    status
  }
}
`)


export const DELETE_EVENT_MUTATION = gql(`
  mutation DeleteEvent($eventId: Int!) {
  deleteEvent(eventId: $eventId) {
    message
    status
  }
}`);
