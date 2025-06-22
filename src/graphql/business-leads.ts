import { gql } from "@/__generated__";

export const ADD_LEAD_STAGE = gql(`
mutation AddLeadStage($name: String!, $position: Int!) {
  addLeadStage(name: $name, position: $position) {
    message
    status
  }
}
`);

export const UPDATE_LEAD_STAGE = gql(`
    mutation UpdateLeadStage($name: String!, $stageId: Int!) {
  updateLeadStage(name: $name, stageId: $stageId) {
    message
    status
  }
}`);

export const DELETE_LEAD_STAGE = gql(`
mutation DeleteLeadStage($stageId: Int!) {
  deleteLeadStage(stageId: $stageId) {
    message
    status
  }
}
`);

export const GET_LEADS_STAGE = gql(`
query BusinessLeadStages {
  businessLeadStages {
    businessId
    color
    id
    name
    position    
  }
}
`);

export const ADD_BUSINESS_LEAD = gql(`
mutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $stageId: Int!, $phone: String) {
  addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, stageId: $stageId, phone: $phone) {
    lead {
      Fname
      Sname
      createdAt
      email
      id
      phone
      revenue
      salesRep {
        Fname
        Sname
        businessId
        createdAt
        email
        id
        image
        lastLogin
        phone
        role
        status
      }
      source
      stageId
      status
    }
    message
    status
  }
}
`);

export const UPDATE_BUSINESS_LEAD = gql(`
    mutation UpdateLeadStage($name: String!, $stageId: Int!) {
  updateLeadStage(name: $name, stageId: $stageId) {
    message
    status
  }
}
`);


export const DELETE_BUSINESS_LEAD = gql(`
    mutation DeleteLead($leadId: Int) {
  deleteLead(leadId: $leadId) {
    message
    status
  }
}
`);


export const UPDATE_BUSINESS_LEAD_STAGE = gql(`
mutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stageId: Int) {
  updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stageId: $stageId) {
    lead {
      Fname
      Sname
      createdAt
      email
      id
      phone
      revenue
      source
      salesRep {
        Fname
        Sname
        email
        role
        phone
      }
      stageId
      status
    }
    message
    status
  }
}
`);


export const MOVE_LEAD_TO_STAGE = gql(`
mutation MoveLead($leadId: Int!, $stageId: Int!) {
  moveLead(leadId: $leadId, stageId: $stageId) {
    lead {
      Fname
      Sname
      createdAt
      email
      id
      isConverted
      phone
      revenue
      source
      stageId
      status
    }
    message
    status
  }
}
`);

export const GET_BUSINESS_LEADS_BY_STAGE = gql(`
query GetBusinessLeadsByStage($stageId: Int!, $after: String, $first: Int) {
  getBusinessLeadsByStage(stageId: $stageId, after: $after, first: $first) {
    leads {
      id
      email
      Fname
      Sname
      phone
      createdAt
      revenue
      stageId
      status
      source
      salesRep {
        email
        Fname
        Sname
        phone
        image
        status
        role

      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`);
