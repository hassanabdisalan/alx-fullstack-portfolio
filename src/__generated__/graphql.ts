/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  expiresIn?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type AccountConnection = {
  __typename?: 'AccountConnection';
  data?: Maybe<Array<Account>>;
};

export type Business = {
  __typename?: 'Business';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Users>;
  phone?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<Users>>;
};

export type Campaign = {
  __typename?: 'Campaign';
  businessId?: Maybe<Scalars['Int']['output']>;
  channels?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  posts?: Maybe<Array<Posts>>;
  start?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CampaignCount = {
  __typename?: 'CampaignCount';
  count?: Maybe<Scalars['Int']['output']>;
  monthYear?: Maybe<Scalars['String']['output']>;
};

export type CampaignCountReport = {
  __typename?: 'CampaignCountReport';
  monthlyData?: Maybe<Array<CampaignCount>>;
  totalCampaigns?: Maybe<Scalars['Int']['output']>;
};

export type ConversionRatesResponse = {
  __typename?: 'ConversionRatesResponse';
  conversionDelta?: Maybe<Scalars['Float']['output']>;
  conversionRate?: Maybe<Scalars['Float']['output']>;
  nonConversionRate?: Maybe<Scalars['Float']['output']>;
  salesDelta?: Maybe<Scalars['Float']['output']>;
  totalSales?: Maybe<Scalars['Float']['output']>;
  totalVisitors?: Maybe<Scalars['Int']['output']>;
};

export type CreateBusinessResponse = {
  __typename?: 'CreateBusinessResponse';
  business?: Maybe<Business>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type CreateCampaignResponse = {
  __typename?: 'CreateCampaignResponse';
  campaign?: Maybe<Campaign>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Customer = {
  __typename?: 'Customer';
  Fname?: Maybe<Scalars['String']['output']>;
  Sname?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  feedback?: Maybe<Feedback>;
  id?: Maybe<Scalars['ID']['output']>;
  orders?: Maybe<Array<Order>>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CustomerByMonth = {
  __typename?: 'CustomerByMonth';
  count?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type CustomerSatis = {
  __typename?: 'CustomerSatis';
  count?: Maybe<Scalars['Float']['output']>;
  monthYear?: Maybe<Scalars['String']['output']>;
};

export type CustomerSatisfactionReport = {
  __typename?: 'CustomerSatisfactionReport';
  distribution?: Maybe<Array<CustomerSatis>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type CustomerStatsResp = {
  __typename?: 'CustomerStatsResp';
  customersByMonth?: Maybe<Array<MonthlyTrends>>;
  message?: Maybe<Scalars['String']['output']>;
  totalCustomers?: Maybe<Scalars['Int']['output']>;
};

export type EmployeeCount = {
  __typename?: 'EmployeeCount';
  count?: Maybe<Scalars['Int']['output']>;
  monthYear?: Maybe<Scalars['String']['output']>;
};

export type EmployeeCountReport = {
  __typename?: 'EmployeeCountReport';
  monthlyData?: Maybe<Array<EmployeeCount>>;
  totalEmployees?: Maybe<Scalars['Int']['output']>;
};

export type Events = {
  __typename?: 'Events';
  description?: Maybe<Scalars['String']['output']>;
  end?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  start?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Users>;
};

export type Feedback = {
  __typename?: 'Feedback';
  businessId?: Maybe<Scalars['ID']['output']>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  satisfaction?: Maybe<SatisfactionLevel>;
};

export type FeedbackDistribution = {
  __typename?: 'FeedbackDistribution';
  feedbackType?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
};

export type FeedbackReport = {
  __typename?: 'FeedbackReport';
  distribution?: Maybe<Array<FeedbackDistribution>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type FeedbackResponse = {
  __typename?: 'FeedbackResponse';
  count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FeedbackStatsResp = {
  __typename?: 'FeedbackStatsResp';
  data?: Maybe<Array<FeedbackResponse>>;
  message?: Maybe<Scalars['String']['output']>;
  totalFeedback?: Maybe<Scalars['Int']['output']>;
};

export type GetCampaignsResponse = {
  __typename?: 'GetCampaignsResponse';
  campaigns?: Maybe<Array<Campaign>>;
  pageInfo?: Maybe<PagInfo>;
};

export type GetEmployeesResponse = {
  __typename?: 'GetEmployeesResponse';
  employees?: Maybe<Array<Users>>;
  pageInfo?: Maybe<PagezInfoz>;
};

export type GetLeadsResponse = {
  __typename?: 'GetLeadsResponse';
  leads?: Maybe<Array<Lead>>;
  pageInfo?: Maybe<PageInfo>;
};

export type GetTicketsResponse = {
  __typename?: 'GetTicketsResponse';
  pageInfo?: Maybe<PagezInfo>;
  tickets?: Maybe<Array<Ticket>>;
};

export type Lead = {
  __typename?: 'Lead';
  Fname?: Maybe<Scalars['String']['output']>;
  Sname?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isConverted?: Maybe<Scalars['Boolean']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  revenue?: Maybe<Scalars['Float']['output']>;
  salesRep?: Maybe<Users>;
  source?: Maybe<Scalars['String']['output']>;
  stage?: Maybe<LeadStage>;
  stageId?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type LeadSourceStat = {
  __typename?: 'LeadSourceStat';
  count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type LeadSourcesStatsRef = {
  __typename?: 'LeadSourcesStatsRef';
  data?: Maybe<Array<LeadSourceStat>>;
  message?: Maybe<Scalars['String']['output']>;
  totalLeads?: Maybe<Scalars['Int']['output']>;
};

export type LeadStage = {
  __typename?: 'LeadStage';
  businessId?: Maybe<Scalars['ID']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  leads?: Maybe<Array<Lead>>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
};

export enum LeadStatus {
  Awaiting = 'Awaiting',
  Completed = 'Completed',
  Ongoing = 'Ongoing'
}

export type LeadSummaryResponse = {
  __typename?: 'LeadSummaryResponse';
  awaiting?: Maybe<Scalars['Int']['output']>;
  completed?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  monthlyIncrease?: Maybe<Scalars['Int']['output']>;
  ongoing?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type LeadTrendsByMonthResponse = {
  __typename?: 'LeadTrendsByMonthResponse';
  data?: Maybe<Array<MonthlyTrends>>;
  message?: Maybe<Scalars['String']['output']>;
  totalLeads?: Maybe<Scalars['Int']['output']>;
};

export type MailingList = {
  __typename?: 'MailingList';
  businessId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type Metrics = {
  __typename?: 'Metrics';
  comments?: Maybe<Scalars['Int']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  reposts?: Maybe<Scalars['Int']['output']>;
  retweets?: Maybe<Scalars['Int']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type MonthHours = {
  __typename?: 'MonthHours';
  hours?: Maybe<Scalars['Float']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type MonthlyAnalytics = {
  __typename?: 'MonthlyAnalytics';
  monthYear?: Maybe<Scalars['String']['output']>;
  totalLikes?: Maybe<Scalars['Int']['output']>;
};

export type MonthlyData = {
  __typename?: 'MonthlyData';
  month?: Maybe<Scalars['String']['output']>;
  totalWorkingHours?: Maybe<Scalars['Float']['output']>;
};

export type MonthlyTrends = {
  __typename?: 'MonthlyTrends';
  count?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateEmployee?: Maybe<Response>;
  addEvent?: Maybe<Response>;
  addFeedback?: Maybe<Response>;
  addLead?: Maybe<NewLeadResponse>;
  addLeadStage?: Maybe<Response>;
  addOrder?: Maybe<Response>;
  analyzeSentiment?: Maybe<SentimentResponse>;
  authTikTok?: Maybe<Response>;
  authTwoFA?: Maybe<Response>;
  authWithFacebook?: Maybe<Response>;
  authwithGoogle?: Maybe<Response>;
  awaitTicket?: Maybe<TicketMutationResponse>;
  closeTicket?: Maybe<TicketMutationResponse>;
  completeInvite?: Maybe<Response>;
  createBusiness?: Maybe<CreateBusinessResponse>;
  createCampaign?: Maybe<CreateCampaignResponse>;
  createCustomer?: Maybe<Response>;
  createSocialPost?: Maybe<Response>;
  createTicket?: Maybe<TicketMutationResponse>;
  createUser?: Maybe<Response>;
  deactivateEmployee?: Maybe<Response>;
  deleteCampaign?: Maybe<Response>;
  deleteEmployee?: Maybe<Response>;
  deleteEvent?: Maybe<Response>;
  deleteLead?: Maybe<Response>;
  deleteLeadStage?: Maybe<Response>;
  deleteNotification?: Maybe<Response>;
  deleteTicket?: Maybe<Response>;
  deleteTwitterPost?: Maybe<Response>;
  deleteUser?: Maybe<Response>;
  disabletwoFA?: Maybe<Response>;
  enableTwoFA?: Maybe<Response>;
  inviteUser?: Maybe<Response>;
  linkedInAuth?: Maybe<Response>;
  markNotificationAsRead?: Maybe<Response>;
  moveLead?: Maybe<NewLeadResponse>;
  passwordReset?: Maybe<Response>;
  passwordResetRequest?: Maybe<Response>;
  regenerateAccessToken?: Maybe<ValidationResponse>;
  sendMail?: Maybe<Response>;
  updateBusiness?: Maybe<CreateBusinessResponse>;
  updateCampaign?: Maybe<CreateCampaignResponse>;
  updateEvent?: Maybe<Response>;
  updateLead?: Maybe<NewLeadResponse>;
  updateLeadStage?: Maybe<Response>;
  updatePassword?: Maybe<Response>;
  updateUserProfile?: Maybe<ProfileUpdateResponse>;
  userLogin?: Maybe<ValidationResponse>;
  userLogout?: Maybe<Response>;
  validateInvite?: Maybe<ValidteInvitePayload>;
};


export type MutationActivateEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAddEventArgs = {
  description: Scalars['String']['input'];
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddFeedbackArgs = {
  customerId: Scalars['Int']['input'];
  satisfaction: Scalars['String']['input'];
};


export type MutationAddLeadArgs = {
  Fname: Scalars['String']['input'];
  Sname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['String']['input'];
  revenue: Scalars['Float']['input'];
  source: Scalars['String']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationAddLeadStageArgs = {
  name: Scalars['String']['input'];
  position: Scalars['Int']['input'];
};


export type MutationAddOrderArgs = {
  customerId: Scalars['Int']['input'];
  productCost?: InputMaybe<Scalars['Float']['input']>;
  totalAmount: Scalars['Float']['input'];
};


export type MutationAnalyzeSentimentArgs = {
  text: Scalars['String']['input'];
};


export type MutationAuthTikTokArgs = {
  code: Scalars['String']['input'];
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAuthTwoFaArgs = {
  otp: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};


export type MutationAuthWithFacebookArgs = {
  accessToken: Scalars['String']['input'];
  userID: Scalars['String']['input'];
};


export type MutationAuthwithGoogleArgs = {
  id_token: Scalars['String']['input'];
};


export type MutationAwaitTicketArgs = {
  ticketId: Scalars['Int']['input'];
};


export type MutationCloseTicketArgs = {
  ticketId: Scalars['Int']['input'];
};


export type MutationCompleteInviteArgs = {
  Fname: Scalars['String']['input'];
  Sname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateBusinessArgs = {
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationCreateCampaignArgs = {
  description: Scalars['String']['input'];
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateCustomerArgs = {
  Fname: Scalars['String']['input'];
  Sname: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSocialPostArgs = {
  campaignId: Scalars['Int']['input'];
  channels: Array<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  media?: InputMaybe<Array<Scalars['Upload']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationCreateTicketArgs = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  ticketType: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  Fname: Scalars['String']['input'];
  Sname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationDeactivateEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCampaignArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationDeleteLeadArgs = {
  leadId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteLeadStageArgs = {
  stageId: Scalars['Int']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationIds: Array<Scalars['ID']['input']>;
};


export type MutationDeleteTicketArgs = {
  ticketId: Scalars['Int']['input'];
};


export type MutationDeleteTwitterPostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationInviteUserArgs = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};


export type MutationLinkedInAuthArgs = {
  code: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  notificationIds: Array<Scalars['ID']['input']>;
};


export type MutationMoveLeadArgs = {
  leadId: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationPasswordResetArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationPasswordResetRequestArgs = {
  email: Scalars['String']['input'];
};


export type MutationRegenerateAccessTokenArgs = {
  tokenId: Scalars['String']['input'];
};


export type MutationSendMailArgs = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type MutationUpdateBusinessArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCampaignArgs = {
  channel?: InputMaybe<Array<Scalars['String']['input']>>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEventArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  eventId: Scalars['Int']['input'];
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateLeadArgs = {
  Fname?: InputMaybe<Scalars['String']['input']>;
  Sname?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadId: Scalars['Int']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  revenue?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  stageId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateLeadStageArgs = {
  name: Scalars['String']['input'];
  stageId: Scalars['Int']['input'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserProfileArgs = {
  Fname?: InputMaybe<Scalars['String']['input']>;
  Sname?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUserLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationValidateInviteArgs = {
  token: Scalars['String']['input'];
};

export type NewLeadResponse = {
  __typename?: 'NewLeadResponse';
  lead?: Maybe<Lead>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Notifications = {
  __typename?: 'Notifications';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  readStatus?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Users>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type OAuthCredential = {
  __typename?: 'OAuthCredential';
  provider?: Maybe<Scalars['String']['output']>;
  tokenExpiry?: Maybe<Scalars['DateTime']['output']>;
};

export type Order = {
  __typename?: 'Order';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  productConst?: Maybe<Scalars['Float']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
};

export type PagInfo = {
  __typename?: 'PagInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

export type PagezInfo = {
  __typename?: 'PagezInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PagezInfoz = {
  __typename?: 'PagezInfoz';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPrevPage?: Maybe<Scalars['Boolean']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type Performance = {
  __typename?: 'Performance';
  data?: Maybe<Metrics>;
  platform?: Maybe<Scalars['String']['output']>;
};

export type PerformanceMonthly = {
  __typename?: 'PerformanceMonthly';
  data?: Maybe<Array<MonthlyAnalytics>>;
  platform?: Maybe<Scalars['String']['output']>;
};

export enum Platform {
  Emails = 'Emails',
  Events = 'Events',
  SocialMedia = 'Social_Media',
  Website = 'Website'
}

export type Posts = {
  __typename?: 'Posts';
  businessId?: Maybe<Scalars['ID']['output']>;
  campaign?: Maybe<Campaign>;
  campaignId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  platform?: Maybe<SocialPlatforms>;
  postId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProfileUpdateResponse = {
  __typename?: 'ProfileUpdateResponse';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedUser?: Maybe<Users>;
};

export type Query = {
  __typename?: 'Query';
  LeadConversionRates?: Maybe<ConversionRatesResponse>;
  SocialMediaPerformance?: Maybe<SocialMediaPerformance>;
  accountConnection?: Maybe<AccountConnection>;
  allBusinesses?: Maybe<Array<Business>>;
  business?: Maybe<Business>;
  businessCustomers?: Maybe<Array<Customer>>;
  businessEmployees?: Maybe<Array<Users>>;
  businessLeadStages?: Maybe<Array<LeadStage>>;
  businessMailingList?: Maybe<Array<MailingList>>;
  callCustomer?: Maybe<TicketMutationResponse>;
  campaign?: Maybe<Campaign>;
  campaignCounts?: Maybe<CampaignCountReport>;
  campaigns?: Maybe<GetCampaignsResponse>;
  customerFeedback?: Maybe<FeedbackStatsResp>;
  customerSatisfaction?: Maybe<CustomerSatisfactionReport>;
  customerStats?: Maybe<CustomerStatsResp>;
  employeeCount?: Maybe<EmployeeCountReport>;
  employees?: Maybe<GetEmployeesResponse>;
  feedbackTypeDistribution?: Maybe<FeedbackReport>;
  getBusinessLeadsByStage?: Maybe<GetLeadsResponse>;
  getPostData?: Maybe<Performance>;
  getUserEvents?: Maybe<Array<Events>>;
  leadSourcesStats?: Maybe<LeadSourcesStatsRef>;
  leadSummary?: Maybe<LeadSummaryResponse>;
  monthlyLeadTrends?: Maybe<LeadTrendsByMonthResponse>;
  openTickets?: Maybe<GetTicketsResponse>;
  recentLeads?: Maybe<Array<Lead>>;
  revenueForecast?: Maybe<Array<RevenueForecast>>;
  salesRevenueStats?: Maybe<SalesRevenueStats>;
  sentimentAnalysis?: Maybe<SentimentAnalysisResponse>;
  socialMonthlyAnalytics?: Maybe<SocialMediaMonthly>;
  subscriberStats?: Maybe<SubscriberStatsResponse>;
  ticket?: Maybe<Ticket>;
  ticketStatusCount?: Maybe<TicketStatusReport>;
  ticketTypeDistribution?: Maybe<TicketReport>;
  tickets?: Maybe<GetTicketsResponse>;
  ticketsCount?: Maybe<TicketsCountReport>;
  ticketsResponseTime?: Maybe<ResponseReport>;
  user?: Maybe<Users>;
  userBusiness?: Maybe<Business>;
  userLeads?: Maybe<GetLeadsResponse>;
  userNotifications?: Maybe<Array<Notifications>>;
  users?: Maybe<Array<Users>>;
  workLog?: Maybe<WorkingHoursReport>;
};


export type QueryBusinessArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryCallCustomerArgs = {
  ticketId: Scalars['Int']['input'];
};


export type QueryCampaignArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCampaignsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEmployeesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetBusinessLeadsByStageArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  stageId: Scalars['Int']['input'];
};


export type QueryGetPostDataArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryOpenTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTicketArgs = {
  ticketId: Scalars['Int']['input'];
};


export type QueryTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserLeadsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type ResponseReport = {
  __typename?: 'ResponseReport';
  data?: Maybe<Array<MonthHours>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type RevenueByMonth = {
  __typename?: 'RevenueByMonth';
  month?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type RevenueForecast = {
  __typename?: 'RevenueForecast';
  month?: Maybe<Scalars['String']['output']>;
  productCost?: Maybe<Scalars['Float']['output']>;
  salesRevenue?: Maybe<Scalars['Float']['output']>;
};

export enum Role {
  Admin = 'Admin',
  CustomerSupportRep = 'CustomerSupportRep',
  MarketingRep = 'MarketingRep',
  SalesRep = 'SalesRep'
}

export type SalesRevenueStats = {
  __typename?: 'SalesRevenueStats';
  revenueByMonth?: Maybe<Array<RevenueByMonth>>;
  totalRevenue?: Maybe<Scalars['Int']['output']>;
};

export enum SatisfactionLevel {
  Average = 'Average',
  Excellent = 'Excellent',
  Good = 'Good',
  Poor = 'Poor'
}

export type SentimentAnalysisResponse = {
  __typename?: 'SentimentAnalysisResponse';
  message?: Maybe<Scalars['String']['output']>;
  negative?: Maybe<Scalars['Int']['output']>;
  neutral?: Maybe<Scalars['Int']['output']>;
  positive?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SentimentResponse = {
  __typename?: 'SentimentResponse';
  reason?: Maybe<Scalars['String']['output']>;
  sentiment?: Maybe<Scalars['String']['output']>;
};

export type SocialMediaMonthly = {
  __typename?: 'SocialMediaMonthly';
  analytics?: Maybe<Array<PerformanceMonthly>>;
};

export type SocialMediaPerformance = {
  __typename?: 'SocialMediaPerformance';
  analytics?: Maybe<Array<Performance>>;
};

export enum SocialPlatforms {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter'
}

export type SubscriberStatsResponse = {
  __typename?: 'SubscriberStatsResponse';
  data?: Maybe<Array<SubscribersData>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type SubscribersData = {
  __typename?: 'SubscribersData';
  count?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notification?: Maybe<Notifications>;
};

export type Ticket = {
  __typename?: 'Ticket';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  respondedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tickettype?: Maybe<Scalars['String']['output']>;
};

export type TicketDistribution = {
  __typename?: 'TicketDistribution';
  percentage?: Maybe<Scalars['Float']['output']>;
  ticketType?: Maybe<Scalars['String']['output']>;
};

export type TicketMutationResponse = {
  __typename?: 'TicketMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  ticket?: Maybe<Ticket>;
};

export type TicketReport = {
  __typename?: 'TicketReport';
  distribution?: Maybe<Array<TicketDistribution>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export enum TicketStatus {
  Awaiting = 'Awaiting',
  Closed = 'Closed',
  InProgress = 'In_progress',
  Open = 'Open'
}

export type TicketStatusReport = {
  __typename?: 'TicketStatusReport';
  distribution?: Maybe<Array<TicketStatusr>>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type TicketStatusr = {
  __typename?: 'TicketStatusr';
  count?: Maybe<Scalars['Float']['output']>;
  ticketStatus?: Maybe<Scalars['String']['output']>;
};

export enum TicketType {
  Complains = 'Complains',
  Inquiries = 'Inquiries',
  Payments = 'Payments',
  Technical = 'Technical'
}

export type TicketsCount = {
  __typename?: 'TicketsCount';
  count?: Maybe<Scalars['Int']['output']>;
  monthYear?: Maybe<Scalars['String']['output']>;
};

export type TicketsCountReport = {
  __typename?: 'TicketsCountReport';
  monthlyData?: Maybe<Array<TicketsCount>>;
  totalTickets?: Maybe<Scalars['Int']['output']>;
};

export enum UserStatus {
  Active = 'Active',
  Idle = 'Idle',
  Invited = 'Invited',
  Offline = 'Offline',
  Suspended = 'Suspended'
}

export type Users = {
  __typename?: 'Users';
  Fname?: Maybe<Scalars['String']['output']>;
  Sname?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  status?: Maybe<UserStatus>;
};

export type ValidationResponse = {
  __typename?: 'ValidationResponse';
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type ValidteInvitePayload = {
  __typename?: 'ValidteInvitePayload';
  error?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  valid?: Maybe<Scalars['Boolean']['output']>;
};

export type WorkingHoursReport = {
  __typename?: 'WorkingHoursReport';
  monthlyData?: Maybe<Array<MonthlyData>>;
  totalWorkingHours?: Maybe<Scalars['Float']['output']>;
};

export type AddLeadStageMutationVariables = Exact<{
  name: Scalars['String']['input'];
  position: Scalars['Int']['input'];
}>;


export type AddLeadStageMutation = { __typename?: 'Mutation', addLeadStage?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UpdateLeadStageMutationVariables = Exact<{
  name: Scalars['String']['input'];
  stageId: Scalars['Int']['input'];
}>;


export type UpdateLeadStageMutation = { __typename?: 'Mutation', updateLeadStage?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DeleteLeadStageMutationVariables = Exact<{
  stageId: Scalars['Int']['input'];
}>;


export type DeleteLeadStageMutation = { __typename?: 'Mutation', deleteLeadStage?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type BusinessLeadStagesQueryVariables = Exact<{ [key: string]: never; }>;


export type BusinessLeadStagesQuery = { __typename?: 'Query', businessLeadStages?: Array<{ __typename?: 'LeadStage', businessId?: string | null, color?: string | null, id?: string | null, name?: string | null, position?: number | null }> | null };

export type AddLeadMutationVariables = Exact<{
  fname: Scalars['String']['input'];
  sname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  revenue: Scalars['Float']['input'];
  source: Scalars['String']['input'];
  stageId: Scalars['Int']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddLeadMutation = { __typename?: 'Mutation', addLead?: { __typename?: 'NewLeadResponse', message?: string | null, status?: string | null, lead?: { __typename?: 'Lead', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: number | null, phone?: string | null, revenue?: number | null, source?: string | null, stageId?: number | null, status?: string | null, salesRep?: { __typename?: 'Users', Fname?: string | null, Sname?: string | null, businessId?: number | null, createdAt?: any | null, email?: string | null, id?: string | null, image?: string | null, lastLogin?: any | null, phone?: string | null, role?: Role | null, status?: UserStatus | null } | null } | null } | null };

export type DeleteLeadMutationVariables = Exact<{
  leadId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteLeadMutation = { __typename?: 'Mutation', deleteLead?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UpdateLeadMutationVariables = Exact<{
  leadId: Scalars['Int']['input'];
  fname?: InputMaybe<Scalars['String']['input']>;
  sname?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  revenue?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  stageId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateLeadMutation = { __typename?: 'Mutation', updateLead?: { __typename?: 'NewLeadResponse', message?: string | null, status?: string | null, lead?: { __typename?: 'Lead', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: number | null, phone?: string | null, revenue?: number | null, source?: string | null, stageId?: number | null, status?: string | null, salesRep?: { __typename?: 'Users', Fname?: string | null, Sname?: string | null, email?: string | null, role?: Role | null, phone?: string | null } | null } | null } | null };

export type MoveLeadMutationVariables = Exact<{
  leadId: Scalars['Int']['input'];
  stageId: Scalars['Int']['input'];
}>;


export type MoveLeadMutation = { __typename?: 'Mutation', moveLead?: { __typename?: 'NewLeadResponse', message?: string | null, status?: string | null, lead?: { __typename?: 'Lead', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: number | null, isConverted?: boolean | null, phone?: string | null, revenue?: number | null, source?: string | null, stageId?: number | null, status?: string | null } | null } | null };

export type GetBusinessLeadsByStageQueryVariables = Exact<{
  stageId: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetBusinessLeadsByStageQuery = { __typename?: 'Query', getBusinessLeadsByStage?: { __typename?: 'GetLeadsResponse', leads?: Array<{ __typename?: 'Lead', id?: number | null, email?: string | null, Fname?: string | null, Sname?: string | null, phone?: string | null, createdAt?: any | null, revenue?: number | null, stageId?: number | null, status?: string | null, source?: string | null, salesRep?: { __typename?: 'Users', email?: string | null, Fname?: string | null, Sname?: string | null, phone?: string | null, image?: string | null, status?: UserStatus | null, role?: Role | null } | null }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };

export type UserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationsQuery = { __typename?: 'Query', userNotifications?: Array<{ __typename?: 'Notifications', createdAt?: any | null, id?: string | null, message?: string | null, readStatus?: boolean | null, title?: string | null, type?: string | null, userId?: number | null, user?: { __typename?: 'Users', email?: string | null, id?: string | null, role?: Role | null, Fname?: string | null, Sname?: string | null } | null }> | null };

export type NotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationSubscription = { __typename?: 'Subscription', notification?: { __typename?: 'Notifications', createdAt?: any | null, id?: string | null, message?: string | null, readStatus?: boolean | null, title?: string | null, type?: string | null, userId?: number | null, user?: { __typename?: 'Users', email?: string | null, id?: string | null, role?: Role | null, Fname?: string | null, Sname?: string | null } | null } | null };

export type BusinessQueryVariables = Exact<{
  businessId: Scalars['Int']['input'];
}>;


export type BusinessQuery = { __typename?: 'Query', business?: { __typename?: 'Business', email?: string | null, id?: string | null, location?: string | null, name?: string | null, phone?: string | null, owner?: { __typename?: 'Users', email?: string | null, Fname?: string | null, Sname?: string | null, image?: string | null } | null, users?: Array<{ __typename?: 'Users', email?: string | null, Fname?: string | null, Sname?: string | null, image?: string | null }> | null } | null };

export type CreateBusinessMutationVariables = Exact<{
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness?: { __typename?: 'CreateBusinessResponse', message?: string | null, status?: string | null, business?: { __typename?: 'Business', id?: string | null, email?: string | null, location?: string | null, name?: string | null, phone?: string | null } | null } | null };

export type InviteUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
}>;


export type InviteUserMutation = { __typename?: 'Mutation', inviteUser?: { __typename?: 'Response', status?: string | null, message?: string | null } | null };

export type CompleteInviteMutationVariables = Exact<{
  fname: Scalars['String']['input'];
  sname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type CompleteInviteMutation = { __typename?: 'Mutation', completeInvite?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type ValidateInviteMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateInviteMutation = { __typename?: 'Mutation', validateInvite?: { __typename?: 'ValidteInvitePayload', error?: string | null, role?: Role | null, valid?: boolean | null } | null };

export type UpdateBusinessMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBusinessMutation = { __typename?: 'Mutation', updateBusiness?: { __typename?: 'CreateBusinessResponse', message?: string | null, status?: string | null, business?: { __typename?: 'Business', email?: string | null } | null } | null };

export type ActivateEmployeeMutationVariables = Exact<{
  activateEmployeeId: Scalars['Int']['input'];
}>;


export type ActivateEmployeeMutation = { __typename?: 'Mutation', activateEmployee?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DeleteEmployeeMutationVariables = Exact<{
  deleteEmployeeId: Scalars['Int']['input'];
}>;


export type DeleteEmployeeMutation = { __typename?: 'Mutation', deleteEmployee?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DeactivateEmployeeMutationVariables = Exact<{
  deactivateEmployeeId: Scalars['Int']['input'];
}>;


export type DeactivateEmployeeMutation = { __typename?: 'Mutation', deactivateEmployee?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  fname: Scalars['String']['input'];
  sname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin?: { __typename?: 'ValidationResponse', message?: string | null, status?: string | null, tokenId?: string | null } | null };

export type UserPasswordResetRequestMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserPasswordResetRequestMutation = { __typename?: 'Mutation', passwordResetRequest?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type PasswordResetMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', passwordReset?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = { __typename?: 'Mutation', userLogout?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  fname?: InputMaybe<Scalars['String']['input']>;
  sname?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'ProfileUpdateResponse', message?: string | null, status?: string | null, updatedUser?: { __typename?: 'Users', Fname?: string | null, Sname?: string | null, businessId?: number | null, createdAt?: any | null, email?: string | null, id?: string | null, image?: string | null, lastLogin?: any | null, phone?: string | null, role?: Role | null, status?: UserStatus | null, business?: { __typename?: 'Business', email?: string | null, id?: string | null, location?: string | null, name?: string | null, phone?: string | null, owner?: { __typename?: 'Users', Fname?: string | null, Sname?: string | null, id?: string | null, email?: string | null, image?: string | null } | null } | null } | null } | null };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UserGoogleSignInMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type UserGoogleSignInMutation = { __typename?: 'Mutation', authwithGoogle?: { __typename?: 'Response', status?: string | null, message?: string | null } | null };

export type EnableTwoFaMutationVariables = Exact<{ [key: string]: never; }>;


export type EnableTwoFaMutation = { __typename?: 'Mutation', enableTwoFA?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DisabletwoFaMutationVariables = Exact<{ [key: string]: never; }>;


export type DisabletwoFaMutation = { __typename?: 'Mutation', disabletwoFA?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type AuthTwoFaMutationVariables = Exact<{
  otp: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
}>;


export type AuthTwoFaMutation = { __typename?: 'Mutation', authTwoFA?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type AuthwithGoogleMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type AuthwithGoogleMutation = { __typename?: 'Mutation', authwithGoogle?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type AuthWithFacebookMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
  userID: Scalars['String']['input'];
}>;


export type AuthWithFacebookMutation = { __typename?: 'Mutation', authWithFacebook?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type LinkedInAuthMutationVariables = Exact<{
  code: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
}>;


export type LinkedInAuthMutation = { __typename?: 'Mutation', linkedInAuth?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type AuthTikTokMutationVariables = Exact<{
  code: Scalars['String']['input'];
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
}>;


export type AuthTikTokMutation = { __typename?: 'Mutation', authTikTok?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type AddEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  start: Scalars['DateTime']['input'];
  end: Scalars['DateTime']['input'];
}>;


export type AddEventMutation = { __typename?: 'Mutation', addEvent?: { __typename?: 'Response', status?: string | null, message?: string | null } | null };

export type UpdateEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type CreateCampaignMutationVariables = Exact<{
  description: Scalars['String']['input'];
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign?: { __typename?: 'CreateCampaignResponse', message?: string | null, status?: string | null, campaign?: { __typename?: 'Campaign', businessId?: number | null, createdAt?: any | null, description?: string | null, end?: any | null, id?: string | null, start?: any | null, title?: string | null } | null } | null };

export type DeleteCampaignMutationVariables = Exact<{
  deleteCampaignId: Scalars['Int']['input'];
}>;


export type DeleteCampaignMutation = { __typename?: 'Mutation', deleteCampaign?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type CreateSocialPostMutationVariables = Exact<{
  campaignId: Scalars['Int']['input'];
  channels: Array<Scalars['String']['input']> | Scalars['String']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  media?: InputMaybe<Array<Scalars['Upload']['input']> | Scalars['Upload']['input']>;
}>;


export type CreateSocialPostMutation = { __typename?: 'Mutation', createSocialPost?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type UpdateCampaignMutationVariables = Exact<{
  updateCampaignId: Scalars['Int']['input'];
  channel?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign?: { __typename?: 'CreateCampaignResponse', campaign?: { __typename?: 'Campaign', businessId?: number | null, channels?: Array<string> | null, createdAt?: any | null, description?: string | null, end?: any | null, id?: string | null, start?: any | null, title?: string | null } | null } | null };

export type SendMailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SendMailMutation = { __typename?: 'Mutation', sendMail?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type LeadConversionRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type LeadConversionRatesQuery = { __typename?: 'Query', LeadConversionRates?: { __typename?: 'ConversionRatesResponse', conversionDelta?: number | null, conversionRate?: number | null, nonConversionRate?: number | null, salesDelta?: number | null, totalSales?: number | null, totalVisitors?: number | null } | null };

export type CustomerStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerStatsQuery = { __typename?: 'Query', customerStats?: { __typename?: 'CustomerStatsResp', message?: string | null, totalCustomers?: number | null, customersByMonth?: Array<{ __typename?: 'MonthlyTrends', count?: number | null, month?: string | null }> | null } | null };

export type SalesRevenueStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type SalesRevenueStatsQuery = { __typename?: 'Query', salesRevenueStats?: { __typename?: 'SalesRevenueStats', totalRevenue?: number | null, revenueByMonth?: Array<{ __typename?: 'RevenueByMonth', month?: string | null, total?: number | null }> | null } | null };

export type RevenueForecastQueryVariables = Exact<{ [key: string]: never; }>;


export type RevenueForecastQuery = { __typename?: 'Query', revenueForecast?: Array<{ __typename?: 'RevenueForecast', month?: string | null, productCost?: number | null, salesRevenue?: number | null }> | null };

export type EmployeesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EmployeesQuery = { __typename?: 'Query', employees?: { __typename?: 'GetEmployeesResponse', employees?: Array<{ __typename?: 'Users', Fname?: string | null, Sname?: string | null, businessId?: number | null, createdAt?: any | null, email?: string | null, id?: string | null, image?: string | null, lastLogin?: any | null, phone?: string | null, role?: Role | null, status?: UserStatus | null }> | null, pageInfo?: { __typename?: 'PagezInfoz', currentPage?: number | null, hasNextPage?: boolean | null, hasPrevPage?: boolean | null, totalCount?: number | null, totalPages?: number | null } | null } | null };

export type EmployeeCountQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeeCountQuery = { __typename?: 'Query', employeeCount?: { __typename?: 'EmployeeCountReport', totalEmployees?: number | null, monthlyData?: Array<{ __typename?: 'EmployeeCount', count?: number | null, monthYear?: string | null }> | null } | null };

export type WorkLogQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkLogQuery = { __typename?: 'Query', workLog?: { __typename?: 'WorkingHoursReport', totalWorkingHours?: number | null, monthlyData?: Array<{ __typename?: 'MonthlyData', month?: string | null, totalWorkingHours?: number | null }> | null } | null };

export type MonthlyLeadTrendsQueryVariables = Exact<{ [key: string]: never; }>;


export type MonthlyLeadTrendsQuery = { __typename?: 'Query', monthlyLeadTrends?: { __typename?: 'LeadTrendsByMonthResponse', totalLeads?: number | null, data?: Array<{ __typename?: 'MonthlyTrends', count?: number | null, month?: string | null }> | null } | null };

export type RecentLeadsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentLeadsQuery = { __typename?: 'Query', recentLeads?: Array<{ __typename?: 'Lead', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: number | null, phone?: string | null, revenue?: number | null, source?: string | null, stageId?: number | null, status?: string | null, salesRep?: { __typename?: 'Users', email?: string | null, Fname?: string | null, Sname?: string | null, image?: string | null } | null }> | null };

export type CampaignsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CampaignsQuery = { __typename?: 'Query', campaigns?: { __typename?: 'GetCampaignsResponse', campaigns?: Array<{ __typename?: 'Campaign', businessId?: number | null, channels?: Array<string> | null, createdAt?: any | null, description?: string | null, end?: any | null, id?: string | null, start?: any | null, title?: string | null }> | null, pageInfo?: { __typename?: 'PagInfo', currentPage?: number | null, hasNextPage?: boolean | null, hasPrevPage?: boolean | null, totalCount?: number | null, totalPages?: number | null } | null } | null };

export type CampaignQueryVariables = Exact<{
  campaignId: Scalars['Int']['input'];
}>;


export type CampaignQuery = { __typename?: 'Query', campaign?: { __typename?: 'Campaign', businessId?: number | null, channels?: Array<string> | null, createdAt?: any | null, description?: string | null, end?: any | null, id?: string | null, start?: any | null, title?: string | null } | null };

export type UserLeadsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserLeadsQuery = { __typename?: 'Query', userLeads?: { __typename?: 'GetLeadsResponse', leads?: Array<{ __typename?: 'Lead', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: number | null, phone?: string | null, revenue?: number | null, source?: string | null, status?: string | null, salesRep?: { __typename?: 'Users', Fname?: string | null, email?: string | null } | null }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null } | null } | null };

export type CampaignCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignCountsQuery = { __typename?: 'Query', campaignCounts?: { __typename?: 'CampaignCountReport', totalCampaigns?: number | null, monthlyData?: Array<{ __typename?: 'CampaignCount', count?: number | null, monthYear?: string | null }> | null } | null };

export type CustomerFeedbackQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerFeedbackQuery = { __typename?: 'Query', customerFeedback?: { __typename?: 'FeedbackStatsResp', message?: string | null, totalFeedback?: number | null, data?: Array<{ __typename?: 'FeedbackResponse', count?: number | null, name?: string | null }> | null } | null };

export type CustomerSatisfactionQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerSatisfactionQuery = { __typename?: 'Query', customerSatisfaction?: { __typename?: 'CustomerSatisfactionReport', message?: string | null, status?: string | null, total?: number | null, distribution?: Array<{ __typename?: 'CustomerSatis', count?: number | null, monthYear?: string | null }> | null } | null };

export type LeadSourcesStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type LeadSourcesStatsQuery = { __typename?: 'Query', leadSourcesStats?: { __typename?: 'LeadSourcesStatsRef', message?: string | null, totalLeads?: number | null, data?: Array<{ __typename?: 'LeadSourceStat', count?: number | null, name?: string | null }> | null } | null };

export type SentimentAnalysisQueryVariables = Exact<{ [key: string]: never; }>;


export type SentimentAnalysisQuery = { __typename?: 'Query', sentimentAnalysis?: { __typename?: 'SentimentAnalysisResponse', message?: string | null, negative?: number | null, neutral?: number | null, positive?: number | null, total?: number | null } | null };

export type LeadSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type LeadSummaryQuery = { __typename?: 'Query', leadSummary?: { __typename?: 'LeadSummaryResponse', awaiting?: number | null, completed?: number | null, message?: string | null, monthlyIncrease?: number | null, ongoing?: number | null, total?: number | null } | null };

export type AccountConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountConnectionQuery = { __typename?: 'Query', accountConnection?: { __typename?: 'AccountConnection', data?: Array<{ __typename?: 'Account', expiresIn?: string | null, platform?: string | null, status?: string | null }> | null } | null };

export type GetUserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEventsQuery = { __typename?: 'Query', getUserEvents?: Array<{ __typename?: 'Events', id?: string | null, title?: string | null, description?: string | null, start?: any | null, end?: any | null, user?: { __typename?: 'Users', id?: string | null, Fname?: string | null, email?: string | null } | null }> | null };

export type CallCustomerQueryVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type CallCustomerQuery = { __typename?: 'Query', callCustomer?: { __typename?: 'TicketMutationResponse', message?: string | null, status?: string | null, ticket?: { __typename?: 'Ticket', createdAt?: any | null, description?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, phone?: string | null, platform?: string | null, respondedAt?: any | null, status?: string | null, tickettype?: string | null } | null } | null };

export type SubscriberStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriberStatsQuery = { __typename?: 'Query', subscriberStats?: { __typename?: 'SubscriberStatsResponse', data?: Array<{ __typename?: 'SubscribersData', month?: string | null, count?: number | null }> | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'Users', Fname?: string | null, Sname?: string | null, createdAt?: any | null, email?: string | null, id?: string | null, image?: string | null, phone?: string | null, role?: Role | null, business?: { __typename?: 'Business', email?: string | null, id?: string | null, name?: string | null, phone?: string | null, location?: string | null } | null } | null };

export type MarkNotificationAsReadMutationVariables = Exact<{
  notificationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type DeleteNotificationMutationVariables = Exact<{
  notificationIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type SocialMonthlyAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialMonthlyAnalyticsQuery = { __typename?: 'Query', socialMonthlyAnalytics?: { __typename?: 'SocialMediaMonthly', analytics?: Array<{ __typename?: 'PerformanceMonthly', platform?: string | null, data?: Array<{ __typename?: 'MonthlyAnalytics', monthYear?: string | null, totalLikes?: number | null }> | null }> | null } | null };

export type SocialMediaPerformanceQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialMediaPerformanceQuery = { __typename?: 'Query', SocialMediaPerformance?: { __typename?: 'SocialMediaPerformance', analytics?: Array<{ __typename?: 'Performance', platform?: string | null, data?: { __typename?: 'Metrics', likes?: number | null, comments?: number | null, reposts?: number | null, retweets?: number | null, views?: number | null } | null }> | null } | null };

export type CreateTicketMutationVariables = Exact<{
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  ticketType: Scalars['String']['input'];
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket?: { __typename?: 'TicketMutationResponse', message?: string | null, status?: string | null, ticket?: { __typename?: 'Ticket', createdAt?: any | null, description?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, phone?: string | null, platform?: string | null, respondedAt?: any | null, status?: string | null, tickettype?: string | null } | null } | null };

export type CloseTicketMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type CloseTicketMutation = { __typename?: 'Mutation', closeTicket?: { __typename?: 'TicketMutationResponse', message?: string | null, status?: string | null, ticket?: { __typename?: 'Ticket', createdAt?: any | null, description?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, phone?: string | null, platform?: string | null, respondedAt?: any | null, status?: string | null, tickettype?: string | null } | null } | null };

export type DeleteTicketMutationVariables = Exact<{
  ticketId: Scalars['Int']['input'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', deleteTicket?: { __typename?: 'Response', message?: string | null, status?: string | null } | null };

export type TicketStatusCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketStatusCountQuery = { __typename?: 'Query', ticketStatusCount?: { __typename?: 'TicketStatusReport', message?: string | null, status?: string | null, distribution?: Array<{ __typename?: 'TicketStatusr', count?: number | null, ticketStatus?: string | null }> | null } | null };

export type TicketsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsCountQuery = { __typename?: 'Query', ticketsCount?: { __typename?: 'TicketsCountReport', totalTickets?: number | null, monthlyData?: Array<{ __typename?: 'TicketsCount', count?: number | null, monthYear?: string | null }> | null } | null };

export type TicketsResponseTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsResponseTimeQuery = { __typename?: 'Query', ticketsResponseTime?: { __typename?: 'ResponseReport', message?: string | null, status?: string | null, data?: Array<{ __typename?: 'MonthHours', hours?: number | null, month?: string | null }> | null } | null };

export type TicketTypeDistributionQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketTypeDistributionQuery = { __typename?: 'Query', ticketTypeDistribution?: { __typename?: 'TicketReport', message?: string | null, status?: string | null, distribution?: Array<{ __typename?: 'TicketDistribution', percentage?: number | null, ticketType?: string | null }> | null } | null };

export type OpenTicketsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OpenTicketsQuery = { __typename?: 'Query', openTickets?: { __typename?: 'GetTicketsResponse', pageInfo?: { __typename?: 'PagezInfo', currentPage?: number | null, hasNextPage?: boolean | null, hasPrevPage?: boolean | null, totalCount?: number | null, totalPages?: number | null } | null, tickets?: Array<{ __typename?: 'Ticket', createdAt?: any | null, description?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, phone?: string | null, platform?: string | null, respondedAt?: any | null, status?: string | null, tickettype?: string | null }> | null } | null };

export type TicketsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TicketsQuery = { __typename?: 'Query', tickets?: { __typename?: 'GetTicketsResponse', pageInfo?: { __typename?: 'PagezInfo', currentPage?: number | null, hasNextPage?: boolean | null, hasPrevPage?: boolean | null, totalCount?: number | null, totalPages?: number | null } | null, tickets?: Array<{ __typename?: 'Ticket', createdAt?: any | null, description?: string | null, email?: string | null, firstName?: string | null, id?: string | null, lastName?: string | null, phone?: string | null, platform?: string | null, respondedAt?: any | null, status?: string | null, tickettype?: string | null }> | null } | null };


export const AddLeadStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLeadStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLeadStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AddLeadStageMutation, AddLeadStageMutationVariables>;
export const UpdateLeadStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLeadStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeadStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateLeadStageMutation, UpdateLeadStageMutationVariables>;
export const DeleteLeadStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLeadStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLeadStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteLeadStageMutation, DeleteLeadStageMutationVariables>;
export const BusinessLeadStagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BusinessLeadStages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessLeadStages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<BusinessLeadStagesQuery, BusinessLeadStagesQueryVariables>;
export const AddLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"priority"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revenue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Fname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Sname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sname"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"priority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"priority"}}},{"kind":"Argument","name":{"kind":"Name","value":"revenue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revenue"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"salesRep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AddLeadMutation, AddLeadMutationVariables>;
export const DeleteLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteLeadMutation, DeleteLeadMutationVariables>;
export const UpdateLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revenue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"Fname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Sname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sname"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"revenue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revenue"}}},{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"salesRep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateLeadMutation, UpdateLeadMutationVariables>;
export const MoveLeadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MoveLead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"moveLead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"leadId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadId"}}},{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isConverted"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MoveLeadMutation, MoveLeadMutationVariables>;
export const GetBusinessLeadsByStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBusinessLeadsByStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBusinessLeadsByStage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"salesRep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetBusinessLeadsByStageQuery, GetBusinessLeadsByStageQueryVariables>;
export const UserNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<UserNotificationsQuery, UserNotificationsQueryVariables>;
export const NotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"readStatus"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<NotificationSubscription, NotificationSubscriptionVariables>;
export const BusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Business"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"businessId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"business"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"businessId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"businessId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<BusinessQuery, BusinessQueryVariables>;
export const CreateBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const InviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const CompleteInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Fname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Sname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sname"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CompleteInviteMutation, CompleteInviteMutationVariables>;
export const ValidateInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ValidateInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"valid"}}]}}]}}]} as unknown as DocumentNode<ValidateInviteMutation, ValidateInviteMutationVariables>;
export const UpdateBusinessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBusiness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBusiness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export const ActivateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activateEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activateEmployeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ActivateEmployeeMutation, ActivateEmployeeMutationVariables>;
export const DeleteEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteEmployeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteEmployeeMutation, DeleteEmployeeMutationVariables>;
export const DeactivateEmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateEmployee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deactivateEmployeeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deactivateEmployeeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeactivateEmployeeMutation, DeactivateEmployeeMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Fname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Sname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sname"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const UserPasswordResetRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserPasswordResetRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordResetRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UserPasswordResetRequestMutation, UserPasswordResetRequestMutationVariables>;
export const PasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<PasswordResetMutation, PasswordResetMutationVariables>;
export const UserLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UserLogoutMutation, UserLogoutMutationVariables>;
export const UpdateUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Fname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fname"}}},{"kind":"Argument","name":{"kind":"Name","value":"Sname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sname"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UserGoogleSignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserGoogleSignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authwithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UserGoogleSignInMutation, UserGoogleSignInMutationVariables>;
export const EnableTwoFaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableTwoFA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableTwoFA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EnableTwoFaMutation, EnableTwoFaMutationVariables>;
export const DisabletwoFaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisabletwoFA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disabletwoFA"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DisabletwoFaMutation, DisabletwoFaMutationVariables>;
export const AuthTwoFaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthTwoFA"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authTwoFA"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AuthTwoFaMutation, AuthTwoFaMutationVariables>;
export const AuthwithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthwithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authwithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AuthwithGoogleMutation, AuthwithGoogleMutationVariables>;
export const AuthWithFacebookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthWithFacebook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authWithFacebook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accessToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AuthWithFacebookMutation, AuthWithFacebookMutationVariables>;
export const LinkedInAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkedInAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"redirectUri"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkedInAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"redirectUri"},"value":{"kind":"Variable","name":{"kind":"Name","value":"redirectUri"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LinkedInAuthMutation, LinkedInAuthMutationVariables>;
export const AuthTikTokDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AuthTikTok"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"codeVerifier"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authTikTok"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"codeVerifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"codeVerifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<AuthTikTokMutation, AuthTikTokMutationVariables>;
export const AddEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AddEventMutation, AddEventMutationVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const DeleteCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteCampaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteCampaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteCampaignMutation, DeleteCampaignMutationVariables>;
export const CreateSocialPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSocialPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channels"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"media"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSocialPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channels"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channels"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"media"},"value":{"kind":"Variable","name":{"kind":"Name","value":"media"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateSocialPostMutation, CreateSocialPostMutationVariables>;
export const UpdateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCampaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"channel"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCampaignId"}}},{"kind":"Argument","name":{"kind":"Name","value":"channel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"channel"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"channels"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
export const SendMailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<SendMailMutation, SendMailMutationVariables>;
export const LeadConversionRatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LeadConversionRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"LeadConversionRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversionDelta"}},{"kind":"Field","name":{"kind":"Name","value":"conversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"nonConversionRate"}},{"kind":"Field","name":{"kind":"Name","value":"salesDelta"}},{"kind":"Field","name":{"kind":"Name","value":"totalSales"}},{"kind":"Field","name":{"kind":"Name","value":"totalVisitors"}}]}}]}}]} as unknown as DocumentNode<LeadConversionRatesQuery, LeadConversionRatesQueryVariables>;
export const CustomerStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customersByMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"totalCustomers"}}]}}]}}]} as unknown as DocumentNode<CustomerStatsQuery, CustomerStatsQueryVariables>;
export const SalesRevenueStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SalesRevenueStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"salesRevenueStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenueByMonth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}}]}}]}}]} as unknown as DocumentNode<SalesRevenueStatsQuery, SalesRevenueStatsQueryVariables>;
export const RevenueForecastDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RevenueForecast"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revenueForecast"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"productCost"}},{"kind":"Field","name":{"kind":"Name","value":"salesRevenue"}}]}}]}}]} as unknown as DocumentNode<RevenueForecastQuery, RevenueForecastQueryVariables>;
export const EmployeesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Employees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<EmployeesQuery, EmployeesQueryVariables>;
export const EmployeeCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmployeeCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"monthYear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEmployees"}}]}}]}}]} as unknown as DocumentNode<EmployeeCountQuery, EmployeeCountQueryVariables>;
export const WorkLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"totalWorkingHours"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalWorkingHours"}}]}}]}}]} as unknown as DocumentNode<WorkLogQuery, WorkLogQueryVariables>;
export const MonthlyLeadTrendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MonthlyLeadTrends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyLeadTrends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalLeads"}}]}}]}}]} as unknown as DocumentNode<MonthlyLeadTrendsQuery, MonthlyLeadTrendsQueryVariables>;
export const RecentLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecentLeads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentLeads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"salesRep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"stageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RecentLeadsQuery, RecentLeadsQueryVariables>;
export const CampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"channels"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<CampaignsQuery, CampaignsQueryVariables>;
export const CampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"businessId"}},{"kind":"Field","name":{"kind":"Name","value":"channels"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CampaignQuery, CampaignQueryVariables>;
export const UserLeadsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserLeads"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLeads"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"salesRep"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<UserLeadsQuery, UserLeadsQueryVariables>;
export const CampaignCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"monthYear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCampaigns"}}]}}]}}]} as unknown as DocumentNode<CampaignCountsQuery, CampaignCountsQueryVariables>;
export const CustomerFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerFeedback"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerFeedback"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"totalFeedback"}}]}}]}}]} as unknown as DocumentNode<CustomerFeedbackQuery, CustomerFeedbackQueryVariables>;
export const CustomerSatisfactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerSatisfaction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerSatisfaction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"monthYear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<CustomerSatisfactionQuery, CustomerSatisfactionQueryVariables>;
export const LeadSourcesStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LeadSourcesStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leadSourcesStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeads"}}]}}]}}]} as unknown as DocumentNode<LeadSourcesStatsQuery, LeadSourcesStatsQueryVariables>;
export const SentimentAnalysisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SentimentAnalysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentimentAnalysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"negative"}},{"kind":"Field","name":{"kind":"Name","value":"neutral"}},{"kind":"Field","name":{"kind":"Name","value":"positive"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SentimentAnalysisQuery, SentimentAnalysisQueryVariables>;
export const LeadSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LeadSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leadSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"awaiting"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyIncrease"}},{"kind":"Field","name":{"kind":"Name","value":"ongoing"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<LeadSummaryQuery, LeadSummaryQueryVariables>;
export const AccountConnectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<AccountConnectionQuery, AccountConnectionQueryVariables>;
export const GetUserEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserEventsQuery, GetUserEventsQueryVariables>;
export const CallCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CallCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"respondedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tickettype"}}]}}]}}]}}]} as unknown as DocumentNode<CallCustomerQuery, CallCustomerQueryVariables>;
export const SubscriberStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubscriberStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriberStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<SubscriberStatsQuery, SubscriberStatsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Fname"}},{"kind":"Field","name":{"kind":"Name","value":"Sname"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"business"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const MarkNotificationAsReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationAsRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationAsRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const DeleteNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notificationIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"notificationIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notificationIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const SocialMonthlyAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SocialMonthlyAnalytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"socialMonthlyAnalytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthYear"}},{"kind":"Field","name":{"kind":"Name","value":"totalLikes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]}}]}}]} as unknown as DocumentNode<SocialMonthlyAnalyticsQuery, SocialMonthlyAnalyticsQueryVariables>;
export const SocialMediaPerformanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SocialMediaPerformance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SocialMediaPerformance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analytics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"reposts"}},{"kind":"Field","name":{"kind":"Name","value":"retweets"}},{"kind":"Field","name":{"kind":"Name","value":"views"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SocialMediaPerformanceQuery, SocialMediaPerformanceQueryVariables>;
export const CreateTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTicket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"respondedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tickettype"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTicketMutation, CreateTicketMutationVariables>;
export const CloseTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CloseTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeTicket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"respondedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tickettype"}}]}}]}}]}}]} as unknown as DocumentNode<CloseTicketMutation, CloseTicketMutationVariables>;
export const DeleteTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTicket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const TicketStatusCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketStatusCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketStatusCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"ticketStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TicketStatusCountQuery, TicketStatusCountQueryVariables>;
export const TicketsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthlyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"monthYear"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalTickets"}}]}}]}}]} as unknown as DocumentNode<TicketsCountQuery, TicketsCountQueryVariables>;
export const TicketsResponseTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketsResponseTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketsResponseTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"month"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TicketsResponseTimeQuery, TicketsResponseTimeQueryVariables>;
export const TicketTypeDistributionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketTypeDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketTypeDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"distribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"ticketType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<TicketTypeDistributionQuery, TicketTypeDistributionQueryVariables>;
export const OpenTicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenTickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openTickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"respondedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tickettype"}}]}}]}}]}}]} as unknown as DocumentNode<OpenTicketsQuery, OpenTicketsQueryVariables>;
export const TicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"respondedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tickettype"}}]}}]}}]}}]} as unknown as DocumentNode<TicketsQuery, TicketsQueryVariables>;