/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nmutation AddLeadStage($name: String!, $position: Int!) {\n  addLeadStage(name: $name, position: $position) {\n    message\n    status\n  }\n}\n": typeof types.AddLeadStageDocument,
    "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}": typeof types.UpdateLeadStageDocument,
    "\nmutation DeleteLeadStage($stageId: Int!) {\n  deleteLeadStage(stageId: $stageId) {\n    message\n    status\n  }\n}\n": typeof types.DeleteLeadStageDocument,
    "\nquery BusinessLeadStages {\n  businessLeadStages {\n    businessId\n    color\n    id\n    name\n    position    \n  }\n}\n": typeof types.BusinessLeadStagesDocument,
    "\nmutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $stageId: Int!, $phone: String) {\n  addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, stageId: $stageId, phone: $phone) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        Sname\n        businessId\n        createdAt\n        email\n        id\n        image\n        lastLogin\n        phone\n        role\n        status\n      }\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": typeof types.AddLeadDocument,
    "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}\n": typeof types.UpdateLeadStageDocument,
    "\n    mutation DeleteLead($leadId: Int) {\n  deleteLead(leadId: $leadId) {\n    message\n    status\n  }\n}\n": typeof types.DeleteLeadDocument,
    "\nmutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stageId: Int) {\n  updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      source\n      salesRep {\n        Fname\n        Sname\n        email\n        role\n        phone\n      }\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": typeof types.UpdateLeadDocument,
    "\nmutation MoveLead($leadId: Int!, $stageId: Int!) {\n  moveLead(leadId: $leadId, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      isConverted\n      phone\n      revenue\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": typeof types.MoveLeadDocument,
    "\nquery GetBusinessLeadsByStage($stageId: Int!, $after: String, $first: Int) {\n  getBusinessLeadsByStage(stageId: $stageId, after: $after, first: $first) {\n    leads {\n      id\n      email\n      Fname\n      Sname\n      phone\n      createdAt\n      revenue\n      stageId\n      status\n      source\n      salesRep {\n        email\n        Fname\n        Sname\n        phone\n        image\n        status\n        role\n\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n": typeof types.GetBusinessLeadsByStageDocument,
    "query UserNotifications {\n    userNotifications {\n      createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n    }\n  }": typeof types.UserNotificationsDocument,
    "\n  subscription Notification {\n  notification {\n     createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n  }\n}": typeof types.NotificationDocument,
    "\n  \n    query Business($businessId: Int!) {\n    business(businessId: $businessId) {\n      email\n      id\n      location\n      name\n      owner {\n        email\n        Fname\n        Sname\n        image\n      }\n      phone\n      users {\n        email\n        Fname\n        Sname\n        image\n      }\n    }\n  }\n    \n    ": typeof types.BusinessDocument,
    "\nmutation CreateBusiness($email: String!, $location: String!, $name: String!, $phone: String!) {\n  createBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      id\n      email\n      location\n      name\n      phone\n    }\n    message\n    status\n  }\n}\n\n": typeof types.CreateBusinessDocument,
    "\n    mutation InviteUser($email: String!, $role: String!) {\n      inviteUser(email: $email, role: $role) {\n        status\n        message\n      }\n    }\n  ": typeof types.InviteUserDocument,
    "\n  mutation CompleteInvite($fname: String!, $sname: String!, $password: String!, $phone: String!, $token: String!) {\n    completeInvite(Fname: $fname, Sname: $sname, password: $password, phone: $phone, token: $token) {\n      message\n      status\n    }\n  }\n  ": typeof types.CompleteInviteDocument,
    "\n  mutation ValidateInvite($token: String!) {\n    validateInvite(token: $token) {\n      error\n      role\n      valid\n    }\n  }\n  \n  ": typeof types.ValidateInviteDocument,
    "\nmutation UpdateBusiness($email: String, $location: String, $name: String, $phone: String) {\n  updateBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      email\n    }\n    message\n    status\n  }\n}\n": typeof types.UpdateBusinessDocument,
    "\n  mutation ActivateEmployee($activateEmployeeId: Int!) {\nactivateEmployee(id: $activateEmployeeId) {\n  message\n  status\n}\n}\n": typeof types.ActivateEmployeeDocument,
    "\n  mutation DeleteEmployee($deleteEmployeeId: Int!) {\n    deleteEmployee(id: $deleteEmployeeId) {\n      message\n      status\n    }\n  }\n  \n    ": typeof types.DeleteEmployeeDocument,
    "\n  mutation DeactivateEmployee($deactivateEmployeeId: Int!) {\n    deactivateEmployee(id: $deactivateEmployeeId) {\n      message\n      status\n    }\n  }\n    ": typeof types.DeactivateEmployeeDocument,
    "mutation CreateUser($fname: String!, $sname: String!, $email: String!, $password: String!, $role: String!) {\n  createUser(Fname: $fname, Sname: $sname, email: $email, password: $password, role: $role) {\n    message\n    status\n  }\n}\n": typeof types.CreateUserDocument,
    "\nmutation UserLogin($email: String!, $password: String!) {\n  userLogin(email: $email, password: $password) {\n    message\n    status\n    tokenId\n  }\n}\n": typeof types.UserLoginDocument,
    "mutation UserPasswordResetRequest($email: String!) {\n    passwordResetRequest(email: $email) {\n      message\n      status\n    }\n  }\n": typeof types.UserPasswordResetRequestDocument,
    "mutation PasswordReset($newPassword: String!, $token: String!) {\n  passwordReset(newPassword: $newPassword, token: $token) {\n    message\n    status\n  }\n}\n": typeof types.PasswordResetDocument,
    "\nmutation UserLogout {\n  userLogout {\n    message\n    status\n  }\n}\n  ": typeof types.UserLogoutDocument,
    "\nmutation UpdateUserProfile($fname: String, $sname: String, $email: String, $image: Upload, $password: String, $phone: String) {\n  updateUserProfile(Fname: $fname, Sname: $sname, email: $email, image: $image, password: $password, phone: $phone) {\n    message\n    status\n    updatedUser {\n      Fname\n      Sname\n      business {\n        email\n        id\n        location\n        name\n        owner {\n          Fname\n          Sname\n          id\n          email\n          image\n        }\n        phone\n      }\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n  }\n}\n  \n": typeof types.UpdateUserProfileDocument,
    "\n  mutation DeleteUser($deleteUserId: Int) {\n  deleteUser(id: $deleteUserId) {\n    message\n    status\n  }\n}\n\n  ": typeof types.DeleteUserDocument,
    "\nmutation UpdatePassword($newPassword: String!, $oldPassword: String!) {\n  updatePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    message\n    status\n  }\n}\n  ": typeof types.UpdatePasswordDocument,
    "\n  mutation UserGoogleSignIn($idToken: String!) {\n    authwithGoogle(id_token: $idToken) {\n      status\n      message\n    }\n  }\n": typeof types.UserGoogleSignInDocument,
    "\nmutation EnableTwoFA {\n  enableTwoFA {\n    message\n    status\n  }\n}\n\n  ": typeof types.EnableTwoFaDocument,
    "\nmutation DisabletwoFA {\n  disabletwoFA {\n    message\n    status\n  }\n}\n\n  ": typeof types.DisabletwoFaDocument,
    "\nmutation AuthTwoFA($otp: String!, $tokenId: String!) {\n  authTwoFA(otp: $otp, tokenId: $tokenId) {\n    message\n    status\n  }\n}\n  ": typeof types.AuthTwoFaDocument,
    "\nmutation AuthwithGoogle($idToken: String!) {\n  authwithGoogle(id_token: $idToken) {\n    message\n    status\n  }\n}\n  ": typeof types.AuthwithGoogleDocument,
    "\n    mutation AuthWithFacebook($accessToken: String!, $userID: String!) {\n      authWithFacebook(accessToken: $accessToken, userID: $userID) {\n        message\n        status\n      }\n    }\n  ": typeof types.AuthWithFacebookDocument,
    "\n  mutation LinkedInAuth($code: String!, $redirectUri: String!) {\n  linkedInAuth(code: $code, redirectUri: $redirectUri) {\n    message\n    status\n  }\n}\n": typeof types.LinkedInAuthDocument,
    "\n  mutation AuthTikTok($code: String!, $codeVerifier: String) {\n  authTikTok(code: $code, codeVerifier: $codeVerifier) {\n    message\n    status\n  }\n}\n": typeof types.AuthTikTokDocument,
    "\n  mutation AddEvent($title: String!, $description: String!, $start: DateTime!, $end: DateTime! ) {\n    addEvent(title: $title, description: $description, start: $start, end: $end) {\n      status\n      message\n    }\n  }\n": typeof types.AddEventDocument,
    "\nmutation UpdateEvent($eventId: Int!, $description: String, $end: DateTime, $start: DateTime, $title: String) {\n  updateEvent(eventId: $eventId, description: $description, end: $end, start: $start, title: $title) {\n    message\n    status\n  }\n}\n": typeof types.UpdateEventDocument,
    "\n  mutation DeleteEvent($eventId: Int!) {\n  deleteEvent(eventId: $eventId) {\n    message\n    status\n  }\n}": typeof types.DeleteEventDocument,
    "\nmutation CreateCampaign($description: String!, $end: DateTime!, $start: DateTime!, $title: String!) {\n  createCampaign(description: $description, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    message\n    status\n  }\n}\n": typeof types.CreateCampaignDocument,
    "\n  mutation DeleteCampaign($deleteCampaignId: Int!) {\n    deleteCampaign(id: $deleteCampaignId) {\n      message\n      status\n    }\n  }\n": typeof types.DeleteCampaignDocument,
    "\nmutation CreateSocialPost($campaignId: Int!, $channels: [String!]!, $content: String!, $title: String!, $media: [Upload!]) {\n  createSocialPost(campaignId: $campaignId, channels: $channels, content: $content, title: $title, media: $media) {\n    message\n    status\n  }\n}\n\n": typeof types.CreateSocialPostDocument,
    "\nmutation UpdateCampaign($updateCampaignId: Int!, $channel: [String!], $end: DateTime, $start: DateTime, $title: String) {\n  updateCampaign(id: $updateCampaignId, channel: $channel, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n  }\n}\n\n  ": typeof types.UpdateCampaignDocument,
    "\n    mutation SendMail($email: String!, $message: String!) {\n  sendMail(email: $email, message: $message) {\n    message\n    status\n  }\n} \n    ": typeof types.SendMailDocument,
    "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n  ": typeof types.LeadConversionRatesDocument,
    "\nquery CustomerStats {\n  customerStats {\n    customersByMonth {\n      count\n      month\n    }\n    message\n    totalCustomers\n  }\n}\n": typeof types.CustomerStatsDocument,
    "\n  query SalesRevenueStats {\n  salesRevenueStats {\n    revenueByMonth {\n      month\n      total\n    }\n    totalRevenue\n  }\n}\n": typeof types.SalesRevenueStatsDocument,
    "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n": typeof types.LeadConversionRatesDocument,
    " \n  query RevenueForecast {\n  revenueForecast {\n    month\n    productCost\n    salesRevenue\n  }\n}\n": typeof types.RevenueForecastDocument,
    "\nquery Employees($limit: Int, $page: Int) {\n  employees(limit: $limit, page: $page) {\n    employees {\n      Fname\n      Sname\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n": typeof types.EmployeesDocument,
    "\nquery EmployeeCount {\n  employeeCount {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalEmployees\n  }\n}\n  \n  ": typeof types.EmployeeCountDocument,
    "\n\nquery WorkLog {\n  workLog {\n    monthlyData {\n      month\n      totalWorkingHours\n    }\n    totalWorkingHours\n  }\n}\n\n\n  ": typeof types.WorkLogDocument,
    "\n  query MonthlyLeadTrends {\n  monthlyLeadTrends {\n    data {\n      count\n      month\n    }\n    totalLeads\n  }\n}\n  ": typeof types.MonthlyLeadTrendsDocument,
    "\nquery RecentLeads {\n  recentLeads {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    phone\n    revenue\n    salesRep {\n      email\n      Fname\n      Sname\n      image\n    }\n    source\n    stageId\n    status\n  }\n}\n  ": typeof types.RecentLeadsDocument,
    "\nquery Campaigns($limit: Int, $page: Int) {\n  campaigns(limit: $limit, page: $page) {\n    campaigns {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n  ": typeof types.CampaignsDocument,
    "\nquery Campaign($campaignId: Int!) {\n  campaign(id: $campaignId) {\n    businessId\n    channels\n    createdAt\n    description\n    end\n    id\n    start\n    title\n  }\n}\n": typeof types.CampaignDocument,
    "\nquery UserLeads($after: String, $first: Int) {\n  userLeads(after: $after, first: $first) {\n    leads {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        email\n      }\n      source\n\n      status\n    }\n    pageInfo {\n      endCursor\n      endCursor\n    }\n  }\n}\n\n  ": typeof types.UserLeadsDocument,
    "\nquery CampaignCounts {\n  campaignCounts {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalCampaigns\n  }\n}\n": typeof types.CampaignCountsDocument,
    "\n  query CustomerFeedback {\n  customerFeedback {\n    data {\n      count\n      name\n    }\n    message\n    totalFeedback\n  }\n}\n\n": typeof types.CustomerFeedbackDocument,
    "\nquery CustomerSatisfaction {\n  customerSatisfaction {\n    distribution {\n      count\n      monthYear\n    }\n    message\n    status\n    total\n  }\n}\n": typeof types.CustomerSatisfactionDocument,
    "\n  query LeadSourcesStats {\n  leadSourcesStats {\n    data {\n      count\n      name\n    }\n    message\n    totalLeads\n  }\n}\n\n  ": typeof types.LeadSourcesStatsDocument,
    "\n query SentimentAnalysis {\n  sentimentAnalysis {\n    message\n    negative\n    neutral\n    positive\n    total\n  }\n}\n\n": typeof types.SentimentAnalysisDocument,
    "\nquery LeadSummary {\n  leadSummary {\n    awaiting\n    completed\n    message\n    monthlyIncrease\n    ongoing\n    total\n  }\n}\n\n  ": typeof types.LeadSummaryDocument,
    "\n  query AccountConnection {\n  accountConnection {\n    data {\n      expiresIn\n      platform\n      status\n    }\n  }\n}\n": typeof types.AccountConnectionDocument,
    "\n  query GetUserEvents {\n    getUserEvents {id, title, description, start, end, user { id, Fname, email } }\n  }\n": typeof types.GetUserEventsDocument,
    "\nquery CallCustomer($ticketId: Int!) {\n  callCustomer(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n": typeof types.CallCustomerDocument,
    "\n    query SubscriberStats {\n  subscriberStats {\n    data {\n      month\n      count\n    }\n  }\n}\n    ": typeof types.SubscriberStatsDocument,
    "query User {\n  user {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    image\n    phone\n    role\n    business {\n      email\n      id\n      name\n      phone\n      location\n    }\n  }\n}\n  ": typeof types.UserDocument,
    "\n  mutation MarkNotificationAsRead($notificationIds: [ID!]!) {\n    markNotificationAsRead(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  ": typeof types.MarkNotificationAsReadDocument,
    "\n  mutation DeleteNotification($notificationIds: [ID!]!) {\n    deleteNotification(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  ": typeof types.DeleteNotificationDocument,
    "\n  query SocialMonthlyAnalytics {\n  socialMonthlyAnalytics {\n    analytics {\n      data {\n        monthYear\n        totalLikes\n      }\n      platform\n    }\n  }\n}\n\n": typeof types.SocialMonthlyAnalyticsDocument,
    "\nquery SocialMediaPerformance {\n  SocialMediaPerformance {\n    analytics {\n      platform\n      data {\n        likes\n        comments\n        reposts\n        retweets\n        views\n      }\n    }\n  }\n}\n": typeof types.SocialMediaPerformanceDocument,
    "\n  mutation CreateTicket($description: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String!, $platform: String!, $ticketType: String!) {\n    createTicket(description: $description, email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, platform: $platform, ticketType: $ticketType) {\n      message\n      status\n      ticket {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": typeof types.CreateTicketDocument,
    "\nmutation CloseTicket($ticketId: Int!) {\n  closeTicket(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n    ": typeof types.CloseTicketDocument,
    "\n    mutation DeleteTicket($ticketId: Int!) {\n      deleteTicket(ticketId: $ticketId) {\n        message\n        status\n      }\n    }\n    ": typeof types.DeleteTicketDocument,
    "\n  query TicketStatusCount {\n    ticketStatusCount {\n      distribution {\n        count\n        ticketStatus\n      }\n      message\n      status\n    }\n  }\n  ": typeof types.TicketStatusCountDocument,
    "\n  query TicketsCount {\n    ticketsCount {\n      monthlyData {\n        count\n        monthYear\n      }\n      totalTickets\n    }\n  }\n  ": typeof types.TicketsCountDocument,
    "\n  query TicketsResponseTime {\n    ticketsResponseTime {\n      data {\n        hours\n        month\n      }\n      message\n      status\n    }\n  }\n  ": typeof types.TicketsResponseTimeDocument,
    "\n  query TicketTypeDistribution {\n    ticketTypeDistribution {\n      distribution {\n        percentage\n        ticketType\n      }\n      message\n      status\n    }\n  }\n  ": typeof types.TicketTypeDistributionDocument,
    "\n  query OpenTickets($limit: Int, $page: Int) {\n    openTickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": typeof types.OpenTicketsDocument,
    "\n  query Tickets($limit: Int, $page: Int) {\n    tickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": typeof types.TicketsDocument,
};
const documents: Documents = {
    "\nmutation AddLeadStage($name: String!, $position: Int!) {\n  addLeadStage(name: $name, position: $position) {\n    message\n    status\n  }\n}\n": types.AddLeadStageDocument,
    "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}": types.UpdateLeadStageDocument,
    "\nmutation DeleteLeadStage($stageId: Int!) {\n  deleteLeadStage(stageId: $stageId) {\n    message\n    status\n  }\n}\n": types.DeleteLeadStageDocument,
    "\nquery BusinessLeadStages {\n  businessLeadStages {\n    businessId\n    color\n    id\n    name\n    position    \n  }\n}\n": types.BusinessLeadStagesDocument,
    "\nmutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $stageId: Int!, $phone: String) {\n  addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, stageId: $stageId, phone: $phone) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        Sname\n        businessId\n        createdAt\n        email\n        id\n        image\n        lastLogin\n        phone\n        role\n        status\n      }\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": types.AddLeadDocument,
    "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}\n": types.UpdateLeadStageDocument,
    "\n    mutation DeleteLead($leadId: Int) {\n  deleteLead(leadId: $leadId) {\n    message\n    status\n  }\n}\n": types.DeleteLeadDocument,
    "\nmutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stageId: Int) {\n  updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      source\n      salesRep {\n        Fname\n        Sname\n        email\n        role\n        phone\n      }\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": types.UpdateLeadDocument,
    "\nmutation MoveLead($leadId: Int!, $stageId: Int!) {\n  moveLead(leadId: $leadId, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      isConverted\n      phone\n      revenue\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n": types.MoveLeadDocument,
    "\nquery GetBusinessLeadsByStage($stageId: Int!, $after: String, $first: Int) {\n  getBusinessLeadsByStage(stageId: $stageId, after: $after, first: $first) {\n    leads {\n      id\n      email\n      Fname\n      Sname\n      phone\n      createdAt\n      revenue\n      stageId\n      status\n      source\n      salesRep {\n        email\n        Fname\n        Sname\n        phone\n        image\n        status\n        role\n\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n": types.GetBusinessLeadsByStageDocument,
    "query UserNotifications {\n    userNotifications {\n      createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n    }\n  }": types.UserNotificationsDocument,
    "\n  subscription Notification {\n  notification {\n     createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n  }\n}": types.NotificationDocument,
    "\n  \n    query Business($businessId: Int!) {\n    business(businessId: $businessId) {\n      email\n      id\n      location\n      name\n      owner {\n        email\n        Fname\n        Sname\n        image\n      }\n      phone\n      users {\n        email\n        Fname\n        Sname\n        image\n      }\n    }\n  }\n    \n    ": types.BusinessDocument,
    "\nmutation CreateBusiness($email: String!, $location: String!, $name: String!, $phone: String!) {\n  createBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      id\n      email\n      location\n      name\n      phone\n    }\n    message\n    status\n  }\n}\n\n": types.CreateBusinessDocument,
    "\n    mutation InviteUser($email: String!, $role: String!) {\n      inviteUser(email: $email, role: $role) {\n        status\n        message\n      }\n    }\n  ": types.InviteUserDocument,
    "\n  mutation CompleteInvite($fname: String!, $sname: String!, $password: String!, $phone: String!, $token: String!) {\n    completeInvite(Fname: $fname, Sname: $sname, password: $password, phone: $phone, token: $token) {\n      message\n      status\n    }\n  }\n  ": types.CompleteInviteDocument,
    "\n  mutation ValidateInvite($token: String!) {\n    validateInvite(token: $token) {\n      error\n      role\n      valid\n    }\n  }\n  \n  ": types.ValidateInviteDocument,
    "\nmutation UpdateBusiness($email: String, $location: String, $name: String, $phone: String) {\n  updateBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      email\n    }\n    message\n    status\n  }\n}\n": types.UpdateBusinessDocument,
    "\n  mutation ActivateEmployee($activateEmployeeId: Int!) {\nactivateEmployee(id: $activateEmployeeId) {\n  message\n  status\n}\n}\n": types.ActivateEmployeeDocument,
    "\n  mutation DeleteEmployee($deleteEmployeeId: Int!) {\n    deleteEmployee(id: $deleteEmployeeId) {\n      message\n      status\n    }\n  }\n  \n    ": types.DeleteEmployeeDocument,
    "\n  mutation DeactivateEmployee($deactivateEmployeeId: Int!) {\n    deactivateEmployee(id: $deactivateEmployeeId) {\n      message\n      status\n    }\n  }\n    ": types.DeactivateEmployeeDocument,
    "mutation CreateUser($fname: String!, $sname: String!, $email: String!, $password: String!, $role: String!) {\n  createUser(Fname: $fname, Sname: $sname, email: $email, password: $password, role: $role) {\n    message\n    status\n  }\n}\n": types.CreateUserDocument,
    "\nmutation UserLogin($email: String!, $password: String!) {\n  userLogin(email: $email, password: $password) {\n    message\n    status\n    tokenId\n  }\n}\n": types.UserLoginDocument,
    "mutation UserPasswordResetRequest($email: String!) {\n    passwordResetRequest(email: $email) {\n      message\n      status\n    }\n  }\n": types.UserPasswordResetRequestDocument,
    "mutation PasswordReset($newPassword: String!, $token: String!) {\n  passwordReset(newPassword: $newPassword, token: $token) {\n    message\n    status\n  }\n}\n": types.PasswordResetDocument,
    "\nmutation UserLogout {\n  userLogout {\n    message\n    status\n  }\n}\n  ": types.UserLogoutDocument,
    "\nmutation UpdateUserProfile($fname: String, $sname: String, $email: String, $image: Upload, $password: String, $phone: String) {\n  updateUserProfile(Fname: $fname, Sname: $sname, email: $email, image: $image, password: $password, phone: $phone) {\n    message\n    status\n    updatedUser {\n      Fname\n      Sname\n      business {\n        email\n        id\n        location\n        name\n        owner {\n          Fname\n          Sname\n          id\n          email\n          image\n        }\n        phone\n      }\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n  }\n}\n  \n": types.UpdateUserProfileDocument,
    "\n  mutation DeleteUser($deleteUserId: Int) {\n  deleteUser(id: $deleteUserId) {\n    message\n    status\n  }\n}\n\n  ": types.DeleteUserDocument,
    "\nmutation UpdatePassword($newPassword: String!, $oldPassword: String!) {\n  updatePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    message\n    status\n  }\n}\n  ": types.UpdatePasswordDocument,
    "\n  mutation UserGoogleSignIn($idToken: String!) {\n    authwithGoogle(id_token: $idToken) {\n      status\n      message\n    }\n  }\n": types.UserGoogleSignInDocument,
    "\nmutation EnableTwoFA {\n  enableTwoFA {\n    message\n    status\n  }\n}\n\n  ": types.EnableTwoFaDocument,
    "\nmutation DisabletwoFA {\n  disabletwoFA {\n    message\n    status\n  }\n}\n\n  ": types.DisabletwoFaDocument,
    "\nmutation AuthTwoFA($otp: String!, $tokenId: String!) {\n  authTwoFA(otp: $otp, tokenId: $tokenId) {\n    message\n    status\n  }\n}\n  ": types.AuthTwoFaDocument,
    "\nmutation AuthwithGoogle($idToken: String!) {\n  authwithGoogle(id_token: $idToken) {\n    message\n    status\n  }\n}\n  ": types.AuthwithGoogleDocument,
    "\n    mutation AuthWithFacebook($accessToken: String!, $userID: String!) {\n      authWithFacebook(accessToken: $accessToken, userID: $userID) {\n        message\n        status\n      }\n    }\n  ": types.AuthWithFacebookDocument,
    "\n  mutation LinkedInAuth($code: String!, $redirectUri: String!) {\n  linkedInAuth(code: $code, redirectUri: $redirectUri) {\n    message\n    status\n  }\n}\n": types.LinkedInAuthDocument,
    "\n  mutation AuthTikTok($code: String!, $codeVerifier: String) {\n  authTikTok(code: $code, codeVerifier: $codeVerifier) {\n    message\n    status\n  }\n}\n": types.AuthTikTokDocument,
    "\n  mutation AddEvent($title: String!, $description: String!, $start: DateTime!, $end: DateTime! ) {\n    addEvent(title: $title, description: $description, start: $start, end: $end) {\n      status\n      message\n    }\n  }\n": types.AddEventDocument,
    "\nmutation UpdateEvent($eventId: Int!, $description: String, $end: DateTime, $start: DateTime, $title: String) {\n  updateEvent(eventId: $eventId, description: $description, end: $end, start: $start, title: $title) {\n    message\n    status\n  }\n}\n": types.UpdateEventDocument,
    "\n  mutation DeleteEvent($eventId: Int!) {\n  deleteEvent(eventId: $eventId) {\n    message\n    status\n  }\n}": types.DeleteEventDocument,
    "\nmutation CreateCampaign($description: String!, $end: DateTime!, $start: DateTime!, $title: String!) {\n  createCampaign(description: $description, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    message\n    status\n  }\n}\n": types.CreateCampaignDocument,
    "\n  mutation DeleteCampaign($deleteCampaignId: Int!) {\n    deleteCampaign(id: $deleteCampaignId) {\n      message\n      status\n    }\n  }\n": types.DeleteCampaignDocument,
    "\nmutation CreateSocialPost($campaignId: Int!, $channels: [String!]!, $content: String!, $title: String!, $media: [Upload!]) {\n  createSocialPost(campaignId: $campaignId, channels: $channels, content: $content, title: $title, media: $media) {\n    message\n    status\n  }\n}\n\n": types.CreateSocialPostDocument,
    "\nmutation UpdateCampaign($updateCampaignId: Int!, $channel: [String!], $end: DateTime, $start: DateTime, $title: String) {\n  updateCampaign(id: $updateCampaignId, channel: $channel, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n  }\n}\n\n  ": types.UpdateCampaignDocument,
    "\n    mutation SendMail($email: String!, $message: String!) {\n  sendMail(email: $email, message: $message) {\n    message\n    status\n  }\n} \n    ": types.SendMailDocument,
    "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n  ": types.LeadConversionRatesDocument,
    "\nquery CustomerStats {\n  customerStats {\n    customersByMonth {\n      count\n      month\n    }\n    message\n    totalCustomers\n  }\n}\n": types.CustomerStatsDocument,
    "\n  query SalesRevenueStats {\n  salesRevenueStats {\n    revenueByMonth {\n      month\n      total\n    }\n    totalRevenue\n  }\n}\n": types.SalesRevenueStatsDocument,
    "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n": types.LeadConversionRatesDocument,
    " \n  query RevenueForecast {\n  revenueForecast {\n    month\n    productCost\n    salesRevenue\n  }\n}\n": types.RevenueForecastDocument,
    "\nquery Employees($limit: Int, $page: Int) {\n  employees(limit: $limit, page: $page) {\n    employees {\n      Fname\n      Sname\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n": types.EmployeesDocument,
    "\nquery EmployeeCount {\n  employeeCount {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalEmployees\n  }\n}\n  \n  ": types.EmployeeCountDocument,
    "\n\nquery WorkLog {\n  workLog {\n    monthlyData {\n      month\n      totalWorkingHours\n    }\n    totalWorkingHours\n  }\n}\n\n\n  ": types.WorkLogDocument,
    "\n  query MonthlyLeadTrends {\n  monthlyLeadTrends {\n    data {\n      count\n      month\n    }\n    totalLeads\n  }\n}\n  ": types.MonthlyLeadTrendsDocument,
    "\nquery RecentLeads {\n  recentLeads {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    phone\n    revenue\n    salesRep {\n      email\n      Fname\n      Sname\n      image\n    }\n    source\n    stageId\n    status\n  }\n}\n  ": types.RecentLeadsDocument,
    "\nquery Campaigns($limit: Int, $page: Int) {\n  campaigns(limit: $limit, page: $page) {\n    campaigns {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n  ": types.CampaignsDocument,
    "\nquery Campaign($campaignId: Int!) {\n  campaign(id: $campaignId) {\n    businessId\n    channels\n    createdAt\n    description\n    end\n    id\n    start\n    title\n  }\n}\n": types.CampaignDocument,
    "\nquery UserLeads($after: String, $first: Int) {\n  userLeads(after: $after, first: $first) {\n    leads {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        email\n      }\n      source\n\n      status\n    }\n    pageInfo {\n      endCursor\n      endCursor\n    }\n  }\n}\n\n  ": types.UserLeadsDocument,
    "\nquery CampaignCounts {\n  campaignCounts {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalCampaigns\n  }\n}\n": types.CampaignCountsDocument,
    "\n  query CustomerFeedback {\n  customerFeedback {\n    data {\n      count\n      name\n    }\n    message\n    totalFeedback\n  }\n}\n\n": types.CustomerFeedbackDocument,
    "\nquery CustomerSatisfaction {\n  customerSatisfaction {\n    distribution {\n      count\n      monthYear\n    }\n    message\n    status\n    total\n  }\n}\n": types.CustomerSatisfactionDocument,
    "\n  query LeadSourcesStats {\n  leadSourcesStats {\n    data {\n      count\n      name\n    }\n    message\n    totalLeads\n  }\n}\n\n  ": types.LeadSourcesStatsDocument,
    "\n query SentimentAnalysis {\n  sentimentAnalysis {\n    message\n    negative\n    neutral\n    positive\n    total\n  }\n}\n\n": types.SentimentAnalysisDocument,
    "\nquery LeadSummary {\n  leadSummary {\n    awaiting\n    completed\n    message\n    monthlyIncrease\n    ongoing\n    total\n  }\n}\n\n  ": types.LeadSummaryDocument,
    "\n  query AccountConnection {\n  accountConnection {\n    data {\n      expiresIn\n      platform\n      status\n    }\n  }\n}\n": types.AccountConnectionDocument,
    "\n  query GetUserEvents {\n    getUserEvents {id, title, description, start, end, user { id, Fname, email } }\n  }\n": types.GetUserEventsDocument,
    "\nquery CallCustomer($ticketId: Int!) {\n  callCustomer(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n": types.CallCustomerDocument,
    "\n    query SubscriberStats {\n  subscriberStats {\n    data {\n      month\n      count\n    }\n  }\n}\n    ": types.SubscriberStatsDocument,
    "query User {\n  user {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    image\n    phone\n    role\n    business {\n      email\n      id\n      name\n      phone\n      location\n    }\n  }\n}\n  ": types.UserDocument,
    "\n  mutation MarkNotificationAsRead($notificationIds: [ID!]!) {\n    markNotificationAsRead(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  ": types.MarkNotificationAsReadDocument,
    "\n  mutation DeleteNotification($notificationIds: [ID!]!) {\n    deleteNotification(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  ": types.DeleteNotificationDocument,
    "\n  query SocialMonthlyAnalytics {\n  socialMonthlyAnalytics {\n    analytics {\n      data {\n        monthYear\n        totalLikes\n      }\n      platform\n    }\n  }\n}\n\n": types.SocialMonthlyAnalyticsDocument,
    "\nquery SocialMediaPerformance {\n  SocialMediaPerformance {\n    analytics {\n      platform\n      data {\n        likes\n        comments\n        reposts\n        retweets\n        views\n      }\n    }\n  }\n}\n": types.SocialMediaPerformanceDocument,
    "\n  mutation CreateTicket($description: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String!, $platform: String!, $ticketType: String!) {\n    createTicket(description: $description, email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, platform: $platform, ticketType: $ticketType) {\n      message\n      status\n      ticket {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": types.CreateTicketDocument,
    "\nmutation CloseTicket($ticketId: Int!) {\n  closeTicket(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n    ": types.CloseTicketDocument,
    "\n    mutation DeleteTicket($ticketId: Int!) {\n      deleteTicket(ticketId: $ticketId) {\n        message\n        status\n      }\n    }\n    ": types.DeleteTicketDocument,
    "\n  query TicketStatusCount {\n    ticketStatusCount {\n      distribution {\n        count\n        ticketStatus\n      }\n      message\n      status\n    }\n  }\n  ": types.TicketStatusCountDocument,
    "\n  query TicketsCount {\n    ticketsCount {\n      monthlyData {\n        count\n        monthYear\n      }\n      totalTickets\n    }\n  }\n  ": types.TicketsCountDocument,
    "\n  query TicketsResponseTime {\n    ticketsResponseTime {\n      data {\n        hours\n        month\n      }\n      message\n      status\n    }\n  }\n  ": types.TicketsResponseTimeDocument,
    "\n  query TicketTypeDistribution {\n    ticketTypeDistribution {\n      distribution {\n        percentage\n        ticketType\n      }\n      message\n      status\n    }\n  }\n  ": types.TicketTypeDistributionDocument,
    "\n  query OpenTickets($limit: Int, $page: Int) {\n    openTickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": types.OpenTicketsDocument,
    "\n  query Tickets($limit: Int, $page: Int) {\n    tickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  ": types.TicketsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddLeadStage($name: String!, $position: Int!) {\n  addLeadStage(name: $name, position: $position) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation AddLeadStage($name: String!, $position: Int!) {\n  addLeadStage(name: $name, position: $position) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}"): (typeof documents)["\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteLeadStage($stageId: Int!) {\n  deleteLeadStage(stageId: $stageId) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation DeleteLeadStage($stageId: Int!) {\n  deleteLeadStage(stageId: $stageId) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery BusinessLeadStages {\n  businessLeadStages {\n    businessId\n    color\n    id\n    name\n    position    \n  }\n}\n"): (typeof documents)["\nquery BusinessLeadStages {\n  businessLeadStages {\n    businessId\n    color\n    id\n    name\n    position    \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $stageId: Int!, $phone: String) {\n  addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, stageId: $stageId, phone: $phone) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        Sname\n        businessId\n        createdAt\n        email\n        id\n        image\n        lastLogin\n        phone\n        role\n        status\n      }\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation AddLead($fname: String!, $sname: String!, $email: String!, $priority: String!, $revenue: Float!, $source: String!, $stageId: Int!, $phone: String) {\n  addLead(Fname: $fname, Sname: $sname, email: $email, priority: $priority, revenue: $revenue, source: $source, stageId: $stageId, phone: $phone) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        Sname\n        businessId\n        createdAt\n        email\n        id\n        image\n        lastLogin\n        phone\n        role\n        status\n      }\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\n    mutation UpdateLeadStage($name: String!, $stageId: Int!) {\n  updateLeadStage(name: $name, stageId: $stageId) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteLead($leadId: Int) {\n  deleteLead(leadId: $leadId) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\n    mutation DeleteLead($leadId: Int) {\n  deleteLead(leadId: $leadId) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stageId: Int) {\n  updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      source\n      salesRep {\n        Fname\n        Sname\n        email\n        role\n        phone\n      }\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation UpdateLead($leadId: Int!, $fname: String, $sname: String, $email: String, $phone: String, $revenue: Float, $source: String, $stageId: Int) {\n  updateLead(leadId: $leadId, Fname: $fname, Sname: $sname, email: $email, phone: $phone, revenue: $revenue, source: $source, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      source\n      salesRep {\n        Fname\n        Sname\n        email\n        role\n        phone\n      }\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation MoveLead($leadId: Int!, $stageId: Int!) {\n  moveLead(leadId: $leadId, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      isConverted\n      phone\n      revenue\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation MoveLead($leadId: Int!, $stageId: Int!) {\n  moveLead(leadId: $leadId, stageId: $stageId) {\n    lead {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      isConverted\n      phone\n      revenue\n      source\n      stageId\n      status\n    }\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetBusinessLeadsByStage($stageId: Int!, $after: String, $first: Int) {\n  getBusinessLeadsByStage(stageId: $stageId, after: $after, first: $first) {\n    leads {\n      id\n      email\n      Fname\n      Sname\n      phone\n      createdAt\n      revenue\n      stageId\n      status\n      source\n      salesRep {\n        email\n        Fname\n        Sname\n        phone\n        image\n        status\n        role\n\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"): (typeof documents)["\nquery GetBusinessLeadsByStage($stageId: Int!, $after: String, $first: Int) {\n  getBusinessLeadsByStage(stageId: $stageId, after: $after, first: $first) {\n    leads {\n      id\n      email\n      Fname\n      Sname\n      phone\n      createdAt\n      revenue\n      stageId\n      status\n      source\n      salesRep {\n        email\n        Fname\n        Sname\n        phone\n        image\n        status\n        role\n\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query UserNotifications {\n    userNotifications {\n      createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n    }\n  }"): (typeof documents)["query UserNotifications {\n    userNotifications {\n      createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Notification {\n  notification {\n     createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n  }\n}"): (typeof documents)["\n  subscription Notification {\n  notification {\n     createdAt\n      id\n      message\n      readStatus\n      title\n      type\n      user {\n        email\n        id\n        role\n        Fname\n        Sname\n      }\n      userId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n    query Business($businessId: Int!) {\n    business(businessId: $businessId) {\n      email\n      id\n      location\n      name\n      owner {\n        email\n        Fname\n        Sname\n        image\n      }\n      phone\n      users {\n        email\n        Fname\n        Sname\n        image\n      }\n    }\n  }\n    \n    "): (typeof documents)["\n  \n    query Business($businessId: Int!) {\n    business(businessId: $businessId) {\n      email\n      id\n      location\n      name\n      owner {\n        email\n        Fname\n        Sname\n        image\n      }\n      phone\n      users {\n        email\n        Fname\n        Sname\n        image\n      }\n    }\n  }\n    \n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateBusiness($email: String!, $location: String!, $name: String!, $phone: String!) {\n  createBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      id\n      email\n      location\n      name\n      phone\n    }\n    message\n    status\n  }\n}\n\n"): (typeof documents)["\nmutation CreateBusiness($email: String!, $location: String!, $name: String!, $phone: String!) {\n  createBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      id\n      email\n      location\n      name\n      phone\n    }\n    message\n    status\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation InviteUser($email: String!, $role: String!) {\n      inviteUser(email: $email, role: $role) {\n        status\n        message\n      }\n    }\n  "): (typeof documents)["\n    mutation InviteUser($email: String!, $role: String!) {\n      inviteUser(email: $email, role: $role) {\n        status\n        message\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CompleteInvite($fname: String!, $sname: String!, $password: String!, $phone: String!, $token: String!) {\n    completeInvite(Fname: $fname, Sname: $sname, password: $password, phone: $phone, token: $token) {\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  mutation CompleteInvite($fname: String!, $sname: String!, $password: String!, $phone: String!, $token: String!) {\n    completeInvite(Fname: $fname, Sname: $sname, password: $password, phone: $phone, token: $token) {\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ValidateInvite($token: String!) {\n    validateInvite(token: $token) {\n      error\n      role\n      valid\n    }\n  }\n  \n  "): (typeof documents)["\n  mutation ValidateInvite($token: String!) {\n    validateInvite(token: $token) {\n      error\n      role\n      valid\n    }\n  }\n  \n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateBusiness($email: String, $location: String, $name: String, $phone: String) {\n  updateBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      email\n    }\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation UpdateBusiness($email: String, $location: String, $name: String, $phone: String) {\n  updateBusiness(email: $email, location: $location, name: $name, phone: $phone) {\n    business {\n      email\n    }\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ActivateEmployee($activateEmployeeId: Int!) {\nactivateEmployee(id: $activateEmployeeId) {\n  message\n  status\n}\n}\n"): (typeof documents)["\n  mutation ActivateEmployee($activateEmployeeId: Int!) {\nactivateEmployee(id: $activateEmployeeId) {\n  message\n  status\n}\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteEmployee($deleteEmployeeId: Int!) {\n    deleteEmployee(id: $deleteEmployeeId) {\n      message\n      status\n    }\n  }\n  \n    "): (typeof documents)["\n  mutation DeleteEmployee($deleteEmployeeId: Int!) {\n    deleteEmployee(id: $deleteEmployeeId) {\n      message\n      status\n    }\n  }\n  \n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeactivateEmployee($deactivateEmployeeId: Int!) {\n    deactivateEmployee(id: $deactivateEmployeeId) {\n      message\n      status\n    }\n  }\n    "): (typeof documents)["\n  mutation DeactivateEmployee($deactivateEmployeeId: Int!) {\n    deactivateEmployee(id: $deactivateEmployeeId) {\n      message\n      status\n    }\n  }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateUser($fname: String!, $sname: String!, $email: String!, $password: String!, $role: String!) {\n  createUser(Fname: $fname, Sname: $sname, email: $email, password: $password, role: $role) {\n    message\n    status\n  }\n}\n"): (typeof documents)["mutation CreateUser($fname: String!, $sname: String!, $email: String!, $password: String!, $role: String!) {\n  createUser(Fname: $fname, Sname: $sname, email: $email, password: $password, role: $role) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UserLogin($email: String!, $password: String!) {\n  userLogin(email: $email, password: $password) {\n    message\n    status\n    tokenId\n  }\n}\n"): (typeof documents)["\nmutation UserLogin($email: String!, $password: String!) {\n  userLogin(email: $email, password: $password) {\n    message\n    status\n    tokenId\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UserPasswordResetRequest($email: String!) {\n    passwordResetRequest(email: $email) {\n      message\n      status\n    }\n  }\n"): (typeof documents)["mutation UserPasswordResetRequest($email: String!) {\n    passwordResetRequest(email: $email) {\n      message\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation PasswordReset($newPassword: String!, $token: String!) {\n  passwordReset(newPassword: $newPassword, token: $token) {\n    message\n    status\n  }\n}\n"): (typeof documents)["mutation PasswordReset($newPassword: String!, $token: String!) {\n  passwordReset(newPassword: $newPassword, token: $token) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UserLogout {\n  userLogout {\n    message\n    status\n  }\n}\n  "): (typeof documents)["\nmutation UserLogout {\n  userLogout {\n    message\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateUserProfile($fname: String, $sname: String, $email: String, $image: Upload, $password: String, $phone: String) {\n  updateUserProfile(Fname: $fname, Sname: $sname, email: $email, image: $image, password: $password, phone: $phone) {\n    message\n    status\n    updatedUser {\n      Fname\n      Sname\n      business {\n        email\n        id\n        location\n        name\n        owner {\n          Fname\n          Sname\n          id\n          email\n          image\n        }\n        phone\n      }\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n  }\n}\n  \n"): (typeof documents)["\nmutation UpdateUserProfile($fname: String, $sname: String, $email: String, $image: Upload, $password: String, $phone: String) {\n  updateUserProfile(Fname: $fname, Sname: $sname, email: $email, image: $image, password: $password, phone: $phone) {\n    message\n    status\n    updatedUser {\n      Fname\n      Sname\n      business {\n        email\n        id\n        location\n        name\n        owner {\n          Fname\n          Sname\n          id\n          email\n          image\n        }\n        phone\n      }\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n  }\n}\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUser($deleteUserId: Int) {\n  deleteUser(id: $deleteUserId) {\n    message\n    status\n  }\n}\n\n  "): (typeof documents)["\n  mutation DeleteUser($deleteUserId: Int) {\n  deleteUser(id: $deleteUserId) {\n    message\n    status\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdatePassword($newPassword: String!, $oldPassword: String!) {\n  updatePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    message\n    status\n  }\n}\n  "): (typeof documents)["\nmutation UpdatePassword($newPassword: String!, $oldPassword: String!) {\n  updatePassword(newPassword: $newPassword, oldPassword: $oldPassword) {\n    message\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UserGoogleSignIn($idToken: String!) {\n    authwithGoogle(id_token: $idToken) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation UserGoogleSignIn($idToken: String!) {\n    authwithGoogle(id_token: $idToken) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation EnableTwoFA {\n  enableTwoFA {\n    message\n    status\n  }\n}\n\n  "): (typeof documents)["\nmutation EnableTwoFA {\n  enableTwoFA {\n    message\n    status\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DisabletwoFA {\n  disabletwoFA {\n    message\n    status\n  }\n}\n\n  "): (typeof documents)["\nmutation DisabletwoFA {\n  disabletwoFA {\n    message\n    status\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AuthTwoFA($otp: String!, $tokenId: String!) {\n  authTwoFA(otp: $otp, tokenId: $tokenId) {\n    message\n    status\n  }\n}\n  "): (typeof documents)["\nmutation AuthTwoFA($otp: String!, $tokenId: String!) {\n  authTwoFA(otp: $otp, tokenId: $tokenId) {\n    message\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation AuthwithGoogle($idToken: String!) {\n  authwithGoogle(id_token: $idToken) {\n    message\n    status\n  }\n}\n  "): (typeof documents)["\nmutation AuthwithGoogle($idToken: String!) {\n  authwithGoogle(id_token: $idToken) {\n    message\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation AuthWithFacebook($accessToken: String!, $userID: String!) {\n      authWithFacebook(accessToken: $accessToken, userID: $userID) {\n        message\n        status\n      }\n    }\n  "): (typeof documents)["\n    mutation AuthWithFacebook($accessToken: String!, $userID: String!) {\n      authWithFacebook(accessToken: $accessToken, userID: $userID) {\n        message\n        status\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LinkedInAuth($code: String!, $redirectUri: String!) {\n  linkedInAuth(code: $code, redirectUri: $redirectUri) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\n  mutation LinkedInAuth($code: String!, $redirectUri: String!) {\n  linkedInAuth(code: $code, redirectUri: $redirectUri) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AuthTikTok($code: String!, $codeVerifier: String) {\n  authTikTok(code: $code, codeVerifier: $codeVerifier) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\n  mutation AuthTikTok($code: String!, $codeVerifier: String) {\n  authTikTok(code: $code, codeVerifier: $codeVerifier) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddEvent($title: String!, $description: String!, $start: DateTime!, $end: DateTime! ) {\n    addEvent(title: $title, description: $description, start: $start, end: $end) {\n      status\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation AddEvent($title: String!, $description: String!, $start: DateTime!, $end: DateTime! ) {\n    addEvent(title: $title, description: $description, start: $start, end: $end) {\n      status\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateEvent($eventId: Int!, $description: String, $end: DateTime, $start: DateTime, $title: String) {\n  updateEvent(eventId: $eventId, description: $description, end: $end, start: $start, title: $title) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation UpdateEvent($eventId: Int!, $description: String, $end: DateTime, $start: DateTime, $title: String) {\n  updateEvent(eventId: $eventId, description: $description, end: $end, start: $start, title: $title) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteEvent($eventId: Int!) {\n  deleteEvent(eventId: $eventId) {\n    message\n    status\n  }\n}"): (typeof documents)["\n  mutation DeleteEvent($eventId: Int!) {\n  deleteEvent(eventId: $eventId) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCampaign($description: String!, $end: DateTime!, $start: DateTime!, $title: String!) {\n  createCampaign(description: $description, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation CreateCampaign($description: String!, $end: DateTime!, $start: DateTime!, $title: String!) {\n  createCampaign(description: $description, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCampaign($deleteCampaignId: Int!) {\n    deleteCampaign(id: $deleteCampaignId) {\n      message\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCampaign($deleteCampaignId: Int!) {\n    deleteCampaign(id: $deleteCampaignId) {\n      message\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateSocialPost($campaignId: Int!, $channels: [String!]!, $content: String!, $title: String!, $media: [Upload!]) {\n  createSocialPost(campaignId: $campaignId, channels: $channels, content: $content, title: $title, media: $media) {\n    message\n    status\n  }\n}\n\n"): (typeof documents)["\nmutation CreateSocialPost($campaignId: Int!, $channels: [String!]!, $content: String!, $title: String!, $media: [Upload!]) {\n  createSocialPost(campaignId: $campaignId, channels: $channels, content: $content, title: $title, media: $media) {\n    message\n    status\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateCampaign($updateCampaignId: Int!, $channel: [String!], $end: DateTime, $start: DateTime, $title: String) {\n  updateCampaign(id: $updateCampaignId, channel: $channel, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n  }\n}\n\n  "): (typeof documents)["\nmutation UpdateCampaign($updateCampaignId: Int!, $channel: [String!], $end: DateTime, $start: DateTime, $title: String) {\n  updateCampaign(id: $updateCampaignId, channel: $channel, end: $end, start: $start, title: $title) {\n    campaign {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SendMail($email: String!, $message: String!) {\n  sendMail(email: $email, message: $message) {\n    message\n    status\n  }\n} \n    "): (typeof documents)["\n    mutation SendMail($email: String!, $message: String!) {\n  sendMail(email: $email, message: $message) {\n    message\n    status\n  }\n} \n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n  "): (typeof documents)["\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CustomerStats {\n  customerStats {\n    customersByMonth {\n      count\n      month\n    }\n    message\n    totalCustomers\n  }\n}\n"): (typeof documents)["\nquery CustomerStats {\n  customerStats {\n    customersByMonth {\n      count\n      month\n    }\n    message\n    totalCustomers\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SalesRevenueStats {\n  salesRevenueStats {\n    revenueByMonth {\n      month\n      total\n    }\n    totalRevenue\n  }\n}\n"): (typeof documents)["\n  query SalesRevenueStats {\n  salesRevenueStats {\n    revenueByMonth {\n      month\n      total\n    }\n    totalRevenue\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n"): (typeof documents)["\nquery LeadConversionRates {\n  LeadConversionRates {\n    conversionDelta\n    conversionRate\n    nonConversionRate\n    salesDelta\n    totalSales\n    totalVisitors\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " \n  query RevenueForecast {\n  revenueForecast {\n    month\n    productCost\n    salesRevenue\n  }\n}\n"): (typeof documents)[" \n  query RevenueForecast {\n  revenueForecast {\n    month\n    productCost\n    salesRevenue\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Employees($limit: Int, $page: Int) {\n  employees(limit: $limit, page: $page) {\n    employees {\n      Fname\n      Sname\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n"): (typeof documents)["\nquery Employees($limit: Int, $page: Int) {\n  employees(limit: $limit, page: $page) {\n    employees {\n      Fname\n      Sname\n      businessId\n      createdAt\n      email\n      id\n      image\n      lastLogin\n      phone\n      role\n      status\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery EmployeeCount {\n  employeeCount {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalEmployees\n  }\n}\n  \n  "): (typeof documents)["\nquery EmployeeCount {\n  employeeCount {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalEmployees\n  }\n}\n  \n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\nquery WorkLog {\n  workLog {\n    monthlyData {\n      month\n      totalWorkingHours\n    }\n    totalWorkingHours\n  }\n}\n\n\n  "): (typeof documents)["\n\nquery WorkLog {\n  workLog {\n    monthlyData {\n      month\n      totalWorkingHours\n    }\n    totalWorkingHours\n  }\n}\n\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MonthlyLeadTrends {\n  monthlyLeadTrends {\n    data {\n      count\n      month\n    }\n    totalLeads\n  }\n}\n  "): (typeof documents)["\n  query MonthlyLeadTrends {\n  monthlyLeadTrends {\n    data {\n      count\n      month\n    }\n    totalLeads\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery RecentLeads {\n  recentLeads {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    phone\n    revenue\n    salesRep {\n      email\n      Fname\n      Sname\n      image\n    }\n    source\n    stageId\n    status\n  }\n}\n  "): (typeof documents)["\nquery RecentLeads {\n  recentLeads {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    phone\n    revenue\n    salesRep {\n      email\n      Fname\n      Sname\n      image\n    }\n    source\n    stageId\n    status\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Campaigns($limit: Int, $page: Int) {\n  campaigns(limit: $limit, page: $page) {\n    campaigns {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n  "): (typeof documents)["\nquery Campaigns($limit: Int, $page: Int) {\n  campaigns(limit: $limit, page: $page) {\n    campaigns {\n      businessId\n      channels\n      createdAt\n      description\n      end\n      id\n      start\n      title\n    }\n    pageInfo {\n      currentPage\n      hasNextPage\n      hasPrevPage\n      totalCount\n      totalPages\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Campaign($campaignId: Int!) {\n  campaign(id: $campaignId) {\n    businessId\n    channels\n    createdAt\n    description\n    end\n    id\n    start\n    title\n  }\n}\n"): (typeof documents)["\nquery Campaign($campaignId: Int!) {\n  campaign(id: $campaignId) {\n    businessId\n    channels\n    createdAt\n    description\n    end\n    id\n    start\n    title\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery UserLeads($after: String, $first: Int) {\n  userLeads(after: $after, first: $first) {\n    leads {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        email\n      }\n      source\n\n      status\n    }\n    pageInfo {\n      endCursor\n      endCursor\n    }\n  }\n}\n\n  "): (typeof documents)["\nquery UserLeads($after: String, $first: Int) {\n  userLeads(after: $after, first: $first) {\n    leads {\n      Fname\n      Sname\n      createdAt\n      email\n      id\n      phone\n      revenue\n      salesRep {\n        Fname\n        email\n      }\n      source\n\n      status\n    }\n    pageInfo {\n      endCursor\n      endCursor\n    }\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CampaignCounts {\n  campaignCounts {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalCampaigns\n  }\n}\n"): (typeof documents)["\nquery CampaignCounts {\n  campaignCounts {\n    monthlyData {\n      count\n      monthYear\n    }\n    totalCampaigns\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CustomerFeedback {\n  customerFeedback {\n    data {\n      count\n      name\n    }\n    message\n    totalFeedback\n  }\n}\n\n"): (typeof documents)["\n  query CustomerFeedback {\n  customerFeedback {\n    data {\n      count\n      name\n    }\n    message\n    totalFeedback\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CustomerSatisfaction {\n  customerSatisfaction {\n    distribution {\n      count\n      monthYear\n    }\n    message\n    status\n    total\n  }\n}\n"): (typeof documents)["\nquery CustomerSatisfaction {\n  customerSatisfaction {\n    distribution {\n      count\n      monthYear\n    }\n    message\n    status\n    total\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LeadSourcesStats {\n  leadSourcesStats {\n    data {\n      count\n      name\n    }\n    message\n    totalLeads\n  }\n}\n\n  "): (typeof documents)["\n  query LeadSourcesStats {\n  leadSourcesStats {\n    data {\n      count\n      name\n    }\n    message\n    totalLeads\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query SentimentAnalysis {\n  sentimentAnalysis {\n    message\n    negative\n    neutral\n    positive\n    total\n  }\n}\n\n"): (typeof documents)["\n query SentimentAnalysis {\n  sentimentAnalysis {\n    message\n    negative\n    neutral\n    positive\n    total\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery LeadSummary {\n  leadSummary {\n    awaiting\n    completed\n    message\n    monthlyIncrease\n    ongoing\n    total\n  }\n}\n\n  "): (typeof documents)["\nquery LeadSummary {\n  leadSummary {\n    awaiting\n    completed\n    message\n    monthlyIncrease\n    ongoing\n    total\n  }\n}\n\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AccountConnection {\n  accountConnection {\n    data {\n      expiresIn\n      platform\n      status\n    }\n  }\n}\n"): (typeof documents)["\n  query AccountConnection {\n  accountConnection {\n    data {\n      expiresIn\n      platform\n      status\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserEvents {\n    getUserEvents {id, title, description, start, end, user { id, Fname, email } }\n  }\n"): (typeof documents)["\n  query GetUserEvents {\n    getUserEvents {id, title, description, start, end, user { id, Fname, email } }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery CallCustomer($ticketId: Int!) {\n  callCustomer(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n"): (typeof documents)["\nquery CallCustomer($ticketId: Int!) {\n  callCustomer(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SubscriberStats {\n  subscriberStats {\n    data {\n      month\n      count\n    }\n  }\n}\n    "): (typeof documents)["\n    query SubscriberStats {\n  subscriberStats {\n    data {\n      month\n      count\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query User {\n  user {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    image\n    phone\n    role\n    business {\n      email\n      id\n      name\n      phone\n      location\n    }\n  }\n}\n  "): (typeof documents)["query User {\n  user {\n    Fname\n    Sname\n    createdAt\n    email\n    id\n    image\n    phone\n    role\n    business {\n      email\n      id\n      name\n      phone\n      location\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MarkNotificationAsRead($notificationIds: [ID!]!) {\n    markNotificationAsRead(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  mutation MarkNotificationAsRead($notificationIds: [ID!]!) {\n    markNotificationAsRead(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteNotification($notificationIds: [ID!]!) {\n    deleteNotification(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  mutation DeleteNotification($notificationIds: [ID!]!) {\n    deleteNotification(notificationIds: $notificationIds) {\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SocialMonthlyAnalytics {\n  socialMonthlyAnalytics {\n    analytics {\n      data {\n        monthYear\n        totalLikes\n      }\n      platform\n    }\n  }\n}\n\n"): (typeof documents)["\n  query SocialMonthlyAnalytics {\n  socialMonthlyAnalytics {\n    analytics {\n      data {\n        monthYear\n        totalLikes\n      }\n      platform\n    }\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery SocialMediaPerformance {\n  SocialMediaPerformance {\n    analytics {\n      platform\n      data {\n        likes\n        comments\n        reposts\n        retweets\n        views\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery SocialMediaPerformance {\n  SocialMediaPerformance {\n    analytics {\n      platform\n      data {\n        likes\n        comments\n        reposts\n        retweets\n        views\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTicket($description: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String!, $platform: String!, $ticketType: String!) {\n    createTicket(description: $description, email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, platform: $platform, ticketType: $ticketType) {\n      message\n      status\n      ticket {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "): (typeof documents)["\n  mutation CreateTicket($description: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String!, $platform: String!, $ticketType: String!) {\n    createTicket(description: $description, email: $email, firstName: $firstName, lastName: $lastName, phone: $phone, platform: $platform, ticketType: $ticketType) {\n      message\n      status\n      ticket {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CloseTicket($ticketId: Int!) {\n  closeTicket(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n    "): (typeof documents)["\nmutation CloseTicket($ticketId: Int!) {\n  closeTicket(ticketId: $ticketId) {\n    message\n    status\n    ticket {\n      createdAt\n      description\n      email\n      firstName\n      id\n      lastName\n      phone\n      platform\n      respondedAt\n      status\n      tickettype\n    }\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation DeleteTicket($ticketId: Int!) {\n      deleteTicket(ticketId: $ticketId) {\n        message\n        status\n      }\n    }\n    "): (typeof documents)["\n    mutation DeleteTicket($ticketId: Int!) {\n      deleteTicket(ticketId: $ticketId) {\n        message\n        status\n      }\n    }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TicketStatusCount {\n    ticketStatusCount {\n      distribution {\n        count\n        ticketStatus\n      }\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  query TicketStatusCount {\n    ticketStatusCount {\n      distribution {\n        count\n        ticketStatus\n      }\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TicketsCount {\n    ticketsCount {\n      monthlyData {\n        count\n        monthYear\n      }\n      totalTickets\n    }\n  }\n  "): (typeof documents)["\n  query TicketsCount {\n    ticketsCount {\n      monthlyData {\n        count\n        monthYear\n      }\n      totalTickets\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TicketsResponseTime {\n    ticketsResponseTime {\n      data {\n        hours\n        month\n      }\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  query TicketsResponseTime {\n    ticketsResponseTime {\n      data {\n        hours\n        month\n      }\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TicketTypeDistribution {\n    ticketTypeDistribution {\n      distribution {\n        percentage\n        ticketType\n      }\n      message\n      status\n    }\n  }\n  "): (typeof documents)["\n  query TicketTypeDistribution {\n    ticketTypeDistribution {\n      distribution {\n        percentage\n        ticketType\n      }\n      message\n      status\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OpenTickets($limit: Int, $page: Int) {\n    openTickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "): (typeof documents)["\n  query OpenTickets($limit: Int, $page: Int) {\n    openTickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tickets($limit: Int, $page: Int) {\n    tickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "): (typeof documents)["\n  query Tickets($limit: Int, $page: Int) {\n    tickets(limit: $limit, page: $page) {\n      pageInfo {\n        currentPage\n        hasNextPage\n        hasPrevPage\n        totalCount\n        totalPages\n      }\n      tickets {\n        createdAt\n        description\n        email\n        firstName\n        id\n        lastName\n        phone\n        platform\n        respondedAt\n        status\n        tickettype\n      }\n    }\n  }\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;