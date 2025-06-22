import { gql } from "@/__generated__";

export const CREATE_CAMPAIGN = gql(`
mutation CreateCampaign($description: String!, $end: DateTime!, $start: DateTime!, $title: String!) {
  createCampaign(description: $description, end: $end, start: $start, title: $title) {
    campaign {
      businessId
      createdAt
      description
      end
      id
      start
      title
    }
    message
    status
  }
}
`);

export const DELETE_A_CAMPAIGN = gql(`
  mutation DeleteCampaign($deleteCampaignId: Int!) {
    deleteCampaign(id: $deleteCampaignId) {
      message
      status
    }
  }
`);

export const CREATE_SOCIAL_POST = gql(`
mutation CreateSocialPost($campaignId: Int!, $channels: [String!]!, $content: String!, $title: String!, $media: [Upload!]) {
  createSocialPost(campaignId: $campaignId, channels: $channels, content: $content, title: $title, media: $media) {
    message
    status
  }
}

`);

export const UPDATE_A_CAMPAIGN = gql(`
mutation UpdateCampaign($updateCampaignId: Int!, $channel: [String!], $end: DateTime, $start: DateTime, $title: String) {
  updateCampaign(id: $updateCampaignId, channel: $channel, end: $end, start: $start, title: $title) {
    campaign {
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
}

  `);
