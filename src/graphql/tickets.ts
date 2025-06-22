import { gql } from "@/__generated__";


export const CREATE_TICKET = gql(`
  mutation CreateTicket($description: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String!, $platform: String!, $ticketType: String!) {
    createTicket(description: $description, email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, platform: $platform, ticketType: $ticketType) {
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
  
  

export const CLOSE_TICKET_MUTATION = gql(`
mutation CloseTicket($ticketId: Int!) {
  closeTicket(ticketId: $ticketId) {
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

    export const DELETE_TICKET = gql(`
    mutation DeleteTicket($ticketId: Int!) {
      deleteTicket(ticketId: $ticketId) {
        message
        status
      }
    }
    `);
    

export const GET_TICKET_STATUS_COUNT = gql(`
  query TicketStatusCount {
    ticketStatusCount {
      distribution {
        count
        ticketStatus
      }
      message
      status
    }
  }
  `);

export const GET_TOTAL_SUPPORT_TICKETS = gql(`
  query TicketsCount {
    ticketsCount {
      monthlyData {
        count
        monthYear
      }
      totalTickets
    }
  }
  `);

export const GET_TICKETS_RESPONSE_TIME = gql(`
  query TicketsResponseTime {
    ticketsResponseTime {
      data {
        hours
        month
      }
      message
      status
    }
  }
  `);

export const GET_TICKET_TYPE_DISTRIBUTION = gql(`
  query TicketTypeDistribution {
    ticketTypeDistribution {
      distribution {
        percentage
        ticketType
      }
      message
      status
    }
  }
  `);

export const GET_OPEN_TICKETS = gql(`
  query OpenTickets($limit: Int, $page: Int) {
    openTickets(limit: $limit, page: $page) {
      pageInfo {
        currentPage
        hasNextPage
        hasPrevPage
        totalCount
        totalPages
      }
      tickets {
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

export const GET_ALL_TICKETS = gql(`
  query Tickets($limit: Int, $page: Int) {
    tickets(limit: $limit, page: $page) {
      pageInfo {
        currentPage
        hasNextPage
        hasPrevPage
        totalCount
        totalPages
      }
      tickets {
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
