import { gql } from "@/__generated__";

export const LEAD_CONVERSION_RATES = gql(`
query LeadConversionRates {
  LeadConversionRates {
    conversionDelta
    conversionRate
    nonConversionRate
    salesDelta
    totalSales
    totalVisitors
  }
}
  `);

export const CUSTOMER_STATS = gql(`
query CustomerStats {
  customerStats {
    customersByMonth {
      count
      month
    }
    message
    totalCustomers
  }
}
`);

export const SALES_REVENUE_STATS = gql(`
  query SalesRevenueStats {
  salesRevenueStats {
    revenueByMonth {
      month
      total
    }
    totalRevenue
  }
}
`);

export const LEAD_CONVERSIONS = gql(`
query LeadConversionRates {
  LeadConversionRates {
    conversionDelta
    conversionRate
    nonConversionRate
    salesDelta
    totalSales
    totalVisitors
  }
}
`);

export const REVENUE_FORECAST = gql(
  ` 
  query RevenueForecast {
  revenueForecast {
    month
    productCost
    salesRevenue
  }
}
`,
);

export const EMPLOYEES = gql(`
query Employees($limit: Int, $page: Int) {
  employees(limit: $limit, page: $page) {
    employees {
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
    pageInfo {
      currentPage
      hasNextPage
      hasPrevPage
      totalCount
      totalPages
    }
  }
}
`);

export const EMPLOYY_COUNT = gql(`
query EmployeeCount {
  employeeCount {
    monthlyData {
      count
      monthYear
    }
    totalEmployees
  }
}
  
  `);

export const WORKLOG = gql(`

query WorkLog {
  workLog {
    monthlyData {
      month
      totalWorkingHours
    }
    totalWorkingHours
  }
}


  `);

export const MONTHLY_LEAD_TRENDS = gql(`
  query MonthlyLeadTrends {
  monthlyLeadTrends {
    data {
      count
      month
    }
    totalLeads
  }
}
  `);

export const RECENT_LEADS = gql(`
query RecentLeads {
  recentLeads {
    Fname
    Sname
    createdAt
    email
    id
    phone
    revenue
    salesRep {
      email
      Fname
      Sname
      image
    }
    source
    stageId
    status
  }
}
  `);

export const GET_CAMPAIGNS = gql(`
query Campaigns($limit: Int, $page: Int) {
  campaigns(limit: $limit, page: $page) {
    campaigns {
      businessId
      channels
      createdAt
      description
      end
      id
      start
      title
    }
    pageInfo {
      currentPage
      hasNextPage
      hasPrevPage
      totalCount
      totalPages
    }
  }
}
  `);

export const GET_SPECIFIC_CAMPAIGN = gql(`
query Campaign($campaignId: Int!) {
  campaign(id: $campaignId) {
    businessId
    channels
    createdAt
    description
    end
    id
    start
    title
  }
}
`);

export const USER_LEADS = gql(`
query UserLeads($after: String, $first: Int) {
  userLeads(after: $after, first: $first) {
    leads {
      Fname
      Sname
      createdAt
      email
      id
      phone
      revenue
      salesRep {
        Fname
        email
      }
      source

      status
    }
    pageInfo {
      endCursor
      endCursor
    }
  }
}

  `);

export const GET_TOTAL_CAMPAIGNS = gql(`
query CampaignCounts {
  campaignCounts {
    monthlyData {
      count
      monthYear
    }
    totalCampaigns
  }
}
`);



export const CUSTOMER_FEEDBACK = gql(`
  query CustomerFeedback {
  customerFeedback {
    data {
      count
      name
    }
    message
    totalFeedback
  }
}

`);

export const CUSTOMER_SATISFACTION = gql(`
query CustomerSatisfaction {
  customerSatisfaction {
    distribution {
      count
      monthYear
    }
    message
    status
    total
  }
}
`);
export const GET_LEAD_SOURCES = gql(`
  query LeadSourcesStats {
  leadSourcesStats {
    data {
      count
      name
    }
    message
    totalLeads
  }
}

  `);

export const GET_SENTIMENTAL_ANALYSIS = gql(`
 query SentimentAnalysis {
  sentimentAnalysis {
    message
    negative
    neutral
    positive
    total
  }
}

`);

export const LEADS_SUMMARY = gql(`
query LeadSummary {
  leadSummary {
    awaiting
    completed
    message
    monthlyIncrease
    ongoing
    total
  }
}

  `);

export const GET_CONNECTED_ACCOUNTS_STATUS = gql(`
  query AccountConnection {
  accountConnection {
    data {
      expiresIn
      platform
      status
    }
  }
}
`);
