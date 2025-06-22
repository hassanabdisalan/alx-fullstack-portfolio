import { gql } from "@/__generated__";

export const USER_SIGNUP = gql(
  `mutation CreateUser($fname: String!, $sname: String!, $email: String!, $password: String!, $role: String!) {
  createUser(Fname: $fname, Sname: $sname, email: $email, password: $password, role: $role) {
    message
    status
  }
}
`,
);

export const USER_SIGNIN = gql(
  `
mutation UserLogin($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    message
    status
    tokenId
  }
}
`,
);

export const PASSWORD_RESET_REQUEST = gql(
  `mutation UserPasswordResetRequest($email: String!) {
    passwordResetRequest(email: $email) {
      message
      status
    }
  }
`,
);

export const PASSWORD_RESET_CONFIRM = gql(
  `mutation PasswordReset($newPassword: String!, $token: String!) {
  passwordReset(newPassword: $newPassword, token: $token) {
    message
    status
  }
}
`,
);

export const USER_LOGOUT = gql(
  `
mutation UserLogout {
  userLogout {
    message
    status
  }
}
  `,
);

export const USER_PROFILE_UPDATE = gql(
  `
mutation UpdateUserProfile($fname: String, $sname: String, $email: String, $image: Upload, $password: String, $phone: String) {
  updateUserProfile(Fname: $fname, Sname: $sname, email: $email, image: $image, password: $password, phone: $phone) {
    message
    status
    updatedUser {
      Fname
      Sname
      business {
        email
        id
        location
        name
        owner {
          Fname
          Sname
          id
          email
          image
        }
        phone
      }
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
  }
}
  
`);

export const DELETE_USER_ACCOUNT = gql(
  `
  mutation DeleteUser($deleteUserId: Int) {
  deleteUser(id: $deleteUserId) {
    message
    status
  }
}

  `,
);


// security related mutations

export const CHANGE_PASSWORD = gql(`
mutation UpdatePassword($newPassword: String!, $oldPassword: String!) {
  updatePassword(newPassword: $newPassword, oldPassword: $oldPassword) {
    message
    status
  }
}
  `);

export const UPDATE_API_KEYS = gql(`
  mutation UserGoogleSignIn($idToken: String!) {
    authwithGoogle(id_token: $idToken) {
      status
      message
    }
  }
`);

export const ENABLE_TWO_FACTOR = gql(`
mutation EnableTwoFA {
  enableTwoFA {
    message
    status
  }
}

  `);

export const DISABLE_TWO_FACTOR = gql(`
mutation DisabletwoFA {
  disabletwoFA {
    message
    status
  }
}

  `);

export const AUTH_TWO_FACTOR = gql(`
mutation AuthTwoFA($otp: String!, $tokenId: String!) {
  authTwoFA(otp: $otp, tokenId: $tokenId) {
    message
    status
  }
}
  `);


// social media related mutations

export const USER_GOOGLE_SIGNUP = gql(
  `
mutation AuthwithGoogle($idToken: String!) {
  authwithGoogle(id_token: $idToken) {
    message
    status
  }
}
  `,
);

export const USER_GOOGLE_SIGNIN = gql(`
  mutation UserGoogleSignIn($idToken: String!) {
    authwithGoogle(id_token: $idToken) {
      status
      message
    }
  }
`);

export const USER_FACEBOOK_SIGNUP = gql(`
    mutation AuthWithFacebook($accessToken: String!, $userID: String!) {
      authWithFacebook(accessToken: $accessToken, userID: $userID) {
        message
        status
      }
    }
  `);


export const AUTH_WITH_TWITTER = gql(`
  
`)
export const AUTH_WITH_LINKEDIN = gql(`
  mutation LinkedInAuth($code: String!, $redirectUri: String!) {
  linkedInAuth(code: $code, redirectUri: $redirectUri) {
    message
    status
  }
}
`);
export const AUTH_WITH_TIKTOK = gql(`
  mutation AuthTikTok($code: String!, $codeVerifier: String) {
  authTikTok(code: $code, codeVerifier: $codeVerifier) {
    message
    status
  }
}
`);

export const AUTH_WITH_INSTAGRAM = gql(`
  
`)
