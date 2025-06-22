import { gql } from "@/__generated__";



export const SOCIAL_MEDIA_ANALYTICS = gql(`
  query SocialMonthlyAnalytics {
  socialMonthlyAnalytics {
    analytics {
      data {
        monthYear
        totalLikes
      }
      platform
    }
  }
}

`);
export const SOCIAL_MEDIA_PERFORMANCE = gql(`
query SocialMediaPerformance {
  SocialMediaPerformance {
    analytics {
      platform
      data {
        likes
        comments
        reposts
        retweets
        views
      }
    }
  }
}
`);

// query SocialMonthlyAnalytics {
//   socialMonthlyAnalytics {
//     analytics {
//       data {
//         monthYear
//         totalLikes
//       }
//       platform
//     }
//   }
// }



