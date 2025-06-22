import { gql } from "@/__generated__";

export const CREATE_BUSINESS = gql(`
mutation CreateBusiness($email: String!, $location: String!, $name: String!, $phone: String!) {
  createBusiness(email: $email, location: $location, name: $name, phone: $phone) {
    business {
      id
      email
      location
      name
      phone
    }
    message
    status
  }
}

`);

export const INVITE_USER = gql(`
    mutation InviteUser($email: String!, $role: String!) {
      inviteUser(email: $email, role: $role) {
        status
        message
      }
    }
  `);

export const COMPLETE_INVITE = gql(`
  mutation CompleteInvite($fname: String!, $sname: String!, $password: String!, $phone: String!, $token: String!) {
    completeInvite(Fname: $fname, Sname: $sname, password: $password, phone: $phone, token: $token) {
      message
      status
    }
  }
  `);

export const VALIDATE_INVITE_TOKEN = gql(`
  mutation ValidateInvite($token: String!) {
    validateInvite(token: $token) {
      error
      role
      valid
    }
  }
  
  `);

// export const ADD_LEAD = gql(`
//   mutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $phone: String) {
//   addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, phone: $phone) {
//     message
//     status
//   }
//   }

//     `);

// export const UPDATE_LEAD = gql(`
// mutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stage: String) {
//   updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stage: $stage) {
//     message
//     status
//   }
// }
//   `);

// export const DELETE_LEAD = gql(`
//   mutation DeleteLead($leadId: Int) {
//   deleteLead(leadId: $leadId) {
//     message
//     status
//   }
// }
//   `);

export const BUSINESS_PROFILE_UPDATE = gql(`
mutation UpdateBusiness($email: String, $location: String, $name: String, $phone: String) {
  updateBusiness(email: $email, location: $location, name: $name, phone: $phone) {
    business {
      email
    }
    message
    status
  }
}
`);


export const ACTIVATE_EMPLOYEE = gql(`
  mutation ActivateEmployee($activateEmployeeId: Int!) {
activateEmployee(id: $activateEmployeeId) {
  message
  status
}
}
`);


export const DELETE_EMPLOYEE = gql(`
  mutation DeleteEmployee($deleteEmployeeId: Int!) {
    deleteEmployee(id: $deleteEmployeeId) {
      message
      status
    }
  }
  
    `);
  
  export const DEACTIVATE_EMPLOYEE = gql(`
  mutation DeactivateEmployee($deactivateEmployeeId: Int!) {
    deactivateEmployee(id: $deactivateEmployeeId) {
      message
      status
    }
  }
    `);
